import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)


def send_welcome_email(user):
    """Send the welcome email to a newly registered user.

    Never raises: a mail failure must not break registration, so errors are
    logged and False is returned. Returns True if the message was handed off.
    """
    if not user.email:
        return False

    context = {
        "username": user.username,
        "login_url": f"{settings.SITE_URL}/login",
        "site_url": settings.SITE_URL,
    }
    try:
        message = EmailMultiAlternatives(
            subject="Welcome to Fox Body Swap Meet",
            body=render_to_string("emails/welcome.txt", context),
            to=[user.email],
        )
        message.attach_alternative(
            render_to_string("emails/welcome.html", context), "text/html"
        )
        message.send()
    except Exception:
        logger.exception("Failed to send welcome email to user id=%s", user.pk)
        return False
    return True
