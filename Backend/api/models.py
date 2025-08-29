from django.db import models
from django.core.exceptions import ValidationError


class Player(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    players = models.ManyToManyField("Player")

    def __str__(self):
        return self.name

    def clean(self):
        # Ensure only 2 players per team
        if self.pk and self.players.count() > 2:
            raise ValidationError("A team can only have 2 players.")


class MatchDay(models.Model):
    date = models.DateField()
    team_a = models.ForeignKey("Team", related_name="matches_as_team_a", on_delete=models.CASCADE)
    team_b = models.ForeignKey("Team", related_name="matches_as_team_b", on_delete=models.CASCADE)
    winner = models.ForeignKey(
        "Team", null=True, blank=True, related_name="matches_won", on_delete=models.SET_NULL
    )

    def __str__(self):
        return f"{self.date} - {self.team_a} vs {self.team_b}"

    def update_winner(self):
        """Compute match winner based on best of 5 sets."""
        sets = self.sets.all()
        a_wins = sets.filter(winner=self.team_a).count()
        b_wins = sets.filter(winner=self.team_b).count()

        if a_wins >= 3:
            self.winner = self.team_a
        elif b_wins >= 3:
            self.winner = self.team_b
        else:
            self.winner = None
        self.save(update_fields=["winner"])


class Set(models.Model):
    match_day = models.ForeignKey("MatchDay", related_name="sets", on_delete=models.CASCADE)
    set_number = models.PositiveSmallIntegerField()
    team_a_score = models.PositiveSmallIntegerField()
    team_b_score = models.PositiveSmallIntegerField()
    winner = models.ForeignKey("Team", on_delete=models.CASCADE, related_name="sets_won")
    deuce = models.BooleanField(default=False)

    class Meta:
        unique_together = ("match_day", "set_number")
        ordering = ["match_day", "set_number"]

    def __str__(self):
        return f"Set {self.set_number} - {self.match_day}"

    def clean(self):
        """Validate set rules: first to 21, win by 2 if deuce."""
        if self.team_a_score == self.team_b_score:
            raise ValidationError("Set cannot end in a tie.")

        max_score = max(self.team_a_score, self.team_b_score)
        min_score = min(self.team_a_score, self.team_b_score)

        # Normal win
        if max_score == 21 and min_score <= 19:
            self.deuce = False
        # Deuce condition
        elif max_score > 21 and max_score - min_score == 2:
            self.deuce = True
        else:
            raise ValidationError("Invalid set score.")

        # Assign winner automatically
        if self.team_a_score > self.team_b_score:
            self.winner = self.match_day.team_a
        else:
            self.winner = self.match_day.team_b

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
        # update match winner each time a set is saved
        self.match_day.update_winner()


class StatCache(models.Model):
    WEEK = "week"
    MONTH = "month"
    DATE_RANGE_CHOICES = [
        (WEEK, "Week"),
        (MONTH, "Month"),
    ]

    player = models.ForeignKey("Player", on_delete=models.CASCADE)
    team = models.ForeignKey("Team", on_delete=models.CASCADE)
    date_range = models.CharField(max_length=10, choices=DATE_RANGE_CHOICES)
    stats = models.JSONField()

    def __str__(self):
        return f"{self.player} - {self.date_range} cache"
