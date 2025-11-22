
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

const newWarehouseFormSchema = z.object({
    warehouseNumber: z.string().min(2, {
        message: 'Warehouse number must be at least 2 characters.',
    }),
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    location: z.string().min(2, {
        message: 'Location must be at least 2 characters.',
    }),
});

type NewWarehouseFormValues = z.infer<typeof newWarehouseFormSchema>;

interface NewWarehouseFormProps {
    onAddWarehouse: (data: NewWarehouseFormValues) => void;
}

export function NewWarehouseForm({ onAddWarehouse }: NewWarehouseFormProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { toast } = useToast();
    
    const form = useForm<NewWarehouseFormValues>({
        resolver: zodResolver(newWarehouseFormSchema),
        defaultValues: {
            warehouseNumber: '',
            name: '',
            location: '',
        },
        mode: 'onChange',
    });

    function onSubmit(data: NewWarehouseFormValues) {
        setIsSubmitting(true);
        setTimeout(() => {
            onAddWarehouse(data);
            setIsSubmitting(false);
            toast({
                title: 'Warehouse Created',
                description: `${data.name} has been added to your warehouses.`,
            });
            form.reset();
        }, 1000);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="warehouseNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Warehouse Number</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. WH-004" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. North Distribution Center" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Chicago, USA" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Warehouse
                    </Button>
                </div>
            </form>
        </Form>
    );
}
