
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const editStockFormSchema = z.object({
    product: z.string().min(2, {
        message: 'Product name must be at least 2 characters.',
    }),
    onHand: z.coerce.number().min(0, {
        message: 'On-hand quantity must be 0 or greater.',
    }),
    status: z.enum(['in-stock', 'out-of-stock']),
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
            status: product.onHand > 0 ? 'in-stock' : 'out-of-stock',
        },
        mode: 'onChange',
    });

    const status = form.watch('status');

    React.useEffect(() => {
        if (status === 'out-of-stock') {
            form.setValue('onHand', 0);
        } else if (status === 'in-stock' && form.getValues('onHand') === 0) {
            form.setValue('onHand', 1);
        }
    }, [status, form]);

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
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="in-stock">In Stock</SelectItem>
                                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                </SelectContent>
                            </Select>
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
                                <Input type="number" {...field} disabled={status === 'out-of-stock'} />
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
