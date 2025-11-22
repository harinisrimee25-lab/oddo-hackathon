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
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

  const moveHistoryData = [
    {
      reference: 'WH-IN-2024-00125',
      date: '2024-05-20',
      contact: 'Tech Supplies Inc.',
      from: 'Vendor',
      to: 'Main Warehouse',
      quantity: 50,
      status: 'Completed',
    },
    {
      reference: 'WH-OUT-2024-00321',
      date: '2024-05-22',
      contact: 'Retail Store A',
      from: 'Main Warehouse',
      to: 'Store A',
      quantity: 10,
      status: 'In Transit',
    },
    {
        reference: 'WH-ADJ-2024-00045',
        date: '2024-05-23',
        contact: 'Internal',
        from: 'Main Warehouse',
        to: 'Damaged Goods',
        quantity: 2,
        status: 'Completed',
      },
      {
        reference: 'WH-OUT-2024-00322',
        date: '2024-05-24',
        contact: 'Retail Store B',
        from: 'Main Warehouse',
        to: 'Store B',
        quantity: 5,
        status: 'Pending',
      },
  ];

  const inTransitHistory = moveHistoryData.filter(
    (d) => d.status === 'In Transit' || d.status === 'Pending'
  );
  const completedHistory = moveHistoryData.filter(
    (d) => d.status === 'Completed'
  );

  function MoveHistoryTable({ moves }: { moves: typeof moveHistoryData }) {
    return (
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-center">Status</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {moves.map((item) => (
                <TableRow key={item.reference}>
                <TableCell className="font-medium">{item.reference}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell>{item.from}</TableCell>
                <TableCell>{item.to}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-center">
                    <Badge
                    variant={
                        item.status === 'Completed'
                        ? 'default'
                        : item.status === 'In Transit'
                        ? 'secondary'
                        : 'outline'
                    }
                    >
                    {item.status}
                    </Badge>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    )
  }
  
  export default function MoveHistoryPage() {
    return (
      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Move History</CardTitle>
                    <CardDescription>
                        Track all inventory movements.
                    </CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Movement
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="in-transit">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="in-transit">In-Transit</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="in-transit">
                    <MoveHistoryTable moves={inTransitHistory} />
                </TabsContent>
                <TabsContent value="completed">
                    <MoveHistoryTable moves={completedHistory} />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    );
  }
  
