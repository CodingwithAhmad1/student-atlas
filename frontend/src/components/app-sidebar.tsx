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
  useSidebar,
} from "@/components/ui/sidebar"
import {
  PlaneIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  HomeIcon,
  FileTextIcon,
  BookOpenIcon,
  LayoutDashboardIcon,
  CodeIcon,
  ActivityIcon,
  CircleIcon,
} from "lucide-react"
import { CompassPinIcon } from "@/components/compass-pin-icon"
import {
  MAIN_NAV_SECTIONS,
  NAV_REFERENCE_LINKS,
  TECHNICAL_NAV_SECTION,
} from "@/lib/navigation"

const mainNavIcons: Record<string, React.ElementType> = {
  Dashboard: LayoutDashboardIcon,
  Activity: ActivityIcon,
  "Tourist visa": PlaneIcon,
  "Student visa": GraduationCapIcon,
  "Work visa": BriefcaseIcon,
  "Residency pathway": HomeIcon,
}

const navMain = MAIN_NAV_SECTIONS.map((section) => ({
  ...section,
  icon: React.createElement(mainNavIcons[section.title] ?? CircleIcon),
}))

const referenceNavIcons = [FileTextIcon, BookOpenIcon] as const

const technicalNav = {
  title: TECHNICAL_NAV_SECTION.title,
  url: TECHNICAL_NAV_SECTION.url,
  items: [...TECHNICAL_NAV_SECTION.items],
  icon: React.createElement(CodeIcon),
}

function SidebarToggle() {
  const { toggleSidebar, state } = useSidebar()
  const expanded = state === "expanded"

  return (
    <button
      onClick={toggleSidebar}
      className="flex items-center justify-center shrink-0 w-[18px] h-6 rounded hover:bg-sidebar-accent transition-colors cursor-pointer"
      aria-label="Toggle sidebar"
    >
      {expanded ? (
        /* 3 vertical parallel lines */
        <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1.5" y1="1" x2="1.5" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="5.5" y1="1" x2="5.5" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="9.5" y1="1" x2="9.5" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ) : (
        /* 3 horizontal stacked lines (hamburger) */
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="2" y1="3.5" x2="13" y2="3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="2" y1="7.5" x2="13" y2="7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="2" y1="11.5" x2="13" y2="11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-1.5 pb-0.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-1.5 px-2 py-0.5">
              <SidebarToggle />
              <Link to="/" className="flex items-center gap-1.5 min-w-0 group-data-[collapsible=icon]:hidden">
                <div className="flex items-center justify-center shrink-0 [&_svg]:!size-6">
                  <CompassPinIcon className="size-6" />
                </div>
                <span className="truncate text-[13.5px] font-semibold">
                  Student Atlas
                </span>
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} currentPath={location.pathname} />
        <SidebarSeparator />
        <NavMain items={[technicalNav]} currentPath={location.pathname} groupLabel={null} />
        <SidebarGroup>
          <SidebarMenu>
            {NAV_REFERENCE_LINKS.map((link, i) => {
              const Icon = referenceNavIcons[i]
              return (
                <SidebarMenuItem key={link.url}>
                  <SidebarMenuButton
                    render={<Link to={link.url} />}
                    tooltip={link.title}
                    isActive={location.pathname === link.url}
                  >
                    <Icon />
                    <span className="font-medium">{link.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
