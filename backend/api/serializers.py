from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()

    def get_likes_count(self, obj):
        return obj.likes.count()

    class Meta:
        model = Note
        fields = "id, title, content, author, created_at, likes, likes_count".split(
            ", "
        )
        read_only_fields = ["author"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data.pop("author", None)  # Remove 'author' from validated_data
        note = Note.objects.create(author=user, **validated_data)
        return note


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = []
