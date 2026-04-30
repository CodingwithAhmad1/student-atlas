import {
  DestinationsPreferenceControl,
  NationalityPreferenceControl,
} from "./preference-controls";

export function PreferenceBar() {
  return (
    <div className="grid grid-cols-[auto_1px_1fr] items-center gap-x-4 rounded-lg border bg-card p-4 shadow-sm">
      <NationalityPreferenceControl layout="bar" />

      <div className="h-6 bg-border" />

      <DestinationsPreferenceControl layout="bar" />
    </div>
  );
}
