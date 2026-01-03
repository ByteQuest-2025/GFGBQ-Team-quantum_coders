'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { ShieldCheck, LayoutDashboard, Mic, History, Settings } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/live-detection', label: 'Live Detection', icon: <Mic /> },
  { href: '/scam-history', label: 'Scam History', icon: <History /> },
  { href: '/settings', label: 'Settings', icon: <Settings /> },
];

const pageTitles: { [key: string]: string } = {
  '/': 'Dashboard',
  '/live-detection': 'Live Detection',
  '/scam-history': 'Scam History',
  '/settings': 'Settings',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'VoiceShield AI';

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">VoiceShield AI</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label}>
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card/50 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10 backdrop-blur-sm">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="w-full flex-1">
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
