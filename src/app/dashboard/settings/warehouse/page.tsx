
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const warehouseData = [
    {
        warehouseNumber: 'WH-001',
        name: 'Main Warehouse',
        location: 'New York, USA',
    },
    {
        warehouseNumber: 'WH-002',
        name: 'Secondary Warehouse',
        location: 'London, UK',
    },
    {
        warehouseNumber: 'WH-003',
        name: 'West Coast Hub',
        location: 'California, USA',
    },
];
  
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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Warehouse Number</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {warehouseData.map((warehouse) => (
                            <TableRow key={warehouse.warehouseNumber}>
                                <TableCell className="font-medium">{warehouse.warehouseNumber}</TableCell>
                                <TableCell>{warehouse.name}</TableCell>
                                <TableCell>{warehouse.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
