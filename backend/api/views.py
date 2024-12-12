from rest_framework.response import Response
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, LikeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    # serializer_class to set the serializer class to UserSerializer
    serializer_class = UserSerializer
    # permission_classes to AllowAny to allow unauthenticated users to create a new user
    permission_classes = [AllowAny]


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter().order_by("-created_at")

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)


# class to add and remove likes to a note
class NoteLike(generics.UpdateAPIView):
    http_method_names = ["put"]
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.all()

    def perform_update(self, serializer):
        instance = serializer.instance
        user = self.request.user
        if user in instance.likes.all():
            instance.likes.remove(user)
            liked = False
        else:
            instance.likes.add(user)
            liked = True
        response = {"liked": liked}
        return response


class CurrentUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("request", request)
        return Response({"id": request.user.id, "username": request.user.username})
