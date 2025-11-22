import Image from "next/image";
import { TrendingUp } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { SignUpForm } from "@/components/auth/signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LoginPage() {
  const loginImage = PlaceHolderImages.find(img => img.id === 'login-image');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-headline">Stock Master</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Your journey to financial success starts here.
            </p>
          </div>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <p className="text-sm text-center text-muted-foreground my-4">
                    Enter your credentials to access your account.
                </p>
                <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
                <p className="text-sm text-center text-muted-foreground my-4">
                    Create an account to get started.
                </p>
                <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            data-ai-hint={loginImage.imageHint}
            fill
            className="object-cover dark:brightness-[0.2] dark:grayscale"
          />
        )}
      </div>
    </div>
  );
}
