import { NavMain } from '@/components/nav-main';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, ListChecks, UsersIcon } from 'lucide-react';
import AppLogo from './app-logo';
import { NavUser } from './nav-user';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Create Adult Test',
        href: '/patients/create',
        icon: ListChecks,
    },
    {
        title: 'Adult Test List',
        href: '/patients/',
        icon: UsersIcon,
    },
    {
        title: 'Create Paediatric Test',
        href: '/kids/create',
        icon: ListChecks,
    },
    {
        title: 'Paedriatic Test List',
        href: '/kids/',
        icon: UsersIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-sidebar-border/80 bg-sidebar/95">
            <SidebarHeader className="border-b border-sidebar-border/80 px-2 py-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="h-12 rounded-xl px-2 hover:bg-sidebar-accent/70">
                            <Link href="/dashboard" prefetch className="flex w-full items-center gap-3">
                                <AppLogo />
                                <div className="flex flex-col items-start leading-none text-left">
                                    <span className="text-sm font-semibold text-sidebar-foreground">Cardio</span>
                                    <span className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/60">Clinical records</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2 py-3">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border/80 p-2">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
