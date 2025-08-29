import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Set } from "@/lib/api"

interface SetsTableProps {
  sets: Set[]
  teamA: string
  teamB: string
}

export function SetsTable({ sets, teamA, teamB }: SetsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Set Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Set</TableHead>
              <TableHead className="text-center">{teamA}</TableHead>
              <TableHead className="text-center">{teamB}</TableHead>
              <TableHead className="text-center">Winner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sets.map((set) => {
              const winner = set.team_a_score > set.team_b_score ? teamA : teamB
              return (
                <TableRow key={set.id}>
                  <TableCell className="font-medium">Set {set.set_number}</TableCell>
                  <TableCell className="text-center font-mono">{set.team_a_score}</TableCell>
                  <TableCell className="text-center font-mono">{set.team_b_score}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{winner}</Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
