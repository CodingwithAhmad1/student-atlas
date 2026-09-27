import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePreferences } from "@/context/preferences";
import { COUNTRY_LABELS } from "@/data/types";
import { homeContent } from "@/data/home-content";
import { NationalityDropdown } from "@/components/nationality-dropdown";
import { DestinationToggles } from "@/components/destination-toggles";
import { PreferenceBar } from "@/components/preference-bar";

function SetupFlow() {
  const { preferences, setNationality, toggleDestination, setDestinations } =
    usePreferences();

  const canSave =
    preferences.nationality !== null && preferences.destinations.length > 0;

  return (
    <div className="mx-auto max-w-lg py-16 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Student Atlas</h1>
        <p className="text-muted-foreground">
          Your guide to studying abroad — and everything that comes after.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your nationality</label>
            <NationalityDropdown
              value={preferences.nationality}
              onChange={setNationality}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Where are you considering studying?</label>
            <p className="text-xs text-muted-foreground">Select one or more destinations to compare.</p>
            <DestinationToggles
              selected={preferences.destinations}
              onToggle={toggleDestination}
            />
          </div>

          <Button
            size="lg"
            className="w-full"
            disabled={!canSave}
            onClick={() => {
              setDestinations([...preferences.destinations]);
            }}
          >
            Save my preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ConfiguredHome() {
  const { preferences } = usePreferences();

  const destinationList = preferences.destinations
    .map((c) => COUNTRY_LABELS[c])
    .join(", ")
    .replace(/, ([^,]*)$/, ", and $1");

  return (
    <div className="mx-auto max-w-4xl py-8 px-4">
      <PreferenceBar />

      <div className="mt-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {homeContent.welcomeHeading}
        </h1>
        <p className="text-lg text-muted-foreground">
          Tailored for {preferences.nationality} nationals exploring{" "}
          {destinationList}.
        </p>
      </div>

      <div className="mt-12 space-y-10">
        {/* What this guide covers */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            What this guide covers
          </h2>
          <p className="text-muted-foreground mb-4">
            {homeContent.whatThisGuideCovers.intro}
          </p>
          <ul className="space-y-2">
            {homeContent.whatThisGuideCovers.sections.map((s) => (
              <li key={s.label} className="text-muted-foreground">
                <strong className="text-foreground">{s.label}</strong> —{" "}
                {s.description}
              </li>
            ))}
          </ul>
        </section>

        {/* How the information is organised */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            How the information is organised
          </h2>
          {homeContent.howOrganised.split("\n\n").map((para, i) => (
            <p key={i} className="text-muted-foreground mb-3">
              {para}
            </p>
          ))}
        </section>

        {/* Tailored to your nationality */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Tailored to your nationality
          </h2>
          <p className="text-muted-foreground">
            {homeContent.tailoredToNationality}
          </p>
        </section>

        {/* Citations and sources */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            Citations and sources
          </h2>
          <p className="text-muted-foreground">
            {homeContent.citationsAndSources}
          </p>
        </section>

        {/* What this guide is not */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            What this guide is not
          </h2>
          <p className="text-muted-foreground">
            {homeContent.whatThisGuideIsNot}
          </p>
        </section>
      </div>
    </div>
  );
}

export function HomePage() {
  const { isConfigured } = usePreferences();

  return isConfigured ? <ConfiguredHome /> : <SetupFlow />;
}
