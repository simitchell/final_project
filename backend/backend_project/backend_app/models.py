from django.db import models
from django.conf import settings


# Create your models here.
class Listing(models.Model):
    title = models.CharField(null=True)
    price = models.IntegerField(null=True)
    description = models.TextField(null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True
    )
 

    def __str__(self) -> str:
        return self.title
