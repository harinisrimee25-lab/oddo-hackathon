
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Product } from '@/app/dashboard/stock/page';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const editStockFormSchema = z.object({
    product: z.string().min(2, {
        message: 'Product name must be at least 2 characters.',
    }),
    onHand: z.coerce.number().min(0, {
        message: 'On-hand quantity must be 0 or greater.',
    }),
});

type EditStockFormValues = z.infer<typeof editStockFormSchema>;

interface EditStockFormProps {
    product: Product;
    onUpdate: (data: Product) => void;
    onDelete: (data: Product) => void;
}

export function EditStockForm({ product, onUpdate, onDelete }: EditStockFormProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    const form = useForm<EditStockFormValues>({
        resolver: zodResolver(editStockFormSchema),
        defaultValues: {
            product: product.product,
            onHand: product.onHand,
        },
        mode: 'onChange',
    });

    function onSubmit(data: EditStockFormValues) {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            const updatedProduct = {
                ...product,
                product: data.product,
                onHand: data.onHand,
                // Assuming freeToUse might change based on onHand, this is a simple example
                freeToUse: Math.max(0, data.onHand - (product.onHand - product.freeToUse))
            };
            onUpdate(updatedProduct);
            setIsSubmitting(false);
        }, 1000);
    }

    function handleDelete() {
        onDelete(product);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="onHand"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>On-Hand Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between items-center pt-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="button" variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                product from your stock.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    );
}
