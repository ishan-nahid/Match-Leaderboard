import { api } from "@/lib/api"
import { MatchCard } from "@/components/match-card"
import { ChartWrapper } from "@/components/chart-wrapper"
import { ErrorDisplay } from "@/components/error-boundary"

async function getHomePageData() {
  try {
    const [matchdays, stats] = await Promise.all([api.getMatchDays(), api.getStats()])

    // Get latest 5 matches
    const latestMatches = matchdays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

    // Prepare chart data for match wins per team
    const teamWins = stats.reduce(
      (acc, stat) => {
        acc[stat.team] = stat.matches_won
        return acc
      },
      {} as Record<string, number>,
    )

    const chartData = {
      labels: Object.keys(teamWins),
      datasets: [
        {
          label: "Matches Won",
          data: Object.values(teamWins),
          backgroundColor: "hsl(var(--chart-1))",
          borderColor: "hsl(var(--chart-1))",
          borderWidth: 1,
        },
      ],
    }

    return { latestMatches, chartData }
  } catch (error) {
    console.error("Failed to fetch home page data:", error)
    return null
  }
}

export default async function HomePage() {
  const data = await getHomePageData()

  if (!data) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-balance">Match Tracker Dashboard</h1>
        <ErrorDisplay message="Failed to load dashboard data. Please check your API connection." />
      </div>
    )
  }

  const { latestMatches, chartData } = data

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance mb-2">Match Tracker Dashboard</h1>
        <p className="text-muted-foreground">Track your latest matches and team performance statistics</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-balance">Latest Matches</h2>
          {latestMatches.length > 0 ? (
            <div className="space-y-4">
              {latestMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No matches found.</p>
          )}
        </div>

        <div>
          <ChartWrapper title="Team Performance - Matches Won" data={chartData} height={400} />
        </div>
      </div>
    </div>
  )
}
