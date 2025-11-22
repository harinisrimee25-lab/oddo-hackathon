
'use client';

import * as React from 'react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewTransferForm } from '@/components/dashboard/new-transfer-form';

const initialInternalTransfersData = [
  {
    productName: 'Laptop Pro',
    fromWarehouse: 'Main Warehouse',
    toWarehouse: 'West Coast Hub',
    quantity: 10,
    scheduledDate: '2024-06-15',
    status: 'Pending',
  },
  {
    productName: '4K Monitor',
    fromWarehouse: 'Secondary Warehouse',
    toWarehouse: 'Main Warehouse',
    quantity: 5,
    scheduledDate: '2024-06-10',
    status: 'Completed',
  },
  {
    productName: 'Wireless Mouse',
    fromWarehouse: 'Main Warehouse',
    toWarehouse: 'Secondary Warehouse',
    quantity: 50,
    scheduledDate: '2024-06-20',
    status: 'Pending',
  },
  {
    productName: 'Mechanical Keyboard',
    fromWarehouse: 'West Coast Hub',
    toWarehouse: 'Main Warehouse',
    quantity: 20,
    scheduledDate: '2024-06-05',
    status: 'Completed',
  },
];

export type InternalTransfer = typeof initialInternalTransfersData[0];

function InternalTransferTable({ data }: { data: InternalTransfer[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>From Warehouse</TableHead>
          <TableHead>To Warehouse</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead>Scheduled Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.productName}</TableCell>
            <TableCell>{item.fromWarehouse}</TableCell>
            <TableCell>{item.toWarehouse}</TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell>{item.scheduledDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function InternalTransfersPage() {
  const [transfersData, setTransfersData] = React.useState(initialInternalTransfersData);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const pendingTransfers = transfersData.filter(
    (t) => t.status === 'Pending'
  );
  const completedTransfers = transfersData.filter(
    (t) => t.status === 'Completed'
  );

  const handleAddTransfer = (newTransfer: Omit<InternalTransfer, 'status'>) => {
    const transferWithStatus = {
        ...newTransfer,
        status: 'Pending',
    } as InternalTransfer;

    setTransfersData(prev => [...prev, transferWithStatus]);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Internal Transfers</CardTitle>
            <CardDescription>
              Manage and schedule stock movements between your warehouses.
            </CardDescription>
          </div>
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Transfer
                </Button>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Create New Transfer</DialogTitle>
                  </DialogHeader>
                  <NewTransferForm onAddTransfer={handleAddTransfer} />
              </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <InternalTransferTable data={pendingTransfers} />
          </TabsContent>
          <TabsContent value="completed">
            <InternalTransferTable data={completedTransfers} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
