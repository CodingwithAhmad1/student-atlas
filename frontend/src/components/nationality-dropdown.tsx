import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { countries } from "@/data/countries";

interface NationalityDropdownProps {
  value: string | null;
  onChange: (value: string) => void;
}

export function NationalityDropdown({ value, onChange }: NationalityDropdownProps) {
  const [query, setQuery] = useState(value ?? "");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query
    ? countries.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : countries;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="text-sm font-medium text-foreground mb-1.5 block">
        Your nationality
      </label>
      <Input
        placeholder="Search your country..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md">
          {filtered.map((country) => (
            <li
              key={country}
              className={`cursor-pointer rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                country === value ? "bg-accent text-accent-foreground" : ""
              }`}
              onMouseDown={() => {
                onChange(country);
                setQuery(country);
                setOpen(false);
              }}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
