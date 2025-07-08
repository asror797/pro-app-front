"use client"

import type * as React from "react"
import {
  FileText,
  Home,
  Users,
  Clock,
  CheckCircle,
  BarChart3,
  Settings,
  Building2,
  CheckSquare,
  Trophy,
  Workflow,
  LayoutDashboard,
  Inbox,
  PlusCircle,
  MessageCircle,
  CreditCard,
  Server,
  Bot,
  LayoutGrid,
  Wallet,
  ShieldUser,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Menu items
const data = {
  navMain: [
    {
      title: "Boshqaruv paneli",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "So‘rovlar",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Yo'lovchilar",
      url: "/pending-approvals",
      icon: Users,
    },
    {
      title: "Haydovchilar",
      url: "/tasks",
      icon: Users,
    },
    {
      title: "Rejalashtirilgan postlar",
      url: "/leaderboard",
      icon: Clock,
    },
    {
      title: " Telegram guruhlar",
      url: "/workflows",
      icon: MessageCircle,
    },
    {
      title: "To'lovlar",
      url: "#",
      icon: Wallet,
    },
    {
      title: " Points & Rewards",
      url: "#",
      icon: Building2,
    },
    {
      title: "Manage Requests",
      url: "#",
      icon: Users,
    },
    {
      title: "Instansiyalar",
      url: "#",
      icon: Bot,
    },
    {
      title: "User botlar",
      url: "#",
      icon: Server,
    },
  ],
  navSecondary: [
    {
      title: "Fake Reports",
      url: "#",
      icon: BarChart3,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutGrid  className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Dashboard</span>
            <span className="truncate text-xs text-muted-foreground">ProApp System</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 text-xs text-muted-foreground">© 2024 University DocFlow</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
