import json
import logging
import urllib.error
import urllib.parse
import urllib.request

from django.conf import settings

logger = logging.getLogger(__name__)

VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"


def verify_turnstile_token(token, remote_ip=""):
    """Verify a Cloudflare Turnstile token server-side.

    Fails closed: a missing token, missing secret key, network error, or any
    non-success response from Cloudflare is all treated as "not verified" so
    registration is rejected rather than silently let through.
    """
    if not token or not settings.TURNSTILE_SECRET_KEY:
        return False

    payload = {
        "secret": settings.TURNSTILE_SECRET_KEY,
        "response": token,
    }
    if remote_ip:
        payload["remoteip"] = remote_ip

    request = urllib.request.Request(
        VERIFY_URL,
        data=urllib.parse.urlencode(payload).encode("ascii"),
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=5) as response:
            body = json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, ValueError):
        logger.exception("Turnstile verification request failed")
        return False

    return bool(body.get("success"))
