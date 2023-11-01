from django.shortcuts import render

# Create your views here.
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import redirect

# from .forms import ListingForm
from .models import Listing
from .serializers import CustomTokenObtainPairSerializer
from .serializers import ListingSerializer

# Create your views here.


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ListingViewSet(viewsets.ModelViewSet):
    permisssion_classes = [IsAuthenticatedOrReadOnly]

    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


# class RedirectView(APIView):
#     model = Url

#     def get(self, request, short_url):
#         try:
#             short_url = self.kwargs.get('short_url')
#             urlObject = Url.objects.filter(
#                 short_url=short_url).values('title', 'original_url')
#             for item in urlObject:
#                 original_url = item['original_url']
#             response = redirect(original_url)
#             return response
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)


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


class ListingView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        listing = Listing()
        try:
            self.title = request.data("title")
            self.price = request.data("price")
            self.description = request.data("description")
            # self.user_id = 
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        listing.save()
