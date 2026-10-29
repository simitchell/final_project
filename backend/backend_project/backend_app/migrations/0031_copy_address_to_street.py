from django.db import migrations
from django.db.models import F


def address_to_street(apps, schema_editor):
    Profile = apps.get_model('backend_app', 'Profile')
    Profile.objects.exclude(address='').update(street=F('address'))


def street_to_address(apps, schema_editor):
    # Reverse: the old column is only 50 chars, so truncate.
    Profile = apps.get_model('backend_app', 'Profile')
    for profile in Profile.objects.exclude(street=''):
        profile.address = profile.street[:50]
        profile.save(update_fields=['address'])


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0030_profile_address_fields'),
    ]

    operations = [
        migrations.RunPython(address_to_street, street_to_address),
    ]
