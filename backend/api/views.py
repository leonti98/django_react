from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, LikeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, User  # Import the custom User model
from rest_framework.pagination import PageNumberPagination


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()  # Use the custom User model
    # serializer_class to set the serializer class to UserSerializer
    serializer_class = UserSerializer
    # permission_classes to AllowAny to allow unauthenticated users to create a new user
    permission_classes = [AllowAny]


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]

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


# class to list notes of the any user
class UserNoteList(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]
    pagination_class = PageNumberPagination
    page_size = 10

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Note.objects.filter(author=user_id).order_by("-created_at")

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class getUserInfo(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()  # Use the custom User model
    lookup_field = "id"
