from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import resend


# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return "images/{filename}".format(filename=filename)


# Create your models here.
class Cart(models.Model):
    user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True
    )
    cart_item = models.CharField(max_length=100)
    image_url = models.CharField(blank=True, null=True)
    price = models.IntegerField(null=True)


    def __str__(self) -> str:
        return self.cart_item


class Listing(models.Model):
    username = models.CharField(null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True
    )
    title = models.CharField(null=True)
    price = models.IntegerField(null=True)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    description = models.TextField(null=True)

    def __str__(self) -> str:
        return self.title


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=50, blank=True)
    bio = models.TextField(max_length=400, blank=True)
    birthdate = models.DateField(null=True, blank=True)

def send_new_profile_notification(user):
    """Send an email notification when a new profile is created."""
    resend.api_key = settings.RESEND_API_KEY

    try:
        resend.Emails.send({
            "from": "foxbodyswapmeet@gmail.com",
            "to": settings.PROFILE_NOTIFICATION_EMAIL,
            "subject": "New Profile Created - Fox Body Swap Meet",
            "html": f"""
                <h2>New User Registered</h2>
                <h3>Fox Body Swap Meet</h3>
                <p>A new profile has been created for user: {user.username}</p>
                <ul>
                    <li><strong>Username:</strong> {user.username}</li>
                    <li><strong>Email:</strong> {user.email}</li>
                    <li><strong>Joined:</strong> {user.date_joined.strftime('%Y-%m-%d %H:%M:%S')}</li>
                </ul>
                <p>Visit the admin panel to view more details.</p>
            """,
        })
    except Exception as e:
        # Log the error but don't crash the registration flow
        print(f"[Profile Notification] Failed to send email: {e}")


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        send_new_profile_notification(instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
