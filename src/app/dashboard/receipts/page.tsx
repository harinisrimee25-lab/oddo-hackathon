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
  
  const salesData = [
    {
      productName: 'Laptop Pro',
      date: '2024-05-15',
      quantity: 2,
      pricePerItem: 1200,
      totalAmount: 2400,
    },
    {
      productName: 'Wireless Mouse',
      date: '2024-05-16',
      quantity: 5,
      pricePerItem: 25,
      totalAmount: 125,
    },
  ];
  
  const purchaseData = [
    {
      productName: '4K Monitor',
      date: '2024-05-10',
      quantity: 10,
      pricePerItem: 400,
      totalAmount: 4000,
    },
    {
      productName: 'Mechanical Keyboard',
      date: '2024-05-11',
      quantity: 15,
      pricePerItem: 130,
      totalAmount: 1950,
    },
  ];
  
  export default function ReceiptsPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Receipts</CardTitle>
          <CardDescription>Track sales and purchases.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sales">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="purchase">Purchase</TabsTrigger>
            </TabsList>
            <TabsContent value="sales">
              <Card>
                <CardHeader>
                  <CardTitle>Sales</CardTitle>
                  <CardDescription>Recent sales transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price Per Item</TableHead>
                        <TableHead className="text-right">Total Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesData.map((item) => (
                        <TableRow key={item.productName}>
                          <TableCell className="font-medium">{item.productName}</TableCell>
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
            </TabsContent>
            <TabsContent value="purchase">
              <Card>
                <CardHeader>
                  <CardTitle>Purchases</CardTitle>
                  <CardDescription>Recent purchase transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price Per Item</TableHead>
                        <TableHead className="text-right">Total Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {purchaseData.map((item) => (
                        <TableRow key={item.productName}>
                          <TableCell className="font-medium">{item.productName}</TableCell>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }
  