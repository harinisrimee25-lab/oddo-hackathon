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
  
  export default function MoveHistoryPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Move History</CardTitle>
          <CardDescription>
            Track all inventory movements.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {moveHistoryData.map((item) => (
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
        </CardContent>
      </Card>
    );
  }
  