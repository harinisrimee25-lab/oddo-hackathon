
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
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewWarehouseForm } from '@/components/dashboard/new-warehouse-form';

const initialWarehouseData = [
    {
        warehouseNumber: 'WH-001',
        name: 'Main Warehouse',
        location: 'New York, USA',
    },
    {
        warehouseNumber: 'WH-002',
        name: 'Secondary Warehouse',
        location: 'London, UK',
    },
    {
        warehouseNumber: 'WH-003',
        name: 'West Coast Hub',
        location: 'California, USA',
    },
];

type Warehouse = typeof initialWarehouseData[0];
  
export default function WarehouseSettingsPage() {
    const [warehouseData, setWarehouseData] = React.useState(initialWarehouseData);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleAddWarehouse = (newWarehouse: Warehouse) => {
        setWarehouseData((prev) => [...prev, newWarehouse]);
        setIsDialogOpen(false);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Warehouse Settings</CardTitle>
                        <CardDescription>
                            Manage your warehouse configurations.
                        </CardDescription>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                New Warehouse
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Warehouse</DialogTitle>
                            </DialogHeader>
                            <NewWarehouseForm onAddWarehouse={handleAddWarehouse} />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Warehouse Number</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {warehouseData.map((warehouse) => (
                            <TableRow key={warehouse.warehouseNumber}>
                                <TableCell className="font-medium">{warehouse.warehouseNumber}</TableCell>
                                <TableCell>{warehouse.name}</TableCell>
                                <TableCell>{warehouse.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
