from django.contrib import admin
from .models import Cart, Listing, Profile

# Register your models here.
admin.site.register(Listing)
admin.site.register(Profile)
admin.site.register(Cart)
