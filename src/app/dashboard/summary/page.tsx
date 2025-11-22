
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const warehouseData = {
    'Main Warehouse': [
        { day: "Monday", profit: 1860 },
        { day: "Tuesday", profit: -305 },
        { day: "Wednesday", profit: 2370 },
        { day: "Thursday", profit: 730 },
        { day: "Friday", profit: -500 },
        { day: "Saturday", profit: 2480 },
        { day: "Sunday", profit: 3200 },
    ],
    'Secondary Warehouse': [
        { day: "Monday", profit: 1200 },
        { day: "Tuesday", profit: 250 },
        { day: "Wednesday", profit: -100 },
        { day: "Thursday", profit: 800 },
        { day: "Friday", profit: 1500 },
        { day: "Saturday", profit: -200 },
        { day: "Sunday", profit: 2100 },
    ],
    'West Coast Hub': [
        { day: "Monday", profit: -500 },
        { day: "Tuesday", profit: 1800 },
        { day: "Wednesday", profit: 2800 },
        { day: "Thursday", profit: -300 },
        { day: "Friday", profit: 3200 },
        { day: "Saturday", profit: 4000 },
        { day: "Sunday", profit: 1500 },
    ],
};

const initialPurchaseData = [
  {
    productName: '4K Monitor',
    date: '2024-05-10',
    quantity: 10,
    pricePerItem: 400,
    totalAmount: 4000,
    barcodeNumber: '8901234567920',
  },
  {
    productName: 'Mechanical Keyboard',
    date: '2024-05-11',
    quantity: 15,
    pricePerItem: 130,
    totalAmount: 1950,
    barcodeNumber: '8901234567913',
  },
];


type SummaryData = {
    overallSummary: string;
    totalProfit: number;
    bestPerformingWarehouse: string;
    lowestPerformingWarehouse: string;
    warehouseSummaries: {
        warehouseName: string;
        totalProfit: number;
        summary: string;
    }[];
}

export default function FinancialSummaryPage() {
    const [summary, setSummary] = React.useState<SummaryData | null>(null);

    React.useEffect(() => {
        const warehouseSummaries = Object.entries(warehouseData).map(([name, data]) => {
            const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
            const bestDay = data.reduce((max, day) => day.profit > max.profit ? day : max, data[0]);
            const worstDay = data.reduce((min, day) => day.profit < min.profit ? day : min, data[0]);
            const summary = `Weekly profit of $${totalProfit.toFixed(2)}. Best day was ${bestDay.day} ($${bestDay.profit.toFixed(2)}) and worst day was ${worstDay.day} ($${worstDay.profit.toFixed(2)}).`
            return { warehouseName: name, totalProfit, summary };
        });

        const totalProfit = warehouseSummaries.reduce((acc, curr) => acc + curr.totalProfit, 0);

        const sortedWarehouses = [...warehouseSummaries].sort((a, b) => b.totalProfit - a.totalProfit);
        const bestPerformingWarehouse = sortedWarehouses[0].warehouseName;
        const lowestPerformingWarehouse = sortedWarehouses[sortedWarehouses.length - 1].warehouseName;

        const overallSummary = `The business performed well this week, achieving a total profit of $${totalProfit.toFixed(2)}. ${bestPerformingWarehouse} was the top performer, while ${lowestPerformingWarehouse} had the lowest profit.`;

        setSummary({
            overallSummary,
            totalProfit,
            bestPerformingWarehouse,
            lowestPerformingWarehouse,
            warehouseSummaries
        });
    }, []);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Financial Summary</CardTitle>
                    <CardDescription>
                        A simple analysis of your shop's profit and loss across all warehouses for the week.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {summary && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">Overall Performance</h2>
                                <p className="text-muted-foreground">{summary.overallSummary}</p>
                                <div className='flex gap-4 mt-4'>
                                    <Badge variant={summary.totalProfit >= 0 ? 'success' : 'destructive'}>
                                        Total Profit: ${summary.totalProfit.toFixed(2)}
                                    </Badge>
                                    <Badge variant='secondary'>
                                        Best Performing: {summary.bestPerformingWarehouse}
                                    </Badge>
                                    <Badge variant='secondary'>
                                        Lowest Performing: {summary.lowestPerformingWarehouse}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">Warehouse Breakdown</h2>
                                <Card>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Warehouse</TableHead>
                                                <TableHead className="text-right">Total Profit</TableHead>
                                                <TableHead>Weekly Summary</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {summary.warehouseSummaries.map((ws) => (
                                                <TableRow key={ws.warehouseName}>
                                                    <TableCell className="font-medium">{ws.warehouseName}</TableCell>
                                                    <TableCell className={`text-right font-semibold ${ws.totalProfit >= 0 ? 'text-success-foreground' : 'text-destructive'}`}>
                                                        ${ws.totalProfit.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">{ws.summary}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Card>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Purchase History</CardTitle>
                    <CardDescription>
                        A list of all items bought for the shop.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Barcode Number</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Quantity</TableHead>
                                <TableHead className="text-right">Price Per Item</TableHead>
                                <TableHead className="text-right">Total Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialPurchaseData.map((item) => (
                                <TableRow key={item.barcodeNumber}>
                                    <TableCell className="font-medium">{item.productName}</TableCell>
                                    <TableCell>{item.barcodeNumber}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                    <TableCell className="text-right">${item.pricePerItem.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${item.totalAmount.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
