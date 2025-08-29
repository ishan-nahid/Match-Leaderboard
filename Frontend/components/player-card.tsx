import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"
import type { Player } from "@/lib/api"

interface PlayerCardProps {
  player: Player
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5" />
          <span className="text-balance">{player.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {player.team ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Team:</p>
            <Badge variant="default">{player.team}</Badge>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No team assigned</p>
        )}
      </CardContent>
    </Card>
  )
}
