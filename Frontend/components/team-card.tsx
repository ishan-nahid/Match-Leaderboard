import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import type { Team } from "@/lib/api"

interface TeamCardProps {
  team: Team
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span className="text-balance">{team.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Players:</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{team.player1}</Badge>
            <Badge variant="secondary">{team.player2}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
