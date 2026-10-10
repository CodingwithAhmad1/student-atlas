/**
 * Visitor feedback. The site has no backend: the browser posts straight to
 * Web3Forms, which emails the submission to Ahmad. A cloud routine triages
 * those emails (feedback-triage/). See HANDBOOK §4.
 *
 * The access key is public by design (it only lets someone send an email to
 * the fixed address it was created for), so it lives here, not in a secret.
 * Leave it empty and the feedback button is not shown.
 */
export const WEB3FORMS_ACCESS_KEY = ""

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

/**
 * Email subject prefix; the triage routine searches Gmail for it. Keep in sync
 * with feedback-triage/TRIAGE-POLICY.md. Each email gets a unique suffix so
 * Gmail never threads two submissions together (the routine labels whole threads).
 */
export const FEEDBACK_SUBJECT = "Student Atlas feedback"

/** Marker field the triage routine requires before it treats an email as feedback. */
export const FEEDBACK_FORM_ID = "student-atlas-feedback-v1"

export const FEEDBACK_MIN_LENGTH = 10
export const FEEDBACK_MAX_LENGTH = 2000

export const isFeedbackEnabled = WEB3FORMS_ACCESS_KEY.length > 0

export interface FeedbackContext {
  page: string
  nationality: string | null
  destinations: string[]
}

export type FeedbackResult = { ok: true } | { ok: false; error: string }

export function validateFeedback(message: string): string | null {
  const length = message.trim().length
  if (length < FEEDBACK_MIN_LENGTH) {
    return `Please write at least ${FEEDBACK_MIN_LENGTH} characters.`
  }
  if (length > FEEDBACK_MAX_LENGTH) {
    return `Please keep it under ${FEEDBACK_MAX_LENGTH} characters.`
  }
  return null
}

/** e.g. "#20261010-1403-k3f9": UTC date and time plus four random characters. */
function feedbackReference(): string {
  const stamp = new Date().toISOString().slice(0, 16).replace(/[-:]/g, "").replace("T", "-")
  return `#${stamp}-${Math.random().toString(36).slice(2, 6)}`
}

export async function submitFeedback(
  message: string,
  context: FeedbackContext,
  botcheck: boolean
): Promise<FeedbackResult> {
  const invalid = validateFeedback(message)
  if (invalid) return { ok: false, error: invalid }
  if (!isFeedbackEnabled) return { ok: false, error: "Feedback isn't set up yet." }

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `${FEEDBACK_SUBJECT} ${feedbackReference()}`,
    from_name: "Student Atlas",
    form: FEEDBACK_FORM_ID,
    message: message.trim(),
    page: context.page,
    nationality: context.nationality ?? "not selected",
    destinations: context.destinations.length > 0 ? context.destinations.join(", ") : "not selected",
    botcheck,
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    })
    const body = (await response.json().catch(() => null)) as { success?: boolean } | null
    if (response.ok && body?.success) return { ok: true }
    if (response.status === 429) {
      return { ok: false, error: "Too many messages just now. Please try again later." }
    }
    return { ok: false, error: "Something went wrong sending your feedback. Please try again later." }
  } catch {
    return { ok: false, error: "Couldn't reach the feedback service. Check your connection and try again." }
  }
}
