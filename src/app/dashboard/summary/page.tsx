
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

type SummaryData = {
    overallSummary: string;
    totalProfit: number;
    bestPerformingWarehouse: string;
    lowestPerformingWarehouse: string;
    warehouseSummaries: {
        warehouseName: string;
        totalProfit: number;
        dailyData: { day: string; profit: number }[];
    }[];
}

export default function FinancialSummaryPage() {
    const [summary, setSummary] = React.useState<SummaryData | null>(null);

    React.useEffect(() => {
        const warehouseSummaries = Object.entries(warehouseData).map(([name, data]) => {
            const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
            return { warehouseName: name, totalProfit, dailyData: data };
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

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground mb-2">Warehouse Breakdown</h2>
                            {summary.warehouseSummaries.map((ws, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>{ws.warehouseName}</CardTitle>
                                        <CardDescription>
                                            <Badge variant={ws.totalProfit >= 0 ? 'success' : 'destructive'}>
                                                Weekly Profit: ${ws.totalProfit.toFixed(2)}
                                            </Badge>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                         <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Day</TableHead>
                                                    <TableHead className="text-right">Profit</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {ws.dailyData.map(d => (
                                                    <TableRow key={d.day}>
                                                        <TableCell>{d.day}</TableCell>
                                                        <TableCell className={`text-right ${d.profit >= 0 ? 'text-success-foreground' : 'text-destructive'}`}>
                                                            ${d.profit.toFixed(2)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
