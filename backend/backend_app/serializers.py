from .models import US_STATES, Cart, Listing, Profile, User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class CartSerializer(serializers.ModelSerializer):
    # user_id = serializers.ReadOnlyField(source="user.id")
    # image_url = serializers.ImageField(required=True)

    class Meta:
        model = Cart
        fields = ["id", "user_id", "cart_item", "image_url", "price", "condition"]
        read_only_fields = ["user_id"]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["userId"] = self.user.id
        data["username"] = self.user.username
        data["name"] = self.user.first_name + " " + self.user.last_name
        return data


class ListingSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)
    # Public on purpose: a coarse "where is this seller" signal for meetups.
    seller_state = serializers.SerializerMethodField()

    class Meta:
        model = Listing
        fields = [
            "id",
            "user",
            "username",
            "title",
            "price",
            "description",
            "image_url",
            "condition",
            "seller_state",
        ]
        read_only_fields = ["user", "username"]

    def get_seller_state(self, obj):
        profile = getattr(obj.user, "profile", None)
        return profile.state if profile else ""


class ProfileSerializer(serializers.ModelSerializer):
    # Names live on Django's built-in User, not Profile; exposed here so the
    # profile page can read and edit them in one request.
    first_name = serializers.CharField(
        source="user.first_name", max_length=150, required=False, allow_blank=True
    )
    last_name = serializers.CharField(
        source="user.last_name", max_length=150, required=False, allow_blank=True
    )
    # Year the account was created; set by Django, so users can't change it.
    member_since = serializers.IntegerField(
        source="user.date_joined.year", read_only=True
    )

    class Meta:
        model = Profile
        fields = [
            "id",
            "user_id",
            "first_name",
            "last_name",
            "member_since",
            "bio",
            "street",
            "city",
            "state",
            "zip_code",
            "birthdate",
            "enthusiast_since",
        ]
        read_only_fields = ["user_id"]
        lookup_field = "user_id"

    def update(self, instance, validated_data):
        # DRF collects the "user.*" fields into a nested dict; save those on
        # the User and let the default update handle the Profile fields.
        user_data = validated_data.pop("user", {})
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save(update_fields=list(user_data))
        return super().update(instance, validated_data)


class UserSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    # Optional at signup; saved to the auto-created Profile.
    state = serializers.ChoiceField(
        choices=US_STATES, required=False, allow_blank=True, write_only=True
    )
    # Honeypot: real users never see or fill this (hidden via CSS on the
    # frontend). Bots that auto-fill every field trip it. Not a model field —
    # popped in validate() and never saved.
    website = serializers.CharField(
        required=False, allow_blank=True, write_only=True
    )

    class Meta:
        model = User
        fields = ["id", "email", "username", "password", "state", "website"]

    def validate(self, attrs):
        # Generic message so a bot can't distinguish "honeypot tripped" from
        # any other validation failure.
        if attrs.pop("website", ""):
            raise serializers.ValidationError("Unable to complete registration.")
        return attrs

    def create(self, validated_data):
        state = validated_data.pop("state", "")
        validated_data["password"] = make_password(validated_data["password"])
        user = super().create(validated_data)
        if state:
            user.profile.state = state
            user.profile.save(update_fields=["state"])
        return user
