
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Edit } from 'lucide-react';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [user, setUser] = React.useState({
    ownerName: 'John Doe',
    shopName: 'My Awesome Shop',
    email: 'john.doe@example.com',
  });
  const { toast } = useToast();
  
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
        window.dispatchEvent(new Event('storage')); // To update header
        setIsSubmitting(false);
        setIsEditing(false);
        toast({
          title: 'Profile Updated',
          description: 'Your profile has been updated successfully.',
        });
      }, 2000);
  }

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
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
                <Button variant="destructive">Sign Out</Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
