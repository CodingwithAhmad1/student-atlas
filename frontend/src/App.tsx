import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { PreferencesProvider } from "@/context/PreferencesContext"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Page } from "@/pages/page"
import { HomePage } from "@/pages/home-page"
import { ContentPage } from "@/pages/content-page"
import { CitationsPage } from "@/pages/citations-page"

const routeMap: Record<string, { section: string; page: string }> = {
  "/visit/entry-requirement": { section: "Tourist visa", page: "Entry requirement" },
  "/visit/how-to-apply": { section: "Tourist visa", page: "How to apply" },
  "/student/overview": { section: "Student visa", page: "Overview" },
  "/student/documents": { section: "Student visa", page: "Documents" },
  "/student/application-process": { section: "Student visa", page: "Application process" },
  "/student/after-arrival": { section: "Student visa", page: "After arrival" },
  "/work/post-study-work": { section: "Work visa", page: "Post-study work" },
  "/work/getting-sponsored": { section: "Work visa", page: "Getting sponsored" },
  "/residency/permanent-residency": { section: "Residency pathway", page: "Permanent residency" },
  "/residency/citizenship": { section: "Residency pathway", page: "Citizenship" },
  "/residency/dual-nationality": { section: "Residency pathway", page: "Dual nationality" },
  "/report": { section: "Generate report", page: "" },
  "/citations": { section: "Citations", page: "" },
}

function AppBreadcrumb() {
  const location = useLocation()
  const route = routeMap[location.pathname]

  if (!route) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {route.page ? (
            <BreadcrumbLink href="#">{route.section}</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{route.section}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {route.page && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{route.page}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function AppLayout() {
  const location = useLocation()
  const route = routeMap[location.pathname]
  const pageTitle = route ? (route.page || route.section) : ""

  // Derive section and subsection slugs from URL
  const pathParts = location.pathname.split("/").filter(Boolean)
  const sectionSlug = pathParts[0] ?? ""
  const subSectionSlug = pathParts[1] ?? ""

  const isHome = location.pathname === "/"

  const isContentRoute =
    sectionSlug &&
    subSectionSlug &&
    ["visit", "student", "work", "residency"].includes(sectionSlug)

  const isCitationsRoute = location.pathname === "/citations"

  return (
    <TooltipProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <AppBreadcrumb />
          </div>
        </header>
        {isHome ? (
          <HomePage />
        ) : isCitationsRoute ? (
          <CitationsPage />
        ) : isContentRoute ? (
          <ContentPage sectionSlug={sectionSlug} subSectionSlug={subSectionSlug} />
        ) : (
          <Page title={pageTitle} />
        )}
      </SidebarInset>
    </SidebarProvider>
    </TooltipProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <PreferencesProvider>
      <Routes>
        <Route path="/visit" element={<Navigate to="/visit/entry-requirement" replace />} />
        <Route path="/student" element={<Navigate to="/student/overview" replace />} />
        <Route path="/work" element={<Navigate to="/work/post-study-work" replace />} />
        <Route path="/residency" element={<Navigate to="/residency/permanent-residency" replace />} />
        <Route path="*" element={<AppLayout />} />
      </Routes>
      </PreferencesProvider>
    </BrowserRouter>
  )
}
