
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

const newDeliveryFormSchema = z.object({
    productName: z.string().min(2, {
        message: 'Product name must be at least 2 characters.',
    }),
    quantity: z.coerce.number().min(1, {
        message: 'Quantity must be at least 1.',
    }),
    costPerItem: z.coerce.number().min(0, {
        message: 'Cost must be a positive number.',
    }),
});

type NewDeliveryFormValues = z.infer<typeof newDeliveryFormSchema>;

interface NewDeliveryFormProps {
    onAddDelivery: (data: NewDeliveryFormValues) => void;
}

export function NewDeliveryForm({ onAddDelivery }: NewDeliveryFormProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { toast } = useToast();
    
    const form = useForm<NewDeliveryFormValues>({
        resolver: zodResolver(newDeliveryFormSchema),
        defaultValues: {
            productName: '',
            quantity: 1,
            costPerItem: 0,
        },
        mode: 'onChange',
    });

    function onSubmit(data: NewDeliveryFormValues) {
        setIsSubmitting(true);
        setTimeout(() => {
            onAddDelivery(data);
            setIsSubmitting(false);
            toast({
                title: 'Delivery Created',
                description: `${data.productName} has been scheduled for delivery.`,
            });
            form.reset();
        }, 1000);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    name="costPerItem"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cost Per Item</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g. 25.99" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Delivery
                    </Button>
                </div>
            </form>
        </Form>
    );
}

