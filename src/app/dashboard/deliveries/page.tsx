
'use client';
import React from 'react';
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
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewDeliveryForm } from '@/components/dashboard/new-delivery-form';

const initialDeliveriesData = [
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

type Delivery = typeof initialDeliveriesData[0];

function DeliveryTable({ deliveries }: { deliveries: Delivery[] }) {
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
                                            ? 'success'
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
  const [deliveriesData, setDeliveriesData] = React.useState(initialDeliveriesData);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const pendingDeliveries = deliveriesData.filter(
    (d) => d.deliveryStatus === 'Pending' || d.deliveryStatus === 'Shipped'
  );
  const deliveredDeliveries = deliveriesData.filter(
    (d) => d.deliveryStatus === 'Delivered'
  );

  const handleAddDelivery = (newDelivery: Omit<Delivery, 'totalAmount' | 'deliveryStatus'>) => {
    const deliveryWithTotal = {
      ...newDelivery,
      totalAmount: newDelivery.quantity * newDelivery.costPerItem,
      deliveryStatus: 'Pending',
    } as Delivery;
    setDeliveriesData((prev) => [...prev, deliveryWithTotal]);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Deliveries</CardTitle>
                <CardDescription>
                Track outgoing shipments and their status.
                </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Delivery
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Delivery</DialogTitle>
                    </DialogHeader>
                    <NewDeliveryForm onAddDelivery={handleAddDelivery} />
                </DialogContent>
            </Dialog>
        </div>
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
