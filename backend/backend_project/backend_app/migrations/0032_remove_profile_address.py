from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0031_copy_address_to_street'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='address',
        ),
    ]
