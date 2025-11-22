
import { SupportForm } from "@/components/support/support-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SupportPage() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-muted/40">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Submit a Support Request</CardTitle>
          <CardDescription>
            Please fill out the form below and we will get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupportForm />
        </CardContent>
      </Card>
    </main>
  );
}

    