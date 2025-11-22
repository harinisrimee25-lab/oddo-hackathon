import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const deliveriesData = [
  {
    productName: 'Laptop Pro',
    quantity: 1,
    costPerItem: 1200,
    totalAmount: 1200,
    deliveryStatus: 'Shipped',
  },
  {
    productName: 'Wireless Mouse',
    quantity: 2,
    costPerItem: 25,
    totalAmount: 50,
    deliveryStatus: 'Delivered',
  },
  {
    productName: '4K Monitor',
    quantity: 1,
    costPerItem: 450,
    totalAmount: 450,
    deliveryStatus: 'Pending',
  },
  {
    productName: 'Mechanical Keyboard',
    quantity: 1,
    costPerItem: 150,
    totalAmount: 150,
    deliveryStatus: 'Delivered',
  },
];

const pendingDeliveries = deliveriesData.filter(
  (d) => d.deliveryStatus === 'Pending' || d.deliveryStatus === 'Shipped'
);
const deliveredDeliveries = deliveriesData.filter(
  (d) => d.deliveryStatus === 'Delivered'
);

function DeliveryTable({ deliveries }: { deliveries: typeof deliveriesData }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Cost Per Item</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                    <TableHead className="text-center">Delivery Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {deliveries.map((item) => (
                    <TableRow key={item.productName}>
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">
                            ${item.costPerItem.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                            ${item.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center">
                            <Badge
                                variant={
                                    item.deliveryStatus === 'Delivered'
                                        ? 'default'
                                        : item.deliveryStatus === 'Shipped'
                                            ? 'secondary'
                                            : 'outline'
                                }
                            >
                                {item.deliveryStatus}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default function DeliveriesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deliveries</CardTitle>
        <CardDescription>
          Track outgoing shipments and their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <DeliveryTable deliveries={pendingDeliveries} />
          </TabsContent>
          <TabsContent value="delivered">
            <DeliveryTable deliveries={deliveredDeliveries} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
