import { useState } from "react"
import { CheckCircle2Icon, MessageSquarePlusIcon, XIcon } from "lucide-react"
import { useLocation } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@/components/ui/popover"
import { usePreferences } from "@/context/preferences"
import {
  FEEDBACK_MAX_LENGTH,
  isFeedbackEnabled,
  submitFeedback,
  validateFeedback,
} from "@/lib/feedback"

type Status = "idle" | "sending" | "sent"

/** Sits directly above the WelcomeFab (bottom-6, h-14), centred on it. */
export function FeedbackFab() {
  const { preferences, nationalityLabel } = usePreferences()
  const location = useLocation()
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  if (!isFeedbackEnabled) return null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const invalid = validateFeedback(message)
    if (invalid) {
      setError(invalid)
      return
    }
    setError(null)
    setStatus("sending")
    const result = await submitFeedback(
      message,
      {
        page: location.pathname + location.search,
        nationality: nationalityLabel ?? preferences.nationality,
        destinations: preferences.destinations,
      },
      honeypot
    )
    if (result.ok) {
      setMessage("")
      setStatus("sent")
    } else {
      setError(result.error)
      setStatus("idle")
    }
  }

  return (
    <Popover
      onOpenChange={(open) => {
        if (!open && status === "sent") setStatus("idle")
      }}
    >
      <PopoverTrigger
        type="button"
        aria-label="Send feedback"
        title="Send feedback"
        className="fixed right-7 bottom-24 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full border bg-background shadow-lg transition-colors hover:bg-muted/40 active:bg-muted/60"
      >
        <MessageSquarePlusIcon className="size-5" />
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        className="flex w-[min(28rem,calc(100vw-2rem))] flex-col rounded-xl border bg-background p-0 shadow-xl"
      >
        <header className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <MessageSquarePlusIcon className="size-4" />
            <span className="text-sm font-semibold">Feedback</span>
          </div>
          <PopoverClose
            type="button"
            aria-label="Close"
            className="cursor-pointer rounded p-1 hover:bg-muted"
          >
            <XIcon className="size-4" />
          </PopoverClose>
        </header>

        {status === "sent" ? (
          <div className="flex flex-col items-start gap-3 p-5">
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle2Icon className="size-5 text-green-600" />
              <h2 className="text-base font-semibold">Thank you!</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Your suggestion has been sent. Every message is read, though we can't
              reply to it.
            </p>
            <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
              Send another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5" noValidate>
            <h2 id="feedback-title" className="text-base font-semibold leading-snug">
              Any suggestions/edits you feel could be made to the platform?
            </h2>
            <textarea
              aria-labelledby="feedback-title"
              aria-invalid={error != null}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
                if (error) setError(null)
              }}
              maxLength={FEEDBACK_MAX_LENGTH}
              rows={6}
              placeholder="A fact that looks out of date, something confusing, a feature you'd like…"
              className="min-h-32 w-full resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30"
            />
            {/* Honeypot: hidden from people, filled in by naive bots. */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              checked={honeypot}
              onChange={(event) => setHoneypot(event.target.checked)}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span role="alert" className="text-destructive">
                {error}
              </span>
              <span>
                {message.trim().length}/{FEEDBACK_MAX_LENGTH}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Please don't include personal details. Your message, the page you're on and
              your selected nationality and destinations are emailed to the site owner via
              Web3Forms.
            </p>
            <div className="flex justify-end">
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send"}
              </Button>
            </div>
          </form>
        )}
      </PopoverContent>
    </Popover>
  )
}
