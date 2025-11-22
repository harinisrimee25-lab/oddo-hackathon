
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
import { MoveHistory } from '@/app/dashboard/move-history/page';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';

const newMoveHistoryFormSchema = z.object({
    reference: z.string().min(2, { message: 'Reference must be at least 2 characters.' }),
    date: z.date({ required_error: "A date is required."}),
    contact: z.string().min(2, { message: 'Contact must be at least 2 characters.' }),
    from: z.string().min(2, { message: 'From location must be at least 2 characters.' }),
    to: z.string().min(2, { message: 'To location must be at least 2 characters.' }),
    quantity: z.coerce.number().min(1, { message: 'Quantity must be at least 1.' }),
    status: z.enum(['Pending', 'In Transit', 'Completed']),
});

type NewMoveHistoryFormValues = z.infer<typeof newMoveHistoryFormSchema>;

interface NewMoveHistoryFormProps {
    onAddMove: (data: MoveHistory) => void;
}

export function NewMoveHistoryForm({ onAddMove }: NewMoveHistoryFormProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { toast } = useToast();
    
    const form = useForm<NewMoveHistoryFormValues>({
        resolver: zodResolver(newMoveHistoryFormSchema),
        defaultValues: {
            reference: '',
            contact: '',
            from: '',
            to: '',
            quantity: 1,
            status: 'Pending',
        },
        mode: 'onChange',
    });

    function onSubmit(data: NewMoveHistoryFormValues) {
        setIsSubmitting(true);
        setTimeout(() => {
            const newMove = {
                ...data,
                date: format(data.date, 'yyyy-MM-dd'),
            };
            onAddMove(newMove);
            setIsSubmitting(false);
            form.reset();
        }, 1000);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reference</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. WH-IN-2024-..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
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
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Retail Store A" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>From</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Main Warehouse" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>To</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Store A" {...field} />
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
                                <Input type="number" {...field} />
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
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Transit">In Transit</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Movement
                    </Button>
                </div>
            </form>
        </Form>
    );
}

