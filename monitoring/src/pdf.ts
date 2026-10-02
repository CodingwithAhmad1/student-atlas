import { createHash } from "node:crypto";
import { extractText, getDocumentProxy } from "unpdf";
import { cleanText } from "./normalize";

/** True when the bytes (or the Content-Type) say this is a PDF. */
export function isPdf(bytes: Uint8Array, contentType: string | null): boolean {
  if (contentType?.toLowerCase().includes("application/pdf")) return true;
  // "%PDF" magic number: some servers send PDFs as application/octet-stream.
  return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
}

/** Below this much extracted text, treat the PDF as a scan with no text layer. */
const MIN_PDF_TEXT = 200;

/**
 * Text of a PDF for hashing and diffing. Raw PDF bytes change on every
 * re-export and diff as noise, so the watcher compares the extracted text.
 * A scanned PDF has no text layer: fall back to a hash of the file so that a
 * new version still alerts, with a readable one-line baseline.
 */
export async function pdfToText(bytes: Uint8Array, maxTextChars?: number): Promise<string> {
  const digest = createHash("sha256").update(bytes).digest("hex");
  let pages: string[] = [];
  try {
    const doc = await getDocumentProxy(new Uint8Array(bytes), { verbosity: 0 });
    const { text } = await extractText(doc, { mergePages: false });
    pages = Array.isArray(text) ? text : [text];
  } catch {
    // Not a readable PDF at all (e.g. an HTML error page sent as a PDF).
    return (
      `The file could not be read as a PDF (${bytes.length} bytes). ` +
      `The watcher compares the file itself; SHA-256 ${digest}. Check the link by opening it.`
    );
  }
  const cleaned = cleanText(pages.join("\n"), maxTextChars);
  if (cleaned.length >= MIN_PDF_TEXT) return cleaned;
  return (
    `Scanned PDF with no text layer (${pages.length} page${pages.length === 1 ? "" : "s"}). ` +
    `The watcher compares the file itself; SHA-256 ${digest}. Check a change by opening the PDF.`
  );
}
