import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0029_cart_condition'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='street',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='profile',
            name='city',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='profile',
            name='state',
            field=models.CharField(blank=True, choices=[('AL', 'Alabama'), ('AK', 'Alaska'), ('AZ', 'Arizona'), ('AR', 'Arkansas'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DE', 'Delaware'), ('DC', 'District of Columbia'), ('FL', 'Florida'), ('GA', 'Georgia'), ('HI', 'Hawaii'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('ME', 'Maine'), ('MD', 'Maryland'), ('MA', 'Massachusetts'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MS', 'Mississippi'), ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'), ('NV', 'Nevada'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NY', 'New York'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VT', 'Vermont'), ('VA', 'Virginia'), ('WA', 'Washington'), ('WV', 'West Virginia'), ('WI', 'Wisconsin'), ('WY', 'Wyoming')], max_length=2),
        ),
        migrations.AddField(
            model_name='profile',
            name='zip_code',
            field=models.CharField(blank=True, max_length=10, validators=[django.core.validators.RegexValidator('^\\d{5}(-\\d{4})?$', 'Enter a ZIP code like 12345 or 12345-6789.')]),
        ),
    ]
