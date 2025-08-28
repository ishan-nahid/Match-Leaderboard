from django.urls import path
from .views import (
    TeamListCreateAPIView, TeamDetailAPIView,
    MatchListCreateAPIView, MatchDetailAPIView
)

urlpatterns = [
    # Team endpoints
    path('teams/', TeamListCreateAPIView.as_view(), name='team-list-create'),
    path('teams/<int:pk>/', TeamDetailAPIView.as_view(), name='team-detail'),

    # Match endpoints
    path('matches/', MatchListCreateAPIView.as_view(), name='match-list-create'),
    path('matches/<int:pk>/', MatchDetailAPIView.as_view(), name='match-detail'),
]
