import { isPdf, pdfToText } from "./pdf";

const USER_AGENT =
  "StudentAtlasMonitor/1.0 (personal project; +https://github.com/HariharRengan/Zim-Side-Quests)";

const TIMEOUT_MS = 30_000;
const MAX_RETRIES = 2;

export interface FetchResult {
  status: number;
  html: string;
  /** Set instead of meaningful `html` when the response is a PDF (extracted text). */
  pdfText?: string;
}

export class FetchError extends Error {
  constructor(
    message: string,
    public readonly status: number | null
  ) {
    super(message);
    this.name = "FetchError";
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryDelayMs(attempt: number, retryAfter: string | null): number {
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds) && seconds > 0) {
      return Math.min(seconds * 1000, 60_000);
    }
  }
  return 2000 * 2 ** attempt;
}

/**
 * Fetch a page with timeout and retries. Retries network errors, 5xx and 429;
 * other HTTP errors (404, 403, ...) fail immediately — they are a signal about
 * the source, not a transient condition. `maxTextChars` caps a PDF's
 * extracted text (HTML is capped by normalizeHtml).
 */
export async function fetchPage(url: string, maxTextChars?: number): Promise<FetchResult> {
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    let response: Response;
    try {
      response = await fetch(url, {
        headers: {
          "User-Agent": USER_AGENT,
          // PDFs are cited too (laws, gazettes); some servers answer 406 to an HTML-only Accept.
          Accept: "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8",
          "Accept-Language": "en",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES) {
        await sleep(retryDelayMs(attempt, null));
        continue;
      }
      throw new FetchError(
        `Network error fetching ${url}: ${err instanceof Error ? err.message : String(err)}`,
        null
      );
    }

    if (response.ok) {
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (isPdf(bytes, response.headers.get("content-type"))) {
        return { status: response.status, html: "", pdfText: await pdfToText(bytes, maxTextChars) };
      }
      return { status: response.status, html: new TextDecoder().decode(bytes) };
    }

    const retryable = response.status >= 500 || response.status === 429;
    if (retryable && attempt < MAX_RETRIES) {
      lastError = new FetchError(
        `HTTP ${response.status} from ${url}`,
        response.status
      );
      await sleep(retryDelayMs(attempt, response.headers.get("retry-after")));
      continue;
    }
    throw new FetchError(`HTTP ${response.status} from ${url}`, response.status);
  }

  throw lastError instanceof Error
    ? lastError
    : new FetchError(`Failed to fetch ${url}`, null);
}
