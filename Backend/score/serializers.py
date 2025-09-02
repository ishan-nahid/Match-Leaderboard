from rest_framework import serializers
from .models import Player, Team, MatchDay, Set, StatCache


class PlayerSerializer(serializers.ModelSerializer):
    # Optionally add computed stats field, assuming stats from StatCache or other source
    stats = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = ['id', 'name', 'stats']

    def get_stats(self, obj):
        # Example: fetch latest weekly stats for this player (adjust as needed)
        stat = StatCache.objects.filter(player=obj, date_range='week').order_by('-id').first()
        return stat.stats if stat else {}


class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True)
    # Could add team-level stats here similarly
    stats = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name', 'players', 'stats']

    def get_stats(self, obj):
        # Example: aggregate stats for team (simplified)
        stat = StatCache.objects.filter(team=obj, date_range='week').order_by('-id').first()
        return stat.stats if stat else {}


class SetSerializer(serializers.ModelSerializer):
    winner = serializers.StringRelatedField()  # Display winner name instead of id

    class Meta:
        model = Set
        fields = ['id', 'set_number', 'team_a_score', 'team_b_score', 'winner', 'deuce']


class MatchDaySerializer(serializers.ModelSerializer):
    team_a = TeamSerializer()
    team_b = TeamSerializer()
    winner = serializers.StringRelatedField(allow_null=True)
    sets = SetSerializer(many=True)

    class Meta:
        model = MatchDay
        fields = ['id', 'date', 'team_a', 'team_b', 'winner', 'sets']


class StatsSerializer(serializers.Serializer):
    # Example of aggregated leaderboard metrics
    leaderboard = serializers.ListField(
        child=serializers.DictField()
    )
