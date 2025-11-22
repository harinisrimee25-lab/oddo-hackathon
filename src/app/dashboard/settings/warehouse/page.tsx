
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
import { PlusCircle, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewWarehouseForm } from '@/components/dashboard/new-warehouse-form';
import { Input } from '@/components/ui/input';

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
    const [allWarehouses, setAllWarehouses] = React.useState(initialWarehouseData);
    const [filteredWarehouses, setFilteredWarehouses] = React.useState(initialWarehouseData);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if (!searchTerm) {
            setFilteredWarehouses(allWarehouses);
            return;
        }

        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered = allWarehouses.filter(warehouse =>
            warehouse.name.toLowerCase().includes(lowercasedFilter) ||
            warehouse.location.toLowerCase().includes(lowercasedFilter)
        );
        setFilteredWarehouses(filtered);
    }, [searchTerm, allWarehouses]);

    const handleAddWarehouse = (newWarehouse: Warehouse) => {
        setAllWarehouses((prev) => [...prev, newWarehouse]);
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
                    <div className="flex items-center gap-2">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search by name or location..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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
                        {filteredWarehouses.map((warehouse) => (
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
