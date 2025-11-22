
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

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
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const newReceiptFormSchema = z.object({
    productName: z.string().min(2, {
        message: 'Product name must be at least 2 characters.',
    }),
    quantity: z.coerce.number().min(1, {
        message: 'Quantity must be at least 1.',
    }),
    pricePerItem: z.coerce.number().min(0, {
        message: 'Price must be a positive number.',
    }),
    type: z.enum(['sales', 'purchase']),
});

type NewReceiptFormValues = z.infer<typeof newReceiptFormSchema>;

interface NewReceiptFormProps {
    onAddReceipt: (data: NewReceiptFormValues) => void;
}

export function NewReceiptForm({ onAddReceipt }: NewReceiptFormProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { toast } = useToast();
    
    const form = useForm<NewReceiptFormValues>({
        resolver: zodResolver(newReceiptFormSchema),
        defaultValues: {
            productName: '',
            quantity: 1,
            pricePerItem: 0,
            type: 'sales',
        },
        mode: 'onChange',
    });

    function onSubmit(data: NewReceiptFormValues) {
        setIsSubmitting(true);
        setTimeout(() => {
            onAddReceipt(data);
            setIsSubmitting(false);
            toast({
                title: 'Receipt Created',
                description: `A new ${data.type} receipt for ${data.productName} has been added.`,
            });
            form.reset();
        }, 1000);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Receipt Type</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                            >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="sales" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Sales
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="purchase" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Purchase
                                </FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Wireless Mouse" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g. 10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pricePerItem"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price Per Item</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="e.g. 25.99" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Receipt
                    </Button>
                </div>
            </form>
        </Form>
    );
}
