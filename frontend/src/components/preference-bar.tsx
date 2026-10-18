import {
  DestinationsPreferenceControl,
  NationalityPreferenceControl,
} from "./preference-controls";

export function PreferenceBar() {
  return (
    <div className="grid grid-cols-1 items-center gap-x-4 gap-y-3 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-[auto_1px_1fr]">
      <NationalityPreferenceControl layout="bar" />

      <div className="hidden h-6 bg-border sm:block" />

      <DestinationsPreferenceControl layout="bar" />
    </div>
  );
}
