

'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Edit, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ReferenceLine, Cell } from "recharts"

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const profileFormSchema = z.object({
  ownerName: z.string().min(2, {
    message: 'Owner name must be at least 2 characters.',
  }),
  shopName: z.string().min(2, {
    message: 'Shop name must be at least 2 characters.',
  }),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type ChartFilter = 'today' | 'this week' | 'this month' | 'this year';

const staticChartData = {
    'this week': [
        { day: "Monday", profit: 1860 },
        { day: "Tuesday", profit: -305 },
        { day: "Wednesday", profit: 2370 },
        { day: "Thursday", profit: 730 },
        { day: "Friday", profit: -500 },
        { day: "Saturday", profit: 2480 },
        { day: "Sunday", profit: 3200 },
    ],
    'this month': Array.from({ length: 30 }, (_, i) => ({
        day: `Day ${i + 1}`,
        profit: Math.floor(Math.random() * 5000) - 1500,
    })),
    'this year': [
        { day: 'Jan', profit: 15000 },
        { day: 'Feb', profit: 18000 },
        { day: 'Mar', profit: 22000 },
        { day: 'Apr', profit: 17000 },
        { day: 'May', profit: 25000 },
        { day: 'Jun', profit: 28000 },
        { day: 'Jul', profit: 31000 },
        { day: 'Aug', profit: 29000 },
        { day: 'Sep', profit: 35000 },
        { day: 'Oct', profit: 38000 },
        { day: 'Nov', profit: 42000 },
        { day: 'Dec', profit: 45000 },
    ],
}
   
const chartConfig = {
    profit: {
        label: "Profit",
        color: "hsl(var(--success))",
    },
    loss: {
        label: "Loss",
        color: "hsl(var(--destructive))",
    }
} satisfies ChartConfig

function CompanyProgressChart() {
    const [filter, setFilter] = React.useState<ChartFilter>('this week');
    const [chartData, setChartData] = React.useState<typeof staticChartData & { today: { day: string, profit: number }[] }>();

    React.useEffect(() => {
        const todayData = [
            { day: '9 AM', profit: Math.floor(Math.random() * 1000) - 200 },
            { day: '10 AM', profit: Math.floor(Math.random() * 1000) - 200 },
            { day: '11 AM', profit: Math.floor(Math.random() * 1000) - 200 },
            { day: '12 PM', profit: Math.floor(Math.random() * 1000) - 200 },
            { day: '1 PM', profit: Math.floor(Math.random() * 1000) - 200 },
            { day: '2 PM', profit: Math.floor(Math.random() * 1000) - 200 },
            { day: '3 PM', profit: Math.floor(Math.random() * 1000) - 200 },
            { day: '4 PM', profit: Math.floor(Math.random() * 1000) - 200 },
        ];
        setChartData({ ...staticChartData, today: todayData });
    }, []);
    
    if (!chartData) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Business Trends</CardTitle>
                </CardHeader>
                <CardContent className="min-h-[200px] w-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }

    const currentData = chartData[filter];
    const dataKey = 'day';

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Business Trends</CardTitle>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter ({filter})
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={filter} onValueChange={(value) => setFilter(value as ChartFilter)}>
                            <DropdownMenuRadioItem value="today">Today</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="this week">This Week</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="this month">This Month</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="this year">This Year</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={currentData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={dataKey}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => {
                                if (filter === 'this week') return value.slice(0, 3);
                                if (filter === 'this month') return value.startsWith('Day 1') || value.endsWith('5') || value.endsWith('0') ? value.replace('Day ', '') : '';
                                return value;
                            }}
                        />
                        <YAxis />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent 
                                indicator="dot" 
                                labelFormatter={(label, payload) => {
                                    const item = payload[0]?.payload;
                                    if(item) {
                                        return `${item.day}`;
                                    }
                                    return label;
                                }}
                                formatter={(value) => {
                                    const label = Number(value) < 0 ? 'Loss' : 'Profit';
                                    const formattedValue = new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(Math.abs(Number(value)));
                                    return (
                                        <div className="flex flex-col">
                                            <span>{label}: {formattedValue}</span>
                                        </div>
                                    )
                                }}
                            />}
                         />
                        <ReferenceLine y={0} stroke="hsl(var(--foreground))" strokeWidth={1} />
                        <Bar dataKey="profit" radius={4}>
                            {currentData.map((d, index) => (
                                <Cell
                                    key={index}
                                    fill={d.profit >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

function ProfilePageComponent() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [user, setUser] = React.useState({
    ownerName: 'John Doe',
    shopName: 'My Awesome Shop',
    email: 'john.doe@example.com',
  });
  const { toast } = useToast();
  const router = useRouter();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: user,
    mode: 'onChange',
  });

  React.useEffect(() => {
    const ownerName = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    if (ownerName) {
      const updatedUser = { ...user, ownerName: ownerName, email: email || user.email };
      setUser(updatedUser);
      form.reset(updatedUser);
    }
  }, []);

  function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    console.log(data);
    setTimeout(() => {
        setUser(data);
        localStorage.setItem('userName', data.ownerName);
        localStorage.setItem('userEmail', data.email);
        window.dispatchEvent(new Event('storage')); // To update header
        setIsSubmitting(false);
        setIsEditing(false);
        toast({
          title: 'Profile Updated',
          description: 'Your profile has been updated successfully.',
        });
      }, 2000);
  }

  const handleSignOut = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.dispatchEvent(new Event('storage'));
    toast({
        title: 'Logout Successful',
        description: 'You have been successfully logged out.',
    });
    router.push('/');
  }

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>My Profile</CardTitle>
                </div>
                {!isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                )}
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://picsum.photos/seed/1/200/200" alt="Shop Logo" />
                            <AvatarFallback>{getInitials(user.ownerName)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1.5">
                            <h3 className="text-lg font-semibold">Shop Logo</h3>
                        </div>
                    </div>
                    <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Owner Name</FormLabel>
                        {isEditing ? (
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                        ) : (
                            <p className="text-base font-bold text-foreground pt-2">{field.value}</p>
                        )}
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="shopName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Shop Name</FormLabel>
                        {isEditing ? (
                            <FormControl>
                                <Input placeholder="Your shop name" {...field} />
                            </FormControl>
                        ) : (
                            <p className="text-base font-bold text-foreground pt-2">{field.value}</p>
                        )}
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        {isEditing ? (
                            <FormControl>
                                <Input placeholder="Your email" {...field} />
                            </FormControl>
                        ) : (
                            <p className="text-base font-bold text-foreground pt-2">{field.value}</p>
                        )}
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                <CardFooter className="border-t px-6 py-4 flex justify-between">
                    {isEditing ? (
                        <>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                            <Button variant="ghost" onClick={() => {
                                form.reset(user);
                                setIsEditing(false)
                            }}>Cancel</Button>
                        </>
                    ) : (
                        <Button variant="destructive" type="button" onClick={handleSignOut}>Sign Out</Button>
                    )}
                </CardFooter>
                </form>
            </Form>
        </Card>
        <CompanyProgressChart />
    </div>
  );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfilePageComponent />
        </Suspense>
    )
}
