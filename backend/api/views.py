from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    # serializer_class to set the serializer class to UserSerializer
    serializer_class = UserSerializer
    # permission_classes to AllowAny to allow unauthenticated users to create a new user
    permission_classes = [AllowAny]
