from .models import Listing
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['title', 'price', 'description', 'user']

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['userId'] = self.user.id
        data['username'] = self.user.username
        data['name'] = self.user.first_name + " " + self.user.last_name
        return data
