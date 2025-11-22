
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Link from 'next/link';
import { Receipt, Truck, Package, PackageX, ArrowRightLeft, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Link href="/dashboard/receipts" className="focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group">
        <Card className="transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Receipts
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground group-hover:text-accent-foreground">2 pending</p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/dashboard/deliveries" className="focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group">
        <Card className="transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deliveries
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground group-hover:text-accent-foreground">5 in transit</p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/dashboard/stock?filter=in-stock" className="focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group">
        <Card className="transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">455</div>
            <p className="text-xs text-muted-foreground group-hover:text-accent-foreground">
              5 products
            </p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/dashboard/stock?filter=out-of-stock" className="focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group">
        <Card className="transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <PackageX className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground group-hover:text-accent-foreground">
              Products to restock
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/dashboard/internal-transfers" className="col-span-1 md:col-span-2 lg:col-span-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group">
        <Card className="transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Scheduled Internal Transfer
              </CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4 group-hover:text-accent-foreground">
                Manage and schedule stock movements between your warehouses.
              </p>
            </CardContent>
          </Card>
        </Link>
        
      <Card className="col-span-1 md:col-span-2 lg:col-span-4">
        <CardHeader>
          <div className="flex items-center gap-4">
            <DollarSign className="h-8 w-8 text-muted-foreground" />
            <div>
              <CardTitle>Finance Summary</CardTitle>
              <CardDescription>Check out each column for more details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Annual Company Taxes</p>
              <p className="text-xl font-bold">$500,00</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Next Tax Review Date</p>
              <p className="text-xl font-bold">July 24, 2024</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Estimated Profit</p>
              <p className="text-xl font-bold">$75,000</p>
            </div>
             <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Average Product Price</p>
              <p className="text-xl font-bold">$89.90</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-card">
                <AvatarImage src="https://picsum.photos/seed/10/40" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-card">
                <AvatarImage src="https://picsum.photos/seed/11/40" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-card">
                <AvatarImage src="https://picsum.photos/seed/12/40" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
               <Avatar className="h-8 w-8 border-2 border-card">
                <AvatarFallback>+5</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-sm text-muted-foreground">5 days ago</p>
             <Link href="/dashboard/profile">
                <Button variant="outline">View Summary</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
