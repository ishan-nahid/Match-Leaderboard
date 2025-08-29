import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { Stats } from "@/lib/api"

interface LeaderboardTableProps {
  stats: Stats[]
}

function getStreakIcon(streak: number) {
  if (streak > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
  if (streak < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
  return <Minus className="h-4 w-4 text-muted-foreground" />
}

function getStreakColor(streak: number) {
  if (streak > 0) return "text-green-600"
  if (streak < 0) return "text-red-600"
  return "text-muted-foreground"
}

export function LeaderboardTable({ stats }: LeaderboardTableProps) {
  // Sort by matches won (descending), then by points (descending)
  const sortedStats = [...stats].sort((a, b) => {
    if (b.matches_won !== a.matches_won) {
      return b.matches_won - a.matches_won
    }
    return b.points - a.points
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Team Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">Matches Won</TableHead>
              <TableHead className="text-center">Sets Won</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-center">Deuce Wins</TableHead>
              <TableHead className="text-center">Streak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStats.map((stat, index) => (
              <TableRow key={stat.team}>
                <TableCell className="font-medium">
                  {index === 0 && (
                    <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                      #{index + 1}
                    </Badge>
                  )}
                  {index === 1 && (
                    <Badge variant="secondary" className="bg-gray-400 hover:bg-gray-500 text-white">
                      #{index + 1}
                    </Badge>
                  )}
                  {index === 2 && (
                    <Badge variant="outline" className="border-amber-600 text-amber-600">
                      #{index + 1}
                    </Badge>
                  )}
                  {index > 2 && <Badge variant="outline">#{index + 1}</Badge>}
                </TableCell>
                <TableCell className="font-semibold">{stat.team}</TableCell>
                <TableCell className="text-center font-mono">{stat.matches_won}</TableCell>
                <TableCell className="text-center font-mono">{stat.sets_won}</TableCell>
                <TableCell className="text-center font-mono">{stat.points}</TableCell>
                <TableCell className="text-center font-mono">{stat.deuce_wins}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {getStreakIcon(stat.streak)}
                    <span className={`font-mono ${getStreakColor(stat.streak)}`}>{Math.abs(stat.streak)}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
