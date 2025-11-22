
'use client';

import * as React from 'react';
import { generateFinancialSummary, type GenerateFinancialSummaryOutput } from '@/ai/flows/generate-summary-flow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

function MarkdownRenderer({ content }: { content: string }) {
  // A simple renderer for markdown-like text
  return (
    <div className="space-y-4">
      {content.split('\n\n').map((paragraph, pIndex) => (
        <p key={pIndex} className="text-muted-foreground">
          {paragraph.split('\n').map((line, lIndex) => {
             if (line.startsWith('### ')) {
              return <h3 key={lIndex} className="text-lg font-semibold text-foreground mt-4 mb-2">{line.replace('### ', '')}</h3>
            }
            if (line.startsWith('**') && line.endsWith('**')) {
              return <strong key={lIndex}>{line.substring(2, line.length - 2)}</strong>;
            }
            return <React.Fragment key={lIndex}>{line}<br/></React.Fragment>;
          })}
        </p>
      ))}
    </div>
  );
}


export default function FinancialSummaryPage() {
    const [summary, setSummary] = React.useState<GenerateFinancialSummaryOutput | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const getSummary = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const result = await generateFinancialSummary(warehouseData);
                setSummary(result);
            } catch (err) {
                console.error(err);
                setError('Failed to generate financial summary. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        getSummary();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI-Generated Financial Summary</CardTitle>
                <CardDescription>
                    An automated analysis of your shop's profit and loss across all warehouses for the week.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <p className="ml-4 text-muted-foreground">Generating your financial summary...</p>
                    </div>
                )}
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
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
                                        <MarkdownRenderer content={ws.summary} />
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
