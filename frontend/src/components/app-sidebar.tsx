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
} from "lucide-react"
import { DASHBOARD_ROUTE } from "@/lib/routes"

function CompassPinIcon({ className }: { className?: string }) {
  const primary = "#1B2D4F"
  const accent = "#C8963E"
  const accent2 = "#D4A853"

  return (
    <svg viewBox="10 40 280 310" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sbGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="50%" stopColor={accent2} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
      </defs>

      {/* Pin body */}
      <path d="M150,50 C230,50 280,110 280,170 C280,240 150,340 150,340 C150,340 20,240 20,170 C20,110 70,50 150,50Z" fill="none" stroke={primary} strokeWidth="8" />
      <path d="M150,58 C224,58 272,114 272,170 C272,234 150,330 150,330 C150,330 28,234 28,170 C28,114 76,58 150,58Z" fill={primary} opacity="0.04" />

      {/* Compass inside */}
      <g transform="translate(150,170)">
        <circle cx="0" cy="0" r="80" fill="none" stroke={primary} strokeWidth="3" opacity="0.5" />

        {/* Tick marks */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180
          return (
            <line key={`t-${angle}`}
              x1={66 * Math.sin(rad)} y1={-66 * Math.cos(rad)}
              x2={76 * Math.sin(rad)} y2={-76 * Math.cos(rad)}
              stroke={angle === 0 ? accent : primary} strokeWidth="4" opacity="0.8"
            />
          )
        })}

        {/* Rose — major */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const tipX = 55 * Math.sin(rad); const tipY = -55 * Math.cos(rad)
          const lRad = ((angle - 90) * Math.PI) / 180
          const rRad = ((angle + 90) * Math.PI) / 180
          const bLX = 6 * Math.sin(lRad); const bLY = -6 * Math.cos(lRad)
          const bRX = 6 * Math.sin(rRad); const bRY = -6 * Math.cos(rRad)
          const isN = angle === 0
          return (
            <g key={`r-${angle}`}>
              <polygon points={`${tipX},${tipY} 0,0 ${bRX},${bRY}`} fill={isN ? "#C0392B" : primary} opacity={isN ? 0.95 : 0.75} />
              <polygon points={`${tipX},${tipY} 0,0 ${bLX},${bLY}`} fill={isN ? "#E74C3C" : primary} opacity={isN ? 0.7 : 0.4} />
            </g>
          )
        })}

        {/* Rose — minor (gold) */}
        {[45, 135, 225, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const tipX = 34 * Math.sin(rad); const tipY = -34 * Math.cos(rad)
          const lRad = ((angle - 90) * Math.PI) / 180
          const rRad = ((angle + 90) * Math.PI) / 180
          return (
            <g key={`m-${angle}`}>
              <polygon points={`${tipX},${tipY} 0,0 ${3 * Math.sin(rRad)},${-3 * Math.cos(rRad)}`} fill="url(#sbGold)" opacity="0.7" />
              <polygon points={`${tipX},${tipY} 0,0 ${3 * Math.sin(lRad)},${-3 * Math.cos(lRad)}`} fill={accent} opacity="0.4" />
            </g>
          )
        })}

        <circle cx="0" cy="0" r="6" fill="none" stroke="url(#sbGold)" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="2.5" fill={accent} />
      </g>
    </svg>
  )
}

const navMain = [
  {
    title: DASHBOARD_ROUTE.label,
    url: DASHBOARD_ROUTE.path,
    icon: <LayoutDashboardIcon />,
    items: [],
  },
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
