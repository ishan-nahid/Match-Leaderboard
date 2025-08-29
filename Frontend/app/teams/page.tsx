import { api } from "@/lib/api"
import { TeamCard } from "@/components/team-card"
import { ErrorDisplay } from "@/components/error-boundary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getTeamsData() {
  try {
    const teams = await api.getTeams()
    return teams
  } catch (error) {
    console.error("Failed to fetch teams data:", error)
    return null
  }
}

export default async function TeamsPage() {
  const teams = await getTeamsData()

  if (!teams) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-balance">Teams</h1>
        <ErrorDisplay message="Failed to load teams data. Please check your API connection." />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance mb-2">Teams</h1>
        <p className="text-muted-foreground">All registered teams and their players</p>
      </div>

      {/* Summary Card */}
      <Card className="max-w-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{teams.length}</div>
          <p className="text-xs text-muted-foreground">{teams.length * 2} total players</p>
        </CardContent>
      </Card>

      {/* Teams Grid */}
      {teams.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No teams found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
