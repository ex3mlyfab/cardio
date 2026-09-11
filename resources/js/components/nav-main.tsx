import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-2">
            <SidebarGroupLabel className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
                Clinical workspace
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={item.href === page.url}
                            tooltip={{ children: item.title }}
                            className="data-[active=true]:bg-primary/8 data-[active=true]:text-primary data-[active=true]:shadow-sm"
                        >
                            <Link href={item.href} prefetch className="flex w-full items-center gap-2.5">
                                {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                                <span className="text-sm font-medium">{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
