
'use client';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';

// Mock data - in a real app, you would fetch this based on warehouseId
const warehouseData = {
    'WH-001': {
        name: 'Main Warehouse',
        location: 'New York, USA',
        stock: [
            { product: 'Laptop Pro', onHand: 20, freeToUse: 18 },
            { product: 'Wireless Mouse', onHand: 100, freeToUse: 90 },
        ],
        damaged: [
            { productName: 'Laptop Pro', quantity: 1, reason: 'Dropped' },
        ],
        receipts: [
            { productName: 'Laptop Pro', type: 'Purchase', quantity: 25 },
        ],
        deliveries: [
            { productName: 'Laptop Pro', status: 'Shipped', quantity: 5 },
        ],
    },
    'WH-002': {
        name: 'Secondary Warehouse',
        location: 'London, UK',
        stock: [
            { product: '4K Monitor', onHand: 15, freeToUse: 12 },
            { product: 'Mechanical Keyboard', onHand: 40, freeToUse: 35 },
        ],
        damaged: [],
        receipts: [
            { productName: '4K Monitor', type: 'Purchase', quantity: 20 },
        ],
        deliveries: [
             { productName: '4K Monitor', status: 'Delivered', quantity: 5 },
        ],
    },
    'WH-003': {
        name: 'West Coast Hub',
        location: 'California, USA',
        stock: [
            { product: 'Webcam HD', onHand: 50, freeToUse: 45 },
        ],
        damaged: [
             { productName: 'Webcam HD', quantity: 2, reason: 'Cracked lens' },
        ],
        receipts: [],
        deliveries: [
            { productName: 'Webcam HD', status: 'Pending', quantity: 5 },
        ],
    }
};


export default function WarehouseDetailsPage() {
    const params = useParams();
    const warehouseId = params.warehouseId as string;
    const data = warehouseData[warehouseId as keyof typeof warehouseData];

    if (!data) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Warehouse Not Found</CardTitle>
                    <CardDescription>The requested warehouse could not be found.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/dashboard/settings/warehouse">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Warehouses
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{data.name} ({warehouseId})</CardTitle>
                        <CardDescription>{data.location}</CardDescription>
                    </div>
                    <Link href="/dashboard/settings/warehouse">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Warehouses
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="stock">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="stock">Available Stock</TabsTrigger>
                        <TabsTrigger value="damaged">Damaged</TabsTrigger>
                        <TabsTrigger value="receipts">Receipts</TabsTrigger>
                        <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="stock">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">On Hand</TableHead>
                                    <TableHead className="text-right">Free to Use</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.stock.map((item) => (
                                    <TableRow key={item.product}>
                                        <TableCell className="font-medium">{item.product}</TableCell>
                                        <TableCell className="text-right">{item.onHand}</TableCell>
                                        <TableCell className="text-right">{item.freeToUse}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>

                    <TabsContent value="damaged">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead className="text-right">Quantity</TableHead>
                                    <TableHead>Reason</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.damaged.map((item) => (
                                    <TableRow key={item.productName + item.reason}>
                                        <TableCell className="font-medium">{item.productName}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell>{item.reason}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>

                    <TabsContent value="receipts">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Quantity</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.receipts.map((item) => (
                                    <TableRow key={item.productName + item.type}>
                                        <TableCell className="font-medium">{item.productName}</TableCell>
                                        <TableCell>
                                            <Badge variant={item.type === 'Purchase' ? 'secondary' : 'default'}>{item.type}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>

                    <TabsContent value="deliveries">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-right">Quantity</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.deliveries.map((item) => (
                                    <TableRow key={item.productName + item.status}>
                                        <TableCell className="font-medium">{item.productName}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge
                                                variant={
                                                    item.status === 'Delivered'
                                                        ? 'default'
                                                        : item.status === 'Shipped'
                                                            ? 'secondary'
                                                            : 'outline'
                                                }
                                            >
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
