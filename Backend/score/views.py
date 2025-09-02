from rest_framework import permissions, status
from rest_framework.response import Response
from django.db.models import Q
from datetime import datetime
from .models import Player, Team, MatchDay, Set
from .serializers import PlayerSerializer, TeamSerializer, MatchDaySerializer, StatsSerializer
from rest_framework.views import APIView




class PlayerListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        queryset = Player.objects.all()
        serializer = PlayerSerializer(queryset, many=True)
        return Response(serializer.data)


class PlayerDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        try:
            player = Player.objects.get(pk=pk)
        except Player.DoesNotExist:
            return Response({"detail": "Player not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = PlayerSerializer(player)
        return Response(serializer.data)


class TeamListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        queryset = Team.objects.prefetch_related('players').all()
        serializer = TeamSerializer(queryset, many=True)
        return Response(serializer.data)


class TeamDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        try:
            team = Team.objects.prefetch_related('players').get(pk=pk)
        except Team.DoesNotExist:
            return Response({"detail": "Team not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = TeamSerializer(team)
        return Response(serializer.data)


class MatchDayListView(APIView):
    pass
    # permission_classes = [permissions.AllowAny]

    # def get(self, request):
    #     queryset = MatchDay.objects.prefetch_related('sets', 'team_a__players', 'team_b__players').all()
    #     serializer = MatchDaySerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     if not request.user.is_staff:
    #         return Response({"detail": "Admin access required."}, status=status.HTTP_403_FORBIDDEN)
    #     serializer = MatchDaySerializer(data=request.data)
    #     if serializer.is_valid():
    #         match_day = serializer.save()
    #         self._update_winner(match_day)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def _update_winner(self, match_day):
    #     sets = match_day.sets.all()
    #     if sets.count() == 5:
    #         team_a_wins = sets.filter(winner=match_day.team_a).count()
    #         team_b_wins = sets.filter(winner=match_day.team_b).count()
    #         if team_a_wins > team_b_wins:
    #             match_day.winner = match_day.team_a
    #         elif team_b_wins > team_a_wins:
    #             match_day.winner = match_day.team_b
    #         else:
    #             match_day.winner = None
    #         match_day.save()


class MatchDayDetailView(APIView):
    pass
    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         return [permissions.AllowAny()]
    #     return [permissions.IsAdminUser()]

    # def get(self, request, pk):
    #     try:
    #         match_day = MatchDay.objects.prefetch_related('sets', 'team_a__players', 'team_b__players').get(pk=pk)
    #     except MatchDay.DoesNotExist:
    #         return Response({"detail": "MatchDay not found."}, status=status.HTTP_404_NOT_FOUND)
    #     serializer = MatchDaySerializer(match_day)
    #     return Response(serializer.data)

    # def put(self, request, pk):
    #     try:
    #         match_day = MatchDay.objects.get(pk=pk)
    #     except MatchDay.DoesNotExist:
    #         return Response({"detail": "MatchDay not found."}, status=status.HTTP_404_NOT_FOUND)
    #     serializer = MatchDaySerializer(match_day, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         match_day = serializer.save()
    #         self._update_winner(match_day)
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk):
    #     try:
    #         match_day = MatchDay.objects.get(pk=pk)
    #     except MatchDay.DoesNotExist:
    #         return Response({"detail": "MatchDay not found."}, status=status.HTTP_404_NOT_FOUND)
    #     match_day.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    # def _update_winner(self, match_day):
    #     sets = match_day.sets.all()
    #     if sets.count() == 5:
    #         team_a_wins = sets.filter(winner=match_day.team_a).count()
    #         team_b_wins = sets.filter(winner=match_day.team_b).count()
    #         if team_a_wins > team_b_wins:
    #             match_day.winner = match_day.team_a
    #         elif team_b_wins > team_a_wins:
    #             match_day.winner = match_day.team_b
    #         else:
    #             match_day.winner = None
    #         match_day.save()


class StatsView(APIView):
    pass
    # permission_classes = [permissions.AllowAny]

    # def get(self, request):
    #     team_id = request.query_params.get('team')
    #     player_id = request.query_params.get('player')
    #     date_param = request.query_params.get('date')  # YYYY-MM

    #     filters = Q()

    #     if date_param:
    #         try:
    #             year, month = map(int, date_param.split('-'))
    #             start_date = datetime(year, month, 1)
    #             end_date = datetime(year + (month // 12), (month % 12) + 1, 1)
    #             filters &= Q(matchday__date__gte=start_date, matchday__date__lt=end_date)
    #         except Exception:
    #             return Response({"detail": "Invalid date format. Use YYYY-MM."}, status=status.HTTP_400_BAD_REQUEST)

    #     if player_id:
    #         filters &= Q(player__id=player_id)
    #         matches_won = MatchDay.objects.filter(filters & Q(winner__players__id=player_id)).count()
    #         sets_won = Set.objects.filter(filters & Q(winner__players__id=player_id)).count()
    #     elif team_id:
    #         filters &= Q(team__id=team_id)
    #         matches_won = MatchDay.objects.filter(filters & Q(winner__id=team_id)).count()
    #         sets_won = Set.objects.filter(filters & Q(winner__id=team_id)).count()
    #     else:
    #         matches_won = MatchDay.objects.filter(filters & Q(winner__isnull=False)).count()
    #         sets_won = Set.objects.filter(filters & Q(winner__isnull=False)).count()

    #     data = {
    #         "leaderboard": [{
    #             "matches_won": matches_won,
    #             "sets_won": sets_won,
    #             "streak": 0  # Placeholder
    #         }]
    #     }

    #     return Response(data)
