
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewAdjustmentForm } from '@/components/dashboard/new-adjustment-form';

const initialAdjustments = {
    damage: [
        {
            productName: 'Laptop Pro',
            barcodeNumber: '8901234567890',
            date: '2024-06-01',
            quantity: 1,
            reason: 'Dropped during handling',
        },
        {
            productName: '4K Monitor',
            barcodeNumber: '8901234567920',
            date: '2024-06-02',
            quantity: 2,
            reason: 'Screen cracked in storage',
        },
    ],
    shrinkage: [
        {
            productName: 'Wireless Mouse',
            barcodeNumber: '8901234567906',
            date: '2024-06-01',
            quantity: 5,
            reason: 'Inventory count discrepancy',
        },
        {
            productName: 'Laptop Pro',
            barcodeNumber: '8901234567890',
            date: '2024-06-03',
            quantity: 1,
            reason: 'Theft',
        },
    ],
    expiry: [
        {
            productName: 'Organic Tea Leaves',
            barcodeNumber: '9988776655441',
            date: '2024-05-31',
            quantity: 10,
            reason: 'Expired on shelf',
        },
    ],
}


type Adjustment = {
    productName: string;
    barcodeNumber: string;
    date: string;
    quantity: number;
    reason: string;
};

function AdjustmentTable({ data }: { data: Adjustment[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Barcode Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.productName + item.date + item.reason}>
                        <TableCell className="font-medium">{item.productName}</TableCell>
                        <TableCell>{item.barcodeNumber}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default function AdjustmentsPage() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [allAdjustments, setAllAdjustments] = React.useState(initialAdjustments);
    const [filteredData, setFilteredData] = React.useState(allAdjustments);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if (!searchTerm) {
            setFilteredData(allAdjustments);
            return;
        }

        const lowercasedFilter = searchTerm.toLowerCase();
        
        const filtered = {
            damage: allAdjustments.damage.filter(item => 
                item.productName.toLowerCase().includes(lowercasedFilter) || 
                item.barcodeNumber.includes(lowercasedFilter)
            ),
            shrinkage: allAdjustments.shrinkage.filter(item => 
                item.productName.toLowerCase().includes(lowercasedFilter) || 
                item.barcodeNumber.includes(lowercasedFilter)
            ),
            expiry: allAdjustments.expiry.filter(item => 
                item.productName.toLowerCase().includes(lowercasedFilter) || 
                item.barcodeNumber.includes(lowercasedFilter)
            ),
        };

        setFilteredData(filtered);
    }, [searchTerm, allAdjustments]);

    const handleAddAdjustment = (newAdjustment: Omit<Adjustment, 'date'> & { type: 'damage' | 'shrinkage' | 'expiry' }) => {
        const adjustmentWithDate = {
            ...newAdjustment,
            date: new Date().toISOString().split('T')[0],
        };
        
        setAllAdjustments(prev => {
            const newAdjustments = { ...prev };
            newAdjustments[newAdjustment.type] = [...newAdjustments[newAdjustment.type], adjustmentWithDate];
            return newAdjustments;
        });

        setIsDialogOpen(false);
    };

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle>Inventory Adjustments</CardTitle>
                        <CardDescription>
                            Track adjustments due to damage, shrinkage, or expiry.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search by product name or barcode..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    New Adjustment
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New Adjustment</DialogTitle>
                                </DialogHeader>
                                <NewAdjustmentForm onAddAdjustment={handleAddAdjustment} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="damage">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="damage">Damage</TabsTrigger>
                        <TabsTrigger value="shrinkage">Shrinkage</TabsTrigger>
                        <TabsTrigger value="expiry">Expiry</TabsTrigger>
                    </TabsList>
                    <TabsContent value="damage">
                        <Card>
                            <CardHeader>
                                <CardTitle>Damaged Goods</CardTitle>
                                <CardDescription>Products reported as damaged.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AdjustmentTable data={filteredData.damage} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="shrinkage">
                        <Card>
                             <CardHeader>
                                <CardTitle>Shrinkage</CardTitle>
                                <CardDescription>Inventory losses due to theft, or administrative errors.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AdjustmentTable data={filteredData.shrinkage} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="expiry">
                        <Card>
                            <CardHeader>
                                <CardTitle>Expired Products</CardTitle>
                                <CardDescription>Products that have passed their expiration date.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AdjustmentTable data={filteredData.expiry} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
