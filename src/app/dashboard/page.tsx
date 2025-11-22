import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Receipt, Truck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receipts</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardDescription>
            Manage incoming inventory and process new stock.
          </CardDescription>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/receipts">Go to Receipts</Link>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Deliveries</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardDescription>
            Organize outgoing shipments and track deliveries.
          </CardDescription>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/deliveries">Go to Deliveries</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
