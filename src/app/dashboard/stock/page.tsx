
'use client';
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
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  
  const allProducts = [
    {
      product: "Laptop Pro",
      perUnitCost: 1200,
      onHand: 50,
      freeToUse: 45,
      barCodeNumber: "8901234567890",
    },
    {
      product: "Wireless Mouse",
      perUnitCost: 25,
      onHand: 0,
      freeToUse: 0,
      barCodeNumber: "8901234567906",
    },
    {
      product: "Mechanical Keyboard",
      perUnitCost: 150,
      onHand: 75,
      freeToUse: 60,
      barCodeNumber: "8901234567913",
    },
    {
      product: "4K Monitor",
      perUnitCost: 450,
      onHand: 30,
      freeToUse: 25,
      barCodeNumber: "8901234567920",
    },
    {
      product: "Webcam HD",
      perUnitCost: 80,
      onHand: 0,
      freeToUse: 0,
      barCodeNumber: "8901234567937",
    },
  ];

  type Product = typeof allProducts[0];

  function ProductStockTable({ products }: { products: Product[] }) {
    return (
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Barcode Number</TableHead>
                <TableHead className="text-right">Per Unit Cost</TableHead>
                <TableHead className="text-right">On Hand</TableHead>
                <TableHead className="text-right">Free to Use</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.product}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.barCodeNumber}</TableCell>
                  <TableCell className="text-right">${item.perUnitCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.onHand}</TableCell>
                  <TableCell className="text-right">{item.freeToUse}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={item.onHand > 0 ? 'success' : 'destructive'}>
                      {item.onHand > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    )
  }
  
  export default function StockPage() {
    const inStockProducts = allProducts.filter(p => p.onHand > 0);
    const outOfStockProducts = allProducts.filter(p => p.onHand === 0);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Product Stock</CardTitle>
          <CardDescription>
            An overview of your current product inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="in-stock">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="in-stock">In Stock</TabsTrigger>
                    <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
                </TabsList>
                <TabsContent value="in-stock">
                    <ProductStockTable products={inStockProducts} />
                </TabsContent>
                <TabsContent value="out-of-stock">
                    <ProductStockTable products={outOfStockProducts} />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    )
  }
