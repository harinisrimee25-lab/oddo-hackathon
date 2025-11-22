
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Truck, Receipt, SlidersHorizontal, ArrowRightLeft, Package, History, User, Warehouse, Settings, BarChart2 } from "lucide-react";

export default function InstructionsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Guidelines</CardTitle>
                <CardDescription>
                    A complete guide to using the Stock Master application.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <BarChart2 className="h-5 w-5 text-primary" />
                                <span>Dashboard Overview</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 text-muted-foreground">
                            The main dashboard provides a quick overview of your inventory operations. It features summary cards for:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><b>Total Receipts:</b> Shows the total number of sales and purchase receipts, including pending ones.</li>
                                <li><b>Total Deliveries:</b> Displays the total number of deliveries and highlights those currently in transit.</li>
                                <li><b>Total Stock:</b> Gives a count of all products currently in stock.</li>
                                <li><b>Out of Stock:</b> Alerts you to products that need restocking.</li>
                                <li><b>Internal Transfers:</b> Provides a summary of stock movements scheduled between your warehouses.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                             <div className="flex items-center gap-2">
                                <Truck className="h-5 w-5 text-primary" />
                                <span>Operations Management</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 text-muted-foreground">
                           The Operations section allows you to manage day-to-day inventory activities.
                           <div className="mt-4">
                                <h4 className="font-semibold text-foreground flex items-center gap-2"><Receipt className="h-4 w-4" />Receipts</h4>
                                <p className="mt-1">Track all incoming and outgoing products. You can switch between <Badge variant="secondary">Sales</Badge> and <Badge variant="secondary">Purchase</Badge> tabs. Use the "New Receipt" button to log a new transaction.</p>
                           </div>
                           <div className="mt-4">
                                <h4 className="font-semibold text-foreground flex items-center gap-2"><Truck className="h-4 w-4" />Deliveries</h4>
                                <p className="mt-1">Monitor outgoing shipments. You can filter deliveries by status (<Badge variant="destructive">Pending</Badge>, <Badge variant="warning">Shipped</Badge>, <Badge variant="success">Delivered</Badge>). Add a new delivery using the "New Delivery" button.</p>
                           </div>
                           <div className="mt-4">
                                <h4 className="font-semibold text-foreground flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" />Adjustments</h4>
                                <p className="mt-1">Record inventory adjustments for <Badge variant="secondary">Damage</Badge>, <Badge variant="secondary">Shrinkage</Badge>, or <Badge variant="secondary">Expiry</Badge>. Use the search bar to find products and add new adjustments as needed.</p>
                           </div>
                             <div className="mt-4">
                                <h4 className="font-semibold text-foreground flex items-center gap-2"><ArrowRightLeft className="h-4 w-4" />Internal Transfers</h4>
                                <p className="mt-1">Schedule and manage stock movements between your warehouses. View transfers that are <Badge variant="secondary">Pending</Badge> or <Badge variant="secondary">Completed</Badge> and create new ones.</p>
                           </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-primary" />
                                <span>Stock Levels</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 text-muted-foreground">
                            The Stock page provides a detailed view of your product inventory. You can see the quantity on hand, free-to-use stock, and per-unit cost. Use the filter to view all products, only those <Badge variant="success">In Stock</Badge>, or those that are <Badge variant="destructive">Out of Stock</Badge>.
                        </AccordionContent>
                    </AccordionItem>

                     <AccordionItem value="item-4">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <History className="h-5 w-5 text-primary" />
                                <span>Move History</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 text-muted-foreground">
                            This section provides a log of all inventory movements. You can track items that are <Badge variant="secondary">In-Transit</Badge> or view a history of <Badge variant="success">Completed</Badge> movements. Each entry includes a reference number, date, contact, and quantity.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                <span>My Profile</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 text-muted-foreground">
                            On the My Profile page, you can:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>View and edit your personal and shop information.</li>
                                <li>Analyze your business performance with the "Business Trends" chart, which visualizes profit and loss over different time periods.</li>
                                <li>Sign out of your account.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2">
                                <Settings className="h-5 w-5 text-primary" />
                                <span>Settings</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 text-muted-foreground">
                           The Settings section allows you to configure your application.
                           <div className="mt-4">
                                <h4 className="font-semibold text-foreground flex items-center gap-2"><Warehouse className="h-4 w-4" />Warehouse</h4>
                                <p className="mt-1">Manage your warehouse locations. You can add new warehouses, view existing ones, and click on a warehouse to see detailed information about its stock, damaged goods, receipts, and deliveries.</p>
                           </div>
                           <div className="mt-4">
                                <h4 className="font-semibold text-foreground flex items-center gap-2"><Info className="h-4 w-4" />Instructions</h4>
                                <p className="mt-1">You are here! This page provides all the necessary guidelines to use the Stock Master application effectively.</p>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
