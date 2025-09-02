from django.contrib import admin
from .models import Player, Team, MatchDay, Set, StatCache
from django.core.exceptions import ValidationError

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
    filter_horizontal = ['players']  # makes ManyToManyField easier to manage

    def clean(self):
        # Optionally add validation in admin if needed
        if self.players.count() > 2:
            raise ValidationError("A team can only have 2 players.")


@admin.register(MatchDay)
class MatchDayAdmin(admin.ModelAdmin):
    list_display = ['date', 'team_a', 'team_b', 'winner']
    list_filter = ['date', 'team_a', 'team_b']
    search_fields = ['team_a__name', 'team_b__name']


@admin.register(Set)
class SetAdmin(admin.ModelAdmin):
    list_display = ['match_day', 'set_number', 'team_a_score', 'team_b_score', 'winner', 'deuce']
    list_filter = ['deuce']
    ordering = ['match_day', 'set_number']


@admin.register(StatCache)
class StatCacheAdmin(admin.ModelAdmin):
    list_display = ['player', 'team', 'date_range']
    list_filter = ['date_range']
    search_fields = ['player__name', 'team__name']
