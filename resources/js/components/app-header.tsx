import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, ListChecks, Menu, Plus, UsersIcon } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Adult tests',
        href: '/patients',
        icon: ListChecks,
    },
    {
        title: 'Paediatric tests',
        href: '/kids',
        icon: UsersIcon,
    },
];

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    return (
        <>
            <div className="border-border/80 bg-background/95 backdrop-blur-sm">
                <div className="mx-auto flex h-16 items-center gap-3 px-4 md:max-w-7xl">
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-1 h-9 w-9 rounded-lg">
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-72 flex-col bg-sidebar p-0">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="border-b border-sidebar-border/80 p-4 text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current text-sidebar-foreground" />
                                </SheetHeader>
                                <div className="flex flex-1 flex-col gap-4 p-4">
                                    <div className="space-y-1">
                                        {mainNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${page.url === item.href ? 'bg-primary text-primary-foreground shadow-sm' : 'text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}
                                            >
                                                {item.icon && <item.icon className="h-4 w-4" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/dashboard" prefetch className="flex items-center gap-2.5">
                        <AppLogo />
                    </Link>

                    <nav className="hidden items-center gap-2 lg:flex">
                        {mainNavItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${page.url === item.href ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <div className="ml-auto flex items-center gap-2">
                        <Link
                            href="/patients/create"
                            className="hidden items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 md:inline-flex"
                        >
                            <Plus className="h-4 w-4" />
                            New adult test
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="size-10 rounded-full p-1">
                                    <Avatar className="size-8 overflow-hidden rounded-full ring-2 ring-border">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="rounded-lg bg-primary/10 text-sm font-medium text-primary">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="border-b border-border/80 bg-muted/40">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-sm text-muted-foreground md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
