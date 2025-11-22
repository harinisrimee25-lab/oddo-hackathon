
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
import React, { Suspense, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
  
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
  type StockStatus = 'in-stock' | 'out-of-stock' | 'all';

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
  
  function StockPageComponent() {
    const searchParams = useSearchParams();
    const urlFilter = searchParams.get('filter') as StockStatus | null;
    
    const [filter, setFilter] = useState<StockStatus>(urlFilter || 'all');
    const { toast } = useToast();

    useEffect(() => {
        const outOfStockProducts = allProducts.filter(p => p.onHand === 0);
        outOfStockProducts.forEach(p => {
            toast({
                variant: 'destructive',
                title: 'Out of Stock Alert',
                description: `${p.product} is now out of stock.`,
            })
        });

        const lowStockProducts = allProducts.filter(p => p.freeToUse > 0 && p.freeToUse < 26);
        lowStockProducts.forEach(p => {
            toast({
                variant: 'destructive',
                title: 'Low Stock Alert',
                description: `${p.product} has only ${p.freeToUse} items left in free to use stock.`,
            })
        })
    }, [toast]);

    useEffect(() => {
        if (urlFilter) {
            setFilter(urlFilter);
        }
    }, [urlFilter]);

    const getFilteredProducts = () => {
        switch (filter) {
            case 'in-stock':
                return allProducts.filter(p => p.onHand > 0);
            case 'out-of-stock':
                return allProducts.filter(p => p.onHand === 0);
            default:
                return allProducts;
        }
    }

    const filteredProducts = getFilteredProducts();

    return (
      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Product Stock</CardTitle>
                    <CardDescription>
                        An overview of your current product inventory.
                    </CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter ({filter})
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={filter} onValueChange={(value) => setFilter(value as StockStatus)}>
                            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioItem value="in-stock">In Stock</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="out-of-stock">Out of Stock</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent>
           <ProductStockTable products={filteredProducts} />
        </CardContent>
      </Card>
    )
  }

  export default function StockPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <StockPageComponent />
      </Suspense>
    )
  }
