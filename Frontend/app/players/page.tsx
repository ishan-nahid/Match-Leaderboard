import { api } from "@/lib/api"
import { PlayerCard } from "@/components/player-card"
import { ErrorDisplay } from "@/components/error-boundary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getPlayersData() {
  try {
    const players = await api.getPlayers()
    return players
  } catch (error) {
    console.error("Failed to fetch players data:", error)
    return null
  }
}

export default async function PlayersPage() {
  const players = await getPlayersData()

  if (!players) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-balance">Players</h1>
        <ErrorDisplay message="Failed to load players data. Please check your API connection." />
      </div>
    )
  }

  // Separate players with and without teams
  const playersWithTeams = players.filter((player) => player.team)
  const playersWithoutTeams = players.filter((player) => !player.team)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance mb-2">Players</h1>
        <p className="text-muted-foreground">All registered players and their team assignments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 max-w-2xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">With Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playersWithTeams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unassigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playersWithoutTeams.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Players Grid */}
      {players.length > 0 ? (
        <div className="space-y-8">
          {playersWithTeams.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-balance">Players with Teams</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {playersWithTeams.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
          )}

          {playersWithoutTeams.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-balance">Unassigned Players</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {playersWithoutTeams.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No players found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
