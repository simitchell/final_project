from .models import Cart, Listing, Profile, User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class CartSerializer(serializers.ModelSerializer):
    # user_id = serializers.ReadOnlyField(source="user.id")
    # image_url = serializers.ImageField(required=True)

    class Meta:
        model = Cart
        fields = ["id", "user_id", "cart_item", "image_url", "price"]
        read_only_fields = ["user_id"]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["userId"] = self.user.id
        data["username"] = self.user.username
        data["name"] = self.user.first_name + " " + self.user.last_name
        return data


class ListingSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Listing
        fields = [
            "id",
            "user",
            "username",
            "title",
            "price",
            "description",
            "image_url",
        ]
        read_only_fields = ["user", "username"]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "user_id", "bio", "address", "birthdate"]
        read_only_fields = ["user_id"]
        lookup_field = "user_id"


class UserSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer()
    password = serializers.CharField(
        write_only=True, validators=[validate_password]
    )

    class Meta:
        model = User
        fields = ["id", "email", "username", "password"]

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
