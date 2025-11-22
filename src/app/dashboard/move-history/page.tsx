
'use client';
import React, { useState } from 'react';
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
  import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, Pencil, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { EditMoveHistoryForm } from '@/components/dashboard/edit-move-history-form';

  const initialMoveHistoryData = [
    {
      reference: 'WH-IN-2024-00125',
      date: '2024-05-20',
      contact: 'Tech Supplies Inc.',
      from: 'Vendor',
      to: 'Main Warehouse',
      quantity: 50,
      status: 'Completed',
    },
    {
      reference: 'WH-OUT-2024-00321',
      date: '2024-05-22',
      contact: 'Retail Store A',
      from: 'Main Warehouse',
      to: 'Store A',
      quantity: 10,
      status: 'In Transit',
    },
    {
        reference: 'WH-ADJ-2024-00045',
        date: '2024-05-23',
        contact: 'Internal',
        from: 'Main Warehouse',
        to: 'Damaged Goods',
        quantity: 2,
        status: 'Completed',
      },
      {
        reference: 'WH-OUT-2024-00322',
        date: '2024-05-24',
        contact: 'Retail Store B',
        from: 'Main Warehouse',
        to: 'Store B',
        quantity: 5,
        status: 'Pending',
      },
  ];

  export type MoveHistory = typeof initialMoveHistoryData[0];
  export type MoveStatus = 'Pending' | 'In Transit' | 'Completed' | 'All';


  function MoveHistoryTable({ moves, onEdit }: { moves: MoveHistory[], onEdit: (move: MoveHistory) => void }) {
    return (
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {moves.map((item) => (
                <TableRow key={item.reference}>
                <TableCell className="font-medium">{item.reference}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell>{item.from}</TableCell>
                <TableCell>{item.to}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-center">
                    <Badge
                    variant={
                        item.status === 'Completed'
                        ? 'success'
                        : item.status === 'In Transit'
                        ? 'warning'
                        : 'destructive'
                    }
                    >
                    {item.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-center">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit Move</span>
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    )
  }
  
  export default function MoveHistoryPage() {
    const [moveHistory, setMoveHistory] = useState(initialMoveHistoryData);
    const [filterStatus, setFilterStatus] = useState<MoveStatus>('All');
    const [selectedMove, setSelectedMove] = useState<MoveHistory | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();
    
    const filteredMoves = moveHistory.filter((d) => {
        if (filterStatus === 'All') return true;
        return d.status === filterStatus;
    });

    const handleEditClick = (move: MoveHistory) => {
        setSelectedMove(move);
        setIsDialogOpen(true);
    }

    const handleUpdate = (updatedMove: MoveHistory) => {
        setMoveHistory(prev => prev.map(m => m.reference === updatedMove.reference ? updatedMove : m));
        setIsDialogOpen(false);
        toast({
            title: 'Move Updated',
            description: `Move with reference ${updatedMove.reference} has been updated.`,
        });
    }

    const handleDelete = (moveToDelete: MoveHistory) => {
        setMoveHistory(prev => prev.filter(m => m.reference !== moveToDelete.reference));
        setIsDialogOpen(false);
        toast({
            title: 'Move Deleted',
            description: `Move with reference ${moveToDelete.reference} has been deleted.`,
        });
    }

    return (
    <>
      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Move History</CardTitle>
                    <CardDescription>
                        Track all inventory movements.
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter ({filterStatus})
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup value={filterStatus} onValueChange={(value) => setFilterStatus(value as MoveStatus)}>
                                <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="Pending">Pending</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="In Transit">In Transit</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Movement
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <MoveHistoryTable moves={filteredMoves} onEdit={handleEditClick} />
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Move: {selectedMove?.reference}</DialogTitle>
                </DialogHeader>
                {selectedMove && (
                    <EditMoveHistoryForm
                        move={selectedMove} 
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                )}
            </DialogContent>
        </Dialog>
    </>
    );
  }
  
