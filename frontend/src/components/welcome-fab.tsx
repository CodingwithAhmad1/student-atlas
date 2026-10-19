import { XIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { CompassPinIcon } from "@/components/compass-pin-icon"
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@/components/ui/popover"
import { usePreferences } from "@/context/preferences"
import {
  MAIN_NAV_SECTIONS,
  NAV_REFERENCE_GROUP_TITLE,
  NAV_REFERENCE_LINKS,
  titleToHashLabel,
} from "@/lib/navigation"
import { DASHBOARD_ROUTE } from "@/lib/routes"
import { cn } from "@/lib/utils"

const DASHBOARD_LINK_CLASS =
  "text-primary font-medium underline underline-offset-2 hover:text-primary/80"

const HASH_LINK_CLASS =
  "font-mono text-sm text-primary underline underline-offset-2 hover:text-primary/80"

export function WelcomeFab() {
  const { preferences } = usePreferences()
  const hasNationality = preferences.nationality != null
  const hasDestinations = preferences.destinations.length > 0
  const isComplete = hasNationality && hasDestinations

  let statusMessage: string | null = null
  if (!hasNationality && !hasDestinations) {
    statusMessage =
      "It seems you haven't selected your nationality nor your destination(s)."
  } else if (!hasNationality && hasDestinations) {
    statusMessage = "It seems you haven't selected your nationality."
  } else if (hasNationality && !hasDestinations) {
    statusMessage = "It seems you haven't selected your destination(s)."
  }

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        aria-label="Open Student Atlas welcome"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border bg-background shadow-lg transition-colors hover:bg-muted/40 active:bg-muted/60"
      >
        <CompassPinIcon className="size-9" />
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        className="flex h-[min(572px,calc(100dvh-7rem))] w-[min(576px,calc(100vw-2rem))] flex-col rounded-xl border bg-background p-0 shadow-xl"
      >
        <header className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <CompassPinIcon className="size-5" />
            <span className="text-sm font-semibold">Student Atlas</span>
          </div>
          <PopoverClose
            type="button"
            aria-label="Close"
            className="cursor-pointer rounded p-1 hover:bg-muted"
          >
            <XIcon className="size-4" />
          </PopoverClose>
        </header>
        <div className="flex flex-1 flex-col justify-start overflow-auto p-6">
          <div
            className={cn(
              "mx-auto flex w-full flex-col gap-4 text-left",
              isComplete ? "max-w-xl" : "max-w-md"
            )}
          >
            <h2 className="text-lg font-semibold leading-snug text-foreground">
              Hey, welcome to Student Atlas
            </h2>
            {isComplete ? (
              <>
                <p className="text-base text-muted-foreground">
                  This quick navigator helps you find your way around Student Atlas.
                </p>
                <p className="text-base text-muted-foreground">
                  Use the links below to jump to any part of the guide—each tag opens the
                  matching page.
                </p>
                <nav
                  aria-label="Quick links to Student Atlas sections"
                  className="flex flex-col gap-5 pb-2"
                >
                  {MAIN_NAV_SECTIONS.map((section) => (
                    <section key={section.url}>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {section.title}
                      </h3>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {section.items.length === 0 ? (
                          <li>
                            <Link
                              to={section.url}
                              className={HASH_LINK_CLASS}
                              aria-label={section.title}
                            >
                              #{titleToHashLabel(section.title)}
                            </Link>
                          </li>
                        ) : (
                          section.items.map((item) => (
                            <li key={item.url}>
                              <Link
                                to={item.url}
                                className={HASH_LINK_CLASS}
                                aria-label={item.title}
                              >
                                #{titleToHashLabel(item.title)}
                              </Link>
                            </li>
                          ))
                        )}
                      </ul>
                    </section>
                  ))}
                  <section>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {NAV_REFERENCE_GROUP_TITLE}
                    </h3>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {NAV_REFERENCE_LINKS.map((item) => (
                        <li key={item.url}>
                          <Link
                            to={item.url}
                            className={HASH_LINK_CLASS}
                            aria-label={item.title}
                          >
                            #{titleToHashLabel(item.title)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                </nav>
              </>
            ) : (
              <>
                {statusMessage && (
                  <p className="text-base text-muted-foreground">{statusMessage}</p>
                )}
                <p className="text-base text-muted-foreground">
                  Please select them on the{" "}
                  <Link
                    to={DASHBOARD_ROUTE.path}
                    className={DASHBOARD_LINK_CLASS}
                  >
                    {DASHBOARD_ROUTE.label}
                  </Link>{" "}
                  page in order to use the guide.
                </p>
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
