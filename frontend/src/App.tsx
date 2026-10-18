import { lazy, Suspense } from "react"
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom"
import { AppSidebar, MobileMenuButton } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { CompassPinIcon } from "@/components/compass-pin-icon"
import { TooltipProvider } from "@/components/ui/tooltip"
import { FeedbackFab } from "@/components/feedback-fab"
import { WelcomeFab } from "@/components/welcome-fab"
import { PreferencesProvider } from "@/context/PreferencesContext"
import { sectionRegistry, sections } from "@/data/sections"
import {
  ACTIVITY_ROUTE,
  DASHBOARD_ROUTE,
  LEGACY_MONITORING_LOG_PATH,
  SOURCE_HEALTH_ROUTE,
  TECHNICAL_EXPLAINER_ROUTE,
} from "@/lib/routes"
import { AboutPage } from "@/pages/about-page"
import { ContentPage } from "@/pages/content-page"
import { HomePage } from "@/pages/home-page"
import { NotFoundPage } from "@/pages/not-found-page"

// Less-visited pages load on demand to keep the initial bundle small.
const ActivityPage = lazy(() => import("@/pages/activity-page").then((m) => ({ default: m.ActivityPage })))
const CitationsPage = lazy(() => import("@/pages/citations-page").then((m) => ({ default: m.CitationsPage })))
const ReportPage = lazy(() => import("@/pages/report-page").then((m) => ({ default: m.ReportPage })))
const TechnicalExplainerPage = lazy(() =>
  import("@/pages/technical-explainer-page").then((m) => ({ default: m.TechnicalExplainerPage }))
)

/** Breadcrumb labels for non-content pages. */
const PAGE_LABELS: Record<string, string> = {
  "/report": "Generate report",
  "/citations": "Citations",
  [ACTIVITY_ROUTE.path]: ACTIVITY_ROUTE.label,
  [TECHNICAL_EXPLAINER_ROUTE.path]: TECHNICAL_EXPLAINER_ROUTE.label,
}

/** Shown in the mobile header on pages without a breadcrumb. */
function MobileBrand() {
  return (
    <Link to="/" className="flex items-center gap-1.5 md:hidden">
      <CompassPinIcon className="size-6" />
      <span className="text-sm font-semibold">Student Atlas</span>
    </Link>
  )
}

function AppBreadcrumb() {
  const { pathname } = useLocation()
  const [sectionSlug, subSlug] = pathname.split("/").filter(Boolean)
  const section = sectionRegistry.get(sectionSlug ?? "")
  const sub = section?.subSections.find((s) => s.slug === subSlug)

  if (section && sub) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to={`/${section.slug}`} />}>{section.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{sub.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
  const label = PAGE_LABELS[pathname]
  if (!label) return <MobileBrand />
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function AppLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0 pb-28 md:pb-0">
          {/* On phones the sidebar is a drawer, so the header carries its trigger and stays pinned. */}
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur transition-[width,height] ease-linear md:static md:h-16 md:border-0 md:bg-transparent md:backdrop-blur-none md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex min-w-0 items-center gap-2 px-4">
              <MobileMenuButton />
              <AppBreadcrumb />
            </div>
          </header>
          <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading…</div>}>
            <Outlet />
          </Suspense>
        </SidebarInset>
        <FeedbackFab />
        <WelcomeFab />
      </SidebarProvider>
    </TooltipProvider>
  )
}

function ContentRoute() {
  const { section = "", sub = "" } = useParams()
  const known = sectionRegistry.get(section)?.subSections.some((s) => s.slug === sub)
  return known ? <ContentPage sectionSlug={section} subSectionSlug={sub} /> : <NotFoundPage />
}

export default function App() {
  return (
    <BrowserRouter>
      <PreferencesProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<AboutPage />} />
            <Route path={DASHBOARD_ROUTE.path} element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/citations" element={<CitationsPage />} />
            <Route path={ACTIVITY_ROUTE.path} element={<ActivityPage />} />
            <Route path={TECHNICAL_EXPLAINER_ROUTE.path} element={<TechnicalExplainerPage />} />
            <Route path={LEGACY_MONITORING_LOG_PATH} element={<Navigate to={SOURCE_HEALTH_ROUTE.path} replace />} />
            {sections.map((s) => (
              <Route
                key={s.slug}
                path={`/${s.slug}`}
                element={<Navigate to={`/${s.slug}/${s.subSections[0].slug}`} replace />}
              />
            ))}
            <Route path="/:section/:sub" element={<ContentRoute />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PreferencesProvider>
    </BrowserRouter>
  )
}
