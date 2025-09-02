from django.urls import path
from .views import (
    PlayerListView, PlayerDetailView,
    TeamListView, TeamDetailView,
    MatchDayListView, MatchDayDetailView,
    StatsView,
)

urlpatterns = [
    path('players/', PlayerListView.as_view(), name='player-list'),
    path('players/<int:pk>/', PlayerDetailView.as_view(), name='player-detail'),

    path('teams/', TeamListView.as_view(), name='team-list'),
    path('teams/<int:pk>/', TeamDetailView.as_view(), name='team-detail'),

    path('matchdays/', MatchDayListView.as_view(), name='matchday-list'),
    path('matchdays/<int:pk>/', MatchDayDetailView.as_view(), name='matchday-detail'),

    path('stats/', StatsView.as_view(), name='stats'),

]
