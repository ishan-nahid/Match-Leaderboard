import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MatchDay } from "@/lib/api"
import Link from "next/link"

interface MatchCardProps {
  match: MatchDay
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <Link href={`/matchdays/${match.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="text-balance">
              {match.team_a} vs {match.team_b}
            </span>
            <Badge variant="secondary" className="ml-2">
              {new Date(match.date).toLocaleDateString()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Winner:</span>
            <Badge variant="default">{match.winner}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
