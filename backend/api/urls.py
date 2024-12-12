from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list-create"),
    path("notes/<int:page>/", views.NoteListCreate.as_view(), name="note-list-create"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="note-delete"),
    path("notes/like/<int:pk>/", views.NoteLike.as_view(), name="note-like"),
    path("auth/user/", views.CurrentUserView.as_view(), name="current-user"),
]
