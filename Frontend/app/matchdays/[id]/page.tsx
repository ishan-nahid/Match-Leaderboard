import { api } from "@/lib/api"
import { LineChart } from "@/components/line-chart"
import { SetsTable } from "@/components/sets-table"
import { ErrorDisplay } from "@/components/error-boundary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface MatchDetailPageProps {
  params: Promise<{ id: string }>
}

async function getMatchDetail(id: string) {
  try {
    const match = await api.getMatchDay(id)
    return match
  } catch (error) {
    console.error("Failed to fetch match details:", error)
    return null
  }
}

export default async function MatchDetailPage({ params }: MatchDetailPageProps) {
  const { id } = await params
  const match = await getMatchDetail(id)

  if (!match) {
    notFound()
  }

  if (!match.sets || match.sets.length === 0) {
    return (
      <div className="space-y-6">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-balance">Match Details</h1>
        <ErrorDisplay message="No set data available for this match." title="Incomplete Data" />
      </div>
    )
  }

  // Prepare line chart data for scores per set
  const chartData = {
    labels: match.sets.map((set) => `Set ${set.set_number}`),
    datasets: [
      {
        label: match.team_a,
        data: match.sets.map((set) => set.team_a_score),
        borderColor: "hsl(var(--chart-1))",
        backgroundColor: "hsl(var(--chart-1) / 0.1)",
        tension: 0.3,
      },
      {
        label: match.team_b,
        data: match.sets.map((set) => set.team_b_score),
        borderColor: "hsl(var(--chart-2))",
        backgroundColor: "hsl(var(--chart-2) / 0.1)",
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-balance mb-2">Match Details</h1>
        <p className="text-muted-foreground">Detailed breakdown of the match and set scores</p>
      </div>

      {/* Match Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">Match Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Team A</p>
              <p className="text-xl font-semibold">{match.team_a}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">vs</p>
              <Badge variant="outline" className="mt-1">
                {new Date(match.date).toLocaleDateString()}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Team B</p>
              <p className="text-xl font-semibold">{match.team_b}</p>
            </div>
          </div>
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">Winner</p>
            <Badge variant="default" className="mt-1 text-base px-4 py-1">
              {match.winner}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sets Table */}
        <SetsTable sets={match.sets} teamA={match.team_a} teamB={match.team_b} />

        {/* Line Chart */}
        <LineChart title="Score Progression by Set" data={chartData} height={400} />
      </div>
    </div>
  )
}
