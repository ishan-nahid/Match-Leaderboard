import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Match Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">The match you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
