from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Team
from .serializers import TeamSerializer

class TeamListCreateAPIView(APIView):
    def get(self, request):
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeamDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Team.objects.get(pk=pk)
        except Team.DoesNotExist:
            return None

    def get(self, request, pk):
        team = self.get_object(pk)
        if not team:
            return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TeamSerializer(team)
        return Response(serializer.data)

    def put(self, request, pk):
        team = self.get_object(pk)
        if not team:
            return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TeamSerializer(team, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        team = self.get_object(pk)
        if not team:
            return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from .models import Match
from .serializers import MatchSerializer

class MatchListCreateAPIView(APIView):
    def get(self, request):
        matches = Match.objects.all()
        serializer = MatchSerializer(matches, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MatchDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Match.objects.get(pk=pk)
        except Match.DoesNotExist:
            return None

    def get(self, request, pk):
        match = self.get_object(pk)
        if not match:
            return Response({'error': 'Match not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MatchSerializer(match)
        return Response(serializer.data)

    def put(self, request, pk):
        match = self.get_object(pk)
        if not match:
            return Response({'error': 'Match not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MatchSerializer(match, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        match = self.get_object(pk)
        if not match:
            return Response({'error': 'Match not found'}, status=status.HTTP_404_NOT_FOUND)
        match.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
