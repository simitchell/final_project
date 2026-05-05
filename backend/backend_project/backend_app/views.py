from django.shortcuts import render
from rest_framework import generics
from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.tokens import (
    RefreshToken,
    OutstandingToken,
    BlacklistedToken,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import redirect
from django.contrib.auth.models import make_password
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Cart, Listing, Profile

from .serializers import (
    ProfileSerializer,
    TokenObtainPairSerializer,
    UserSerializer,
    ListingSerializer,
    CartSerializer,
    CustomTokenObtainPairSerializer,
)

import boto3
from rest_framework.exceptions import ValidationError


# Create your views here.


class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    lookup_field = "user_id"
    # parser_classes = JSONParser

class CartDeleteViewSet(generics.DestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


def check_image_moderation(image_file):
    """
    Sends image to AWS Rekognition for content moderation.
    Raises ValidationError if inappropriate content is detected.
    """
    client = boto3.client('rekognition', region_name='us-east-1')
    
    image_bytes = image_file.read()
    image_file.seek(0)  # Reset file pointer after reading
    
    response = client.detect_moderation_labels(
        Image={'Bytes': image_bytes},
        MinConfidence=75
    )
    
    if response['ModerationLabels']:
        labels = [label['Name'] for label in response['ModerationLabels']]
        raise ValidationError(
            f"Image contains inappropriate content and cannot be uploaded."
        )

class ListingViewSet(viewsets.ModelViewSet):
    permisssion_classes = [IsAuthenticatedOrReadOnly]
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    parser_classes = (MultiPartParser, FormParser)
    search_fields = ["title"]
    filter_backends = [SearchFilter, OrderingFilter]

    def perform_create(self, serializer):
        image = self.request.FILES.get('image_url')
        if image:
            check_image_moderation(image)
        serializer.save()

    def perform_update(self, serializer):
        image = self.request.FILES.get('image_url')
        if image:
            check_image_moderation(image)
        serializer.save()


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            password = make_password(request.data["password"])
            serializer.save(password=password)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = "user_id"
    lookup_url_kwarg = "user_id"

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
