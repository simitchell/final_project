# Generated by Django 4.2.6 on 2023-11-14 15:53

import backend_project.backend_app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0024_rename_user_cart_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='image_url',
            field=models.ImageField(blank=True, null=True, upload_to=backend_project.backend_app.models.upload_to),
        ),
    ]
