import * as React from "react"
import { Link, useLocation } from "react-router-dom"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  PlaneIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  HomeIcon,
  FileTextIcon,
  BookOpenIcon,
} from "lucide-react"

const navMain = [
  {
    title: "Tourist visa",
    url: "/visit",
    icon: <PlaneIcon />,
    items: [
      { title: "Entry requirement", url: "/visit/entry-requirement" },
      { title: "How to apply", url: "/visit/how-to-apply" },
    ],
  },
  {
    title: "Student visa",
    url: "/student",
    icon: <GraduationCapIcon />,
    items: [
      { title: "Overview", url: "/student/overview" },
      { title: "Documents", url: "/student/documents" },
      { title: "Application process", url: "/student/application-process" },
      { title: "After arrival", url: "/student/after-arrival" },
    ],
  },
  {
    title: "Work visa",
    url: "/work",
    icon: <BriefcaseIcon />,
    items: [
      { title: "Post-study work", url: "/work/post-study-work" },
      { title: "Getting sponsored", url: "/work/getting-sponsored" },
    ],
  },
  {
    title: "Residency pathway",
    url: "/residency",
    icon: <HomeIcon />,
    items: [
      { title: "Permanent residency", url: "/residency/permanent-residency" },
      { title: "Citizenship", url: "/residency/citizenship" },
      { title: "Dual nationality", url: "/residency/dual-nationality" },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg text-xs font-bold">
                SA
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Student Atlas</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} currentPath={location.pathname} />
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link to="/report" />}
                tooltip="Generate report"
                isActive={location.pathname === "/report"}
              >
                <FileTextIcon />
                <span className="font-medium">Generate report</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link to="/citations" />}
                tooltip="Citations"
                isActive={location.pathname === "/citations"}
              >
                <BookOpenIcon />
                <span className="font-medium">Citations</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
