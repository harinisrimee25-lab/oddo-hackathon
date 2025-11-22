"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Mail, CheckCircle, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Password Reset Email Sent",
        description: `An email has been sent to ${values.email} with instructions to reset your password.`,
      });
    }, 2000);
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold font-headline">Stock Master</CardTitle>
        </div>
        {!isSuccess ? (
          <>
            <h2 className="text-2xl font-semibold">Forgot Password?</h2>
            <CardDescription>
              No worries, we'll send you reset instructions.
            </CardDescription>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">Check Your Email</h2>
            <CardDescription>
              We've sent a password reset link to your email.
            </CardDescription>
          </>
        )}
        
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="text-muted-foreground">
              You can close this window now.
            </p>
            <Button asChild className="w-full">
              <Link href="/">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="name@example.com" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">Back to Login</Link>
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
