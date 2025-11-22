
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
import { Textarea } from '@/components/ui/textarea';

const newAdjustmentFormSchema = z.object({
    productName: z.string().min(2, {
        message: 'Product name must be at least 2 characters.',
    }),
    barcodeNumber: z.string().min(2, {
        message: 'Barcode number must be at least 2 characters.',
    }),
    quantity: z.coerce.number().min(1, {
        message: 'Quantity must be at least 1.',
    }),
    reason: z.string().min(2, {
        message: 'Reason must be at least 2 characters.',
    }),
    type: z.enum(['damage', 'shrinkage', 'expiry']),
});

type NewAdjustmentFormValues = z.infer<typeof newAdjustmentFormSchema>;

interface NewAdjustmentFormProps {
    onAddAdjustment: (data: NewAdjustmentFormValues) => void;
}

export function NewAdjustmentForm({ onAddAdjustment }: NewAdjustmentFormProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { toast } = useToast();
    
    const form = useForm<NewAdjustmentFormValues>({
        resolver: zodResolver(newAdjustmentFormSchema),
        defaultValues: {
            productName: '',
            barcodeNumber: '',
            quantity: 1,
            reason: '',
            type: 'damage',
        },
        mode: 'onChange',
    });

    function onSubmit(data: NewAdjustmentFormValues) {
        setIsSubmitting(true);
        setTimeout(() => {
            onAddAdjustment(data);
            setIsSubmitting(false);
            toast({
                title: 'Adjustment Created',
                description: `A new ${data.type} adjustment for ${data.productName} has been added.`,
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
                        <FormLabel>Adjustment Type</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                            >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="damage" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Damage
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="shrinkage" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Shrinkage
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="expiry" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Expiry
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
                                <Input placeholder="e.g. Laptop Pro" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="barcodeNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Barcode Number</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. 8901234567890" {...field} />
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
                                <Input type="number" placeholder="e.g. 1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reason</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="e.g. Dropped during handling"
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Adjustment
                    </Button>
                </div>
            </form>
        </Form>
    );
}
