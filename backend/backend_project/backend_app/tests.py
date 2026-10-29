from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Listing

PASSWORD = "S3cure-testpass!"


def make_user(username, state="", **profile_fields):
    user = User.objects.create_user(username, f"{username}@example.com", PASSWORD)
    user.profile.state = state
    for field, value in profile_fields.items():
        setattr(user.profile, field, value)
    user.profile.save()
    return user


class RegistrationStateTests(APITestCase):
    url = "/register/"

    def register(self, **extra):
        data = {"username": "newbie", "email": "n@example.com", "password": PASSWORD}
        data.update(extra)
        return self.client.post(self.url, data)

    def test_state_is_saved_to_profile(self):
        response = self.register(state="TX")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.get(username="newbie").profile.state, "TX")

    def test_state_is_optional(self):
        for extra in ({}, {"state": ""}):
            with self.subTest(extra=extra):
                User.objects.filter(username="newbie").delete()
                response = self.register(**extra)
                self.assertEqual(response.status_code, status.HTTP_201_CREATED)
                self.assertEqual(User.objects.get(username="newbie").profile.state, "")

    def test_invalid_state_is_rejected(self):
        response = self.register(state="ZZ")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("state", response.data)
        self.assertFalse(User.objects.filter(username="newbie").exists())

    def test_state_is_not_echoed_in_response(self):
        self.assertNotIn("state", self.register(state="TX").data)


class ProfileAddressTests(APITestCase):
    def setUp(self):
        self.user = make_user("alice")
        self.client.force_authenticate(self.user)
        self.url = f"/profile/{self.user.id}/"

    def test_update_all_address_fields(self):
        response = self.client.put(
            self.url,
            {
                "street": "1 Main St",
                "city": "Austin",
                "state": "TX",
                "zip_code": "78701",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.profile.refresh_from_db()
        self.assertEqual(self.user.profile.city, "Austin")
        self.assertEqual(self.user.profile.zip_code, "78701")

    def test_zip_accepts_zip_plus_four_and_keeps_leading_zero(self):
        for zip_code in ("02134", "02134-1234"):
            with self.subTest(zip_code=zip_code):
                response = self.client.put(self.url, {"zip_code": zip_code})
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                self.assertEqual(response.data["zip_code"], zip_code)

    def test_invalid_zip_is_rejected(self):
        for zip_code in ("1234", "abcde", "123456", "12345-12"):
            with self.subTest(zip_code=zip_code):
                response = self.client.put(self.url, {"zip_code": zip_code})
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
                self.assertIn("zip_code", response.data)

    def test_invalid_state_is_rejected(self):
        response = self.client.put(self.url, {"state": "Texas"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("state", response.data)

    def test_patch_changes_only_the_fields_sent(self):
        profile = self.user.profile
        profile.bio = "Fox body nut"
        profile.birthdate = "1990-05-17"
        profile.state = "TX"
        profile.save()

        response = self.client.patch(self.url, {"zip_code": "78701"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        profile.refresh_from_db()
        self.assertEqual(profile.zip_code, "78701")
        self.assertEqual(profile.bio, "Fox body nut")
        self.assertEqual(str(profile.birthdate), "1990-05-17")
        self.assertEqual(profile.state, "TX")

    def test_patch_can_clear_a_field_explicitly(self):
        self.user.profile.bio = "Fox body nut"
        self.user.profile.save()
        self.client.patch(self.url, {"bio": ""})
        self.user.profile.refresh_from_db()
        self.assertEqual(self.user.profile.bio, "")

    def test_blank_fields_are_allowed(self):
        response = self.client.put(
            self.url, {"street": "", "city": "", "state": "", "zip_code": ""}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class SellerStateTests(APITestCase):
    """State is public on listings; street, city and ZIP must never leak."""

    def setUp(self):
        seller = make_user(
            "seller", state="OH", street="9 Secret Ln", city="Dayton", zip_code="45402"
        )
        self.listing = Listing.objects.create(
            user=seller, username="seller", title="GT40 intake", price=100
        )

    def test_state_visible_to_anonymous_users(self):
        for url in ("/listing/", f"/listing/{self.listing.id}/"):
            with self.subTest(url=url):
                response = self.client.get(url)
                body = response.data[0] if isinstance(response.data, list) else response.data
                self.assertEqual(body["seller_state"], "OH")

    def test_private_address_parts_are_not_exposed(self):
        body = self.client.get(f"/listing/{self.listing.id}/").content.decode()
        for secret in ("9 Secret Ln", "Dayton", "45402"):
            self.assertNotIn(secret, body)

    def test_blank_state_is_empty_string(self):
        other = make_user("nostate")
        listing = Listing.objects.create(
            user=other, username="nostate", title="Cam", price=50
        )
        response = self.client.get(f"/listing/{listing.id}/")
        self.assertEqual(response.data["seller_state"], "")

    def test_seller_state_is_read_only(self):
        self.client.force_authenticate(self.listing.user)
        self.client.put(
            f"/listing/{self.listing.id}/",
            {"title": "GT40 intake", "price": 100, "seller_state": "CA"},
            format="multipart",
        )
        self.listing.user.profile.refresh_from_db()
        self.assertEqual(self.listing.user.profile.state, "OH")
