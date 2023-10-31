from django.shortcuts import render

# Create your views here.
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import redirect

# from .models import Url
from .serializers import CustomTokenObtainPairSerializer

# Create your views here.


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# class UrlViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticatedOrReadOnly]

    # queryset = Url.objects.all().filter(user_id=2).order_by('title')
    # serializer_class = UrlSerializer



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
