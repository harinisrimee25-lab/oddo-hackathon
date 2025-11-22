
'use client';
import Link from 'next/link';
import {
  Home,
  Package2,
  PanelLeft,
  Settings,
  History,
  Package,
  Cpu,
  ChevronDown,
  Receipt,
  Truck,
  SlidersHorizontal,
  Menu,
  User,
  Warehouse,
  LogOut,
  ArrowRightLeft,
  Info,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOperationsOpen, setIsOperationsOpen] = React.useState(
    pathname.startsWith('/dashboard/receipts') ||
    pathname.startsWith('/dashboard/deliveries') ||
    pathname.startsWith('/dashboard/adjustments') ||
    pathname.startsWith('/dashboard/internal-transfers')
  );
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(
    pathname.startsWith('/dashboard/settings')
  );
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [userName, setUserName] = React.useState('John Doe');
  const router = useRouter();
  const { toast } = useToast();

  const updateName = () => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  };

  React.useEffect(() => {
    updateName();

    window.addEventListener('storage', updateName);

    return () => {
      window.removeEventListener('storage', updateName);
    };
  }, []);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.dispatchEvent(new Event('storage'));
    toast({
        title: 'Logout Successful',
        description: 'You have been successfully logged out.',
    });
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={cn(
        'grid min-h-screen w-full',
        isSidebarOpen
          ? 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'
          : 'md:grid-cols-[68px_1fr]'
      )}
    >
      <div
        className={cn(
          'hidden border-r bg-sidebar text-sidebar-foreground md:block transition-all',
          isSidebarOpen ? 'w-full' : 'w-[68px]'
        )}
      >
        <div
          className={cn(
            'flex h-full max-h-screen flex-col gap-2',
          )}
        >
          <div className={cn("flex h-14 items-center border-b border-sidebar-border px-4 lg:h-[60px] lg:px-6", isSidebarOpen ? "justify-start" : "justify-center")}>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", isActive('/dashboard') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
              >
                <Home className="h-4 w-4" />
                {isSidebarOpen && 'Dashboard'}
              </Link>
              <Collapsible open={isOperationsOpen} onOpenChange={setIsOperationsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-primary">
                    <Cpu className="h-4 w-4" />
                    {isSidebarOpen && 'Operations'}
                  </div>
                  {isSidebarOpen && <ChevronDown className={`h-4 w-4 transition-transform ${isOperationsOpen ? 'rotate-180' : ''}`} />}
                </CollapsibleTrigger>
                {isSidebarOpen && <CollapsibleContent className="pl-8">
                  <nav className="grid gap-y-2">
                    <Link
                      href="/dashboard/receipts"
                      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", isActive('/dashboard/receipts') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
                    >
                      <Receipt className="h-4 w-4" />
                      Receipts
                    </Link>
                    <Link
                      href="/dashboard/deliveries"
                      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", isActive('/dashboard/deliveries') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
                    >
                      <Truck className="h-4 w-4" />
                      Delivery
                    </Link>
                    <Link
                      href="/dashboard/adjustments"
                      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", isActive('/dashboard/adjustments') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Adjustments
                    </Link>
                     <Link
                      href="/dashboard/internal-transfers"
                      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", isActive('/dashboard/internal-transfers') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
                    >
                      <ArrowRightLeft className="h-4 w-4" />
                      Internal Transfers
                    </Link>
                  </nav>
                </CollapsibleContent>}
              </Collapsible>
              <Link
                href="/dashboard/stock"
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", isActive('/dashboard/stock') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
              >
                <Package className="h-4 w-4" />
                {isSidebarOpen && 'Stock'}
              </Link>
              <Link
                href="/dashboard/move-history"
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", isActive('/dashboard/move-history') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
              >
                <History className="h-4 w-4" />
                {isSidebarOpen && 'Move History'}
              </Link>
              <Link
                href="/dashboard/profile"
                className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", isActive('/dashboard/profile') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
              >
                <User className="h-4 w-4" />
                {isSidebarOpen && 'My Profile'}
              </Link>
              <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-primary">
                    <Settings className="h-4 w-4" />
                    {isSidebarOpen && 'Settings'}
                  </div>
                  {isSidebarOpen && <ChevronDown className={`h-4 w-4 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />}
                </CollapsibleTrigger>
                {isSidebarOpen && <CollapsibleContent className="pl-8">
                  <nav className="grid gap-y-2">
                    <Link
                      href="/dashboard/settings/warehouse"
                      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", pathname.startsWith('/dashboard/settings/warehouse') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
                    >
                      <Warehouse className="h-4 w-4" />
                      Warehouse
                    </Link>
                    <Link
                      href="/dashboard/settings/instructions"
                      className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary", isActive('/dashboard/settings/instructions') ? 'text-primary bg-muted' : 'text-sidebar-foreground')}
                    >
                      <Info className="h-4 w-4" />
                      Instructions
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-primary"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Link>
                  </nav>
                </CollapsibleContent>}
              </Collapsible>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="">Stock Master</span>
                </Link>
                <Link
                  href="/dashboard"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive('/dashboard') && 'text-foreground bg-muted')}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Collapsible open={isOperationsOpen} onOpenChange={setIsOperationsOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <div className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Cpu className="h-5 w-5" />
                        Operations
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOperationsOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-12">
                      <nav className="grid gap-y-2">
                        <Link
                        href="/dashboard/receipts"
                        className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive('/dashboard/receipts') && 'text-foreground bg-muted')}
                        >
                        <Receipt className="h-5 w-5" />
                        Receipts
                        </Link>
                        <Link
                        href="/dashboard/deliveries"
                        className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive('/dashboard/deliveries') && 'text-foreground bg-muted')}
                        >
                        <Truck className="h-5 w-5" />
                        Delivery
                        </Link>
                        <Link
                        href="/dashboard/adjustments"
                        className={cn("mx-[-0-65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive('/dashboard/adjustments') && 'text-foreground bg-muted')}
                        >
                        <SlidersHorizontal className="h-5 w-5" />
                        Adjustments
                        </Link>
                        <Link
                        href="/dashboard/internal-transfers"
                        className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive('/dashboard/internal-transfers') && 'text-foreground bg-muted')}
                        >
                        <ArrowRightLeft className="h-5 w-5" />
                        Internal Transfers
                        </Link>
                    </nav>
                  </CollapsibleContent>
                </Collapsible>
                <Link
                  href="/dashboard/stock"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive('/dashboard/stock') && 'text-foreground bg-muted')}
                >
                  <Package className="h-5 w-5" />
                  Stock
                </Link>
                <Link
                  href="/dashboard/move-history"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive('/dashboard/move-history') && 'text-foreground bg-muted')}
                >
                  <History className="h-5 w-5" />
                  Move History
                </Link>
                 <Link
                  href="/dashboard/profile"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive('/dashboard/profile') && 'text-foreground bg-muted')}
                >
                  <User className="h-5 w-5" />
                  My Profile
                </Link>
                <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <div className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Settings className="h-5 w-5" />
                        Settings
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-12">
                      <nav className="grid gap-y-2">
                        <Link
                        href="/dashboard/settings/warehouse"
                        className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", pathname.startsWith('/dashboard/settings/warehouse') && 'text-foreground bg-muted')}
                        >
                        <Warehouse className="h-5 w-5" />
                        Warehouse
                        </Link>
                        <Link
                          href="/dashboard/settings/instructions"
                          className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", isActive('/dashboard/settings/instructions') && 'text-foreground bg-muted')}
                        >
                          <Info className="h-5 w-5" />
                          Instructions
                        </Link>
                        <Link
                        href="/"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                        </Link>
                    </nav>
                  </CollapsibleContent>
                </Collapsible>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>Stock Master</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{userName}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/seed/1/200/200" alt="User Avatar" />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/support" target="_blank" rel="noopener noreferrer">Support</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
