
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function InstructionsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>
                    This is the instructions page. You can add your instructions here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Detailed instructions will go here.</p>
            </CardContent>
        </Card>
    );
}
