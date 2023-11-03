from .models import Listing, Profile, User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ["id", "email", "username", "password"]


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ["id", "title", "price", "description", "user"]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "user_id"]


# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model =


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["userId"] = self.user.id
        data["username"] = self.user.username
        data["name"] = self.user.first_name + " " + self.user.last_name
        return data
