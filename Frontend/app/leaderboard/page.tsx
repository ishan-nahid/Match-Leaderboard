"use client"

import { api } from "@/lib/api"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { ChartWrapper } from "@/components/chart-wrapper"
import { ErrorDisplay } from "@/components/error-boundary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Full Stats type
interface Stats {
  team: string
  matches_won: number
  sets_won: number
  points: number
  deuce_wins: number
  streak: number
}

// Fetch leaderboard data and map to full Stats type
async function getLeaderboardData(): Promise<{ stats: Stats[]; chartData: any } | null> {
  try {
    const apiStats: any[] = await api.getStats() // API returns plain array

    const stats: Stats[] = apiStats.map((s) => ({
      team: s.team,
      matches_won: s.matches_won ?? 0,
      sets_won: s.sets_won ?? 0,
      points: s.points ?? 0,
      deuce_wins: s.deuce_wins ?? 0,
      streak: s.streak ?? 0,
    }))

    const chartData = {
      labels: stats.map((stat) => stat.team),
      datasets: [
        {
          label: "Matches Won",
          data: stats.map((stat) => stat.matches_won),
          backgroundColor: "hsl(var(--chart-1))",
          borderColor: "hsl(var(--chart-1))",
          borderWidth: 1,
        },
      ],
    }

    return { stats, chartData }
  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error)
    return null
  }
}

export default async function LeaderboardPage() {
  const data = await getLeaderboardData()

  if (!data) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-balance">Leaderboard</h1>
        <ErrorDisplay message="Failed to load leaderboard data. Please check your API connection." />
      </div>
    )
  }

  const { stats, chartData } = data

  // Calculate summary statistics
  const totalMatches = stats.reduce((sum, stat) => sum + stat.matches_won, 0)
  const totalSets = stats.reduce((sum, stat) => sum + stat.sets_won, 0)
  const totalPoints = stats.reduce((sum, stat) => sum + stat.points, 0)
  const topTeam = stats.reduce((prev, current) =>
    current.matches_won > prev.matches_won ? current : prev
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">Team rankings and performance statistics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMatches}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leading Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-balance">{topTeam.team}</div>
            <p className="text-xs text-muted-foreground">{topTeam.matches_won} wins</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leaderboard Table - takes 2 columns */}
        <div className="lg:col-span-2">
          <LeaderboardTable stats={stats} />
        </div>

        {/* Chart - takes 1 column */}
        <div>
          <ChartWrapper title="Matches Won by Team" data={chartData} height={400} />
        </div>
      </div>
    </div>
  )
}
