from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Match(models.Model):
    team_a_score = models.IntegerField()
    team_b_score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def winner(self):
        if self.team_a_score > self.team_b_score:
            return 'Team A'
        elif self.team_b_score > self.team_a_score:
            return 'Team B'
        return 'Tie'

    def __str__(self):
        return f"Match on {self.date}: A {self.team_a_score} - B {self.team_b_score}"