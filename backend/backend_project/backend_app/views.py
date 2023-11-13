from django.shortcuts import render
from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
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
from .models import Cart, Listing, Profile

from .serializers import (
    ProfileSerializer,
    TokenObtainPairSerializer,
    UserSerializer,
    ListingSerializer,
    CartSerializer,
    CustomTokenObtainPairSerializer,
)


# Create your views here.


class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    lookup_field = "user_id"

    def post(self, request):
        try:
            serializer = CartSerializer(
                data=request.data
            )  # Fix: create a serializer instance
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ListingViewSet(viewsets.ModelViewSet):
    permisssion_classes = [IsAuthenticatedOrReadOnly]
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    parser_classes = (MultiPartParser, FormParser)

    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)


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

    def perform_udpate(self, serializer):
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
