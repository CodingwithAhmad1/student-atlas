import { useState } from "react";
import { KeyRoundIcon, ShieldCheckIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { clearPat, getPat, setPat } from "@/lib/github-admin";

/**
 * Admin mode: a fine-grained GitHub token (this repo only, Contents + Pull
 * requests read/write) stored in localStorage unlocks the Approve/Reject
 * buttons. The token never leaves the browser except to api.github.com.
 */
export function AdminGate({ onChange }: { onChange: () => void }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const active = getPat() !== null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        {active ? (
          <>
            <ShieldCheckIcon className="size-3.5 text-green-600" />
            Admin
          </>
        ) : (
          <>
            <KeyRoundIcon className="size-3.5" />
            Admin
          </>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 space-y-3 p-4">
        {active ? (
          <>
            <p className="text-sm leading-relaxed">
              Admin mode is <span className="font-medium text-green-700">active</span> on
              this device — review controls are unlocked.
            </p>
            <button
              type="button"
              onClick={() => {
                clearPat();
                setOpen(false);
                onChange();
              }}
              className="w-full rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
            >
              Remove token from this device
            </button>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Paste a fine-grained GitHub token to unlock Approve/Reject. Scope
              it to the <span className="font-mono text-xs">Zim-Side-Quests</span> repo
              only, with Contents and Pull requests read/write, and set an
              expiry.
            </p>
            <input
              type="password"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="github_pat_…"
              className="w-full rounded-md border bg-background px-3 py-1.5 font-mono text-xs"
            />
            <button
              type="button"
              disabled={draft.trim().length === 0}
              onClick={() => {
                setPat(draft);
                setDraft("");
                setOpen(false);
                onChange();
              }}
              className="w-full rounded-md bg-foreground px-3 py-1.5 text-sm text-background disabled:opacity-50"
            >
              Enable admin mode
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              The token is stored only in this browser's localStorage and is
              sent only to api.github.com. Anyone with access to this device
              could use it — prefer a short expiry.
            </p>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
