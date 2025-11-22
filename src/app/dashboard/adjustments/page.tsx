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

const damageData = [
    {
        productName: 'Laptop Pro',
        date: '2024-06-01',
        quantity: 1,
        reason: 'Dropped during handling',
    },
    {
        productName: '4K Monitor',
        date: '2024-06-02',
        quantity: 2,
        reason: 'Screen cracked in storage',
    },
];

const shrinkageData = [
    {
        productName: 'Wireless Mouse',
        date: '2024-06-01',
        quantity: 5,
        reason: 'Inventory count discrepancy',
    },
];

const expiryData = [
    {
        productName: 'Organic Tea Leaves',
        date: '2024-05-31',
        quantity: 10,
        reason: 'Expired on shelf',
    },
];

function AdjustmentTable({ data }: { data: { productName: string; date: string; quantity: number; reason: string; }[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.productName + item.date}>
                        <TableCell className="font-medium">{item.productName}</TableCell>
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
    return (
        <Card>
            <CardHeader>
                <CardTitle>Inventory Adjustments</CardTitle>
                <CardDescription>
                    Track adjustments due to damage, shrinkage, or expiry.
                </CardDescription>
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
                                <AdjustmentTable data={damageData} />
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
                                <AdjustmentTable data={shrinkageData} />
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
                                <AdjustmentTable data={expiryData} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
