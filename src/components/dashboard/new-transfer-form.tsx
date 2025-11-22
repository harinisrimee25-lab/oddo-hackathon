
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { InternalTransfer } from '@/app/dashboard/internal-transfers/page';

const newTransferFormSchema = z.object({
    productName: z.string().min(2, {
        message: 'Product name must be at least 2 characters.',
    }),
    fromWarehouse: z.string().min(2, {
        message: 'Source warehouse must be at least 2 characters.',
    }),
    toWarehouse: z.string().min(2, {
        message: 'Destination warehouse must be at least 2 characters.',
    }),
    quantity: z.coerce.number().min(1, {
        message: 'Quantity must be at least 1.',
    }),
    scheduledDate: z.date({
        required_error: "A date is required.",
    }),
});

type NewTransferFormValues = Omit<z.infer<typeof newTransferFormSchema>, 'scheduledDate'> & { scheduledDate: string };

interface NewTransferFormProps {
    onAddTransfer: (data: Omit<InternalTransfer, 'status'>) => void;
}

export function NewTransferForm({ onAddTransfer }: NewTransferFormProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { toast } = useToast();
    
    const form = useForm<z.infer<typeof newTransferFormSchema>>({
        resolver: zodResolver(newTransferFormSchema),
        defaultValues: {
            productName: '',
            fromWarehouse: '',
            toWarehouse: '',
            quantity: 1,
        },
        mode: 'onChange',
    });

    function onSubmit(data: z.infer<typeof newTransferFormSchema>) {
        setIsSubmitting(true);
        setTimeout(() => {
            const formattedData = {
                ...data,
                scheduledDate: format(data.scheduledDate, 'yyyy-MM-dd'),
            }
            onAddTransfer(formattedData);
            setIsSubmitting(false);
            toast({
                title: 'Transfer Created',
                description: `A new transfer for ${data.productName} has been scheduled.`,
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
                                <Input placeholder="e.g. Laptop Pro" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="fromWarehouse"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>From Warehouse</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Main Warehouse" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="toWarehouse"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>To Warehouse</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. West Coast Hub" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                    name="scheduledDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Scheduled Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Transfer
                    </Button>
                </div>
            </form>
        </Form>
    );
}
