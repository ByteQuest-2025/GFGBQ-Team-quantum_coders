import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function ScamHistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call History</CardTitle>
      </CardHeader>
      <Table>
        <TableCaption>A list of your recent analyzed calls.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead>Caller ID</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead className="text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              No scam history found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}
