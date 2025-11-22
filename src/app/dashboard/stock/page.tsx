import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  const products = [
    {
      product: "Laptop Pro",
      perUnitCost: 1200,
      onHand: 50,
      freeToUse: 45,
    },
    {
      product: "Wireless Mouse",
      perUnitCost: 25,
      onHand: 200,
      freeToUse: 180,
    },
    {
      product: "Mechanical Keyboard",
      perUnitCost: 150,
      onHand: 75,
      freeToUse: 60,
    },
    {
      product: "4K Monitor",
      perUnitCost: 450,
      onHand: 30,
      freeToUse: 25,
    },
    {
      product: "Webcam HD",
      perUnitCost: 80,
      onHand: 100,
      freeToUse: 90,
    },
  ]
  
  export default function StockPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Product Stock</CardTitle>
          <CardDescription>
            An overview of your current product inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Per Unit Cost</TableHead>
                <TableHead className="text-right">On Hand</TableHead>
                <TableHead className="text-right">Free to Use</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.product}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell className="text-right">${item.perUnitCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.onHand}</TableCell>
                  <TableCell className="text-right">{item.freeToUse}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  