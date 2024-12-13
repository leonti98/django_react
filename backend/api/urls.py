from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list-create"),
    path("notes/<int:page>/", views.NoteListCreate.as_view(), name="note-list-create"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="note-delete"),
    path("notes/like/<int:pk>/", views.NoteLike.as_view(), name="note-like"),
    path("auth/user/", views.CurrentUserView.as_view(), name="current-user"),
    path("user/<int:id>/", views.getUserInfo.as_view(), name="get-user-info"),
    path(
        "user/notes/<int:user_id>/",
        views.UserNoteList.as_view(),
        name="user-note-list",
    ),
    path(
        "user/notes/<int:user_id>/<int:page>/",
        views.UserNoteList.as_view(),
        name="user-note-list",
    ),
    path("user/follow/<int:pk>/", views.FollowUser.as_view(), name="follow-user"),
    path("notes/followers/", views.FollowerNotes.as_view(), name="followers-notes"),
    path("notes/edit/<int:id>/", views.NoteEdit.as_view(), name="note-edit"),
]
