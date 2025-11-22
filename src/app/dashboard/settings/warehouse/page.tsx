import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';

  
export default function WarehouseSettingsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Warehouse Settings</CardTitle>
                <CardDescription>
                    Manage your warehouse configurations.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Warehouse settings content goes here.</p>
            </CardContent>
        </Card>
    );
}
