import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    return (
        <div className="flex items-center justify-center rounded-lg border border-dashed shadow-sm h-full">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    Welcome to your Dashboard
                </h3>
                <p className="text-sm text-muted-foreground">
                    This is where the magic happens.
                </p>
                <Link href="/dashboard/stack">
                    <Button className="mt-4">View Stack</Button>
                </Link>
            </div>
        </div>
    )
}
