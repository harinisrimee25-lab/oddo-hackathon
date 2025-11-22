
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
import { Button } from '@/components/ui/button';
import { Filter, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewDeliveryForm } from '@/components/dashboard/new-delivery-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
type DeliveryStatus = 'Pending' | 'Shipped' | 'Delivered' | 'All';

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
                    <TableRow key={item.productName + item.deliveryStatus + item.totalAmount}>
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
                                        ? 'success'
                                        : item.deliveryStatus === 'Shipped'
                                            ? 'secondary'
                                            : 'warning'
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
  const [filterStatus, setFilterStatus] = React.useState<DeliveryStatus>('All');

  const filteredDeliveries = deliveriesData.filter((d) => {
    if (filterStatus === 'All') return true;
    return d.deliveryStatus === filterStatus;
  });

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
            <div className='flex items-center gap-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter ({filterStatus})
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={filterStatus} onValueChange={(value) => setFilterStatus(value as DeliveryStatus)}>
                            <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioItem value="Pending">Pending</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Shipped">Shipped</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Delivered">Delivered</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

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
        </div>
      </CardHeader>
      <CardContent>
        <DeliveryTable deliveries={filteredDeliveries} />
      </CardContent>
    </Card>
  );
}
