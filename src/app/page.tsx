"use client";

import { useEffect, useMemo, useState } from "react";
import { AICompass } from "@/components/AICompass";
import { Checkpoint } from "@/components/Checkpoint";
import { FinalVerdict } from "@/components/FinalVerdict";
import { Hero } from "@/components/Hero";
import { JourneyMap } from "@/components/JourneyMap";
import { PresentationModeToggle } from "@/components/PresentationModeToggle";
import { TechnoCat } from "@/components/TechnoCat";
import { assets } from "@/data/assets";
import { catMessages } from "@/data/catMessages";
import type { ChoiceKind, ZoneId } from "@/data/zones";
import { zones } from "@/data/zones";
import { calculateScores, getVerdict } from "@/lib/verdict";

const JOURNEY_STORAGE_KEY = "ai-jungle-journey";
const NAME_STORAGE_KEY = "ai-jungle-user-name";

type StoredJourney = {
  userName: string;
  hasStarted: boolean;
  currentIndex: number;
  presentationMode: boolean;
  choices: Partial<Record<ZoneId, ChoiceKind>>;
};

function isChoice(value: unknown): value is ChoiceKind {
  return value === "responsible" || value === "dangerous";
}

function sanitizeChoices(value: unknown): Partial<Record<ZoneId, ChoiceKind>> {
  if (!value || typeof value !== "object") {
    return {};
  }

  return zones.reduce<Partial<Record<ZoneId, ChoiceKind>>>((safeChoices, zone) => {
    const choice = (value as Record<string, unknown>)[zone.id];
    if (isChoice(choice)) {
      safeChoices[zone.id] = choice;
    }
    return safeChoices;
  }, {});
}

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [userName, setUserName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices] = useState<Partial<Record<ZoneId, ChoiceKind>>>({});
  const [presentationMode, setPresentationMode] = useState(false);
  const [savedJourney, setSavedJourney] = useState<StoredJourney | null>(null);

  useEffect(() => {
    try {
      const storedJourney = localStorage.getItem(JOURNEY_STORAGE_KEY);
      const storedName = localStorage.getItem(NAME_STORAGE_KEY) ?? "";

      if (storedJourney) {
        const parsed = JSON.parse(storedJourney) as Partial<StoredJourney>;
        const savedChoices = sanitizeChoices(parsed.choices);
        const savedCurrentIndex = Math.min(Math.max(Number(parsed.currentIndex) || 0, 0), zones.length);
        const savedUserName = typeof parsed.userName === "string" ? parsed.userName : storedName;

        setUserName(savedUserName);
        setHasStarted(false);
        setCurrentIndex(savedCurrentIndex);
        setPresentationMode(false);
        setChoices(savedChoices);
        setSavedJourney({
          userName: savedUserName,
          hasStarted: Boolean(parsed.hasStarted),
          currentIndex: savedCurrentIndex,
          presentationMode: false,
          choices: savedChoices,
        });
      } else if (storedName) {
        setUserName(storedName);
      }
    } catch {
      setUserName(localStorage.getItem(NAME_STORAGE_KEY) ?? "");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const storedJourney: StoredJourney = {
      userName,
      hasStarted,
      currentIndex,
      presentationMode,
      choices,
    };

    localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(storedJourney));
    if (userName) {
      localStorage.setItem(NAME_STORAGE_KEY, userName);
    }
  }, [choices, currentIndex, hasStarted, hydrated, presentationMode, userName]);

  const scores = useMemo(() => calculateScores(choices), [choices]);
  const currentZone = zones[currentIndex];
  const isFinal = hasStarted && currentIndex >= zones.length;
  const verdict = getVerdict(scores.friendScore, scores.threatScore);
  const background = !hasStarted
    ? assets.hero
    : isFinal
      ? assets.finalTemple
      : currentZone?.background ?? assets.hero;

  const byteMessage = useMemo(() => {
    if (!hasStarted) {
      return "";
    }

    if (isFinal) {
      return catMessages.finalTemple(userName || "Explorer");
    }

    if (!currentZone) {
      return catMessages.intro(userName || "Explorer");
    }

    const selectedChoice = choices[currentZone.id];

    if (selectedChoice) {
      return catMessages.choices[currentZone.id][selectedChoice](userName || "Explorer");
    }

    if (currentIndex === 0 && Object.keys(choices).length === 0) {
      return catMessages.intro(userName || "Explorer");
    }

    return catMessages.zoneIntro[currentZone.id](userName || "Explorer");
  }, [choices, currentIndex, currentZone, hasStarted, isFinal, userName]);
  const finalByteMessage = useMemo(
    () => catMessages.final[verdict](userName || "Explorer"),
    [userName, verdict],
  );

  function handleStart(name: string) {
    const safeName = name.trim() || "Explorer";
    setUserName(safeName);
    setHasStarted(true);
    setCurrentIndex(0);
    setChoices({});
    setSavedJourney(null);
  }

  function handleContinueSaved() {
    if (!savedJourney) {
      return;
    }

    setUserName(savedJourney.userName || "Explorer");
    setChoices(savedJourney.choices);
    setCurrentIndex(savedJourney.currentIndex);
    setHasStarted(true);
    setPresentationMode(false);
    setSavedJourney(null);
  }

  function handleChoose(choice: ChoiceKind) {
    if (!currentZone) {
      return;
    }

    setChoices((previousChoices) => ({
      ...previousChoices,
      [currentZone.id]: choice,
    }));
  }

  function handleContinue() {
    setCurrentIndex((index) => Math.min(index + 1, zones.length));
  }

  function handleRestart() {
    setHasStarted(false);
    setCurrentIndex(0);
    setChoices({});
  }

  function handleResetJourney() {
    setUserName("");
    setHasStarted(false);
    setCurrentIndex(0);
    setChoices({});
    setPresentationMode(false);
    setSavedJourney(null);
    localStorage.removeItem(JOURNEY_STORAGE_KEY);
    localStorage.removeItem(NAME_STORAGE_KEY);
  }

  function handleNavigate(target: number) {
    if (target >= zones.length && zones.every((zone) => choices[zone.id])) {
      setCurrentIndex(zones.length);
      return;
    }

    setCurrentIndex(Math.min(Math.max(target, 0), zones.length - 1));
  }

  const continueLabel =
    currentIndex >= zones.length - 1 ? "Enter Final Temple" : `Continue to ${zones[currentIndex + 1]?.areaTitle}`;

  return (
    <main className={`relative min-h-screen overflow-x-hidden ${presentationMode ? "presentation-mode" : ""}`}>
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-30 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div aria-hidden="true" className="fixed inset-0 -z-20 bg-[rgba(5,8,5,0.62)]" />
      <div
        aria-hidden="true"
        className="jungle-depth fixed inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center opacity-45 mix-blend-screen"
        style={{ backgroundImage: `url(${assets.fog})` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.07]"
        style={{ backgroundImage: `url(${assets.noise})` }}
      />
      <PresentationModeToggle
        enabled={presentationMode}
        onToggle={() => setPresentationMode((enabled) => !enabled)}
      />
      <button
        className="quiet-button fixed right-4 top-16 z-40 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] shadow-lg shadow-black/20"
        onClick={handleResetJourney}
        type="button"
      >
        Reset Journey
      </button>

      {!hasStarted ? (
        <Hero
          canContinueSaved={Boolean(savedJourney && Object.keys(savedJourney.choices).length > 0)}
          onContinueSaved={handleContinueSaved}
          onStart={handleStart}
          reduceMotion={presentationMode}
          savedName={userName}
        />
      ) : (
        <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-48 pt-20 lg:px-6">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="trail-chip inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
                Explorer: {userName || "Explorer"}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-bold text-[var(--soft-white)] sm:text-5xl">
                AI Jungle Expedition
              </h1>
            </div>
            <p className="max-w-md text-sm leading-6 text-stone-300">
              Move through each checkpoint. Every choice moves the verdict meter and shapes the ending.
            </p>
          </header>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              {isFinal ? (
                <FinalVerdict
                  byteMessage={finalByteMessage}
                  friendScore={scores.friendScore}
                  name={userName || "Explorer"}
                  onRestart={handleRestart}
                  reduceMotion={presentationMode}
                  responsibilityScore={scores.responsibilityScore}
                  threatScore={scores.threatScore}
                  verdict={verdict}
                />
              ) : currentZone ? (
                <Checkpoint
                  byteAdvice={choices[currentZone.id] ? byteMessage : undefined}
                  continueLabel={continueLabel}
                  onChoose={handleChoose}
                  onContinue={handleContinue}
                  reduceMotion={presentationMode}
                  selectedChoice={choices[currentZone.id]}
                  zone={currentZone}
                  zoneIndex={currentIndex}
                />
              ) : null}
            </div>
            <div className="grid content-start gap-5 lg:sticky lg:top-20 lg:self-start">
              {byteMessage ? (
                <div className="hidden lg:block">
                  <TechnoCat message={byteMessage} mode="dock" reduceMotion={presentationMode} />
                </div>
              ) : null}
              <JourneyMap
                choices={choices}
                currentIndex={currentIndex}
                isFinal={isFinal}
                onNavigate={handleNavigate}
              />
              <AICompass
                friendScore={scores.friendScore}
                responsibilityScore={scores.responsibilityScore}
                threatScore={scores.threatScore}
              />
            </div>
          </div>
        </div>
      )}

      {hasStarted && byteMessage ? (
        <div className="lg:hidden">
          <TechnoCat message={byteMessage} reduceMotion={presentationMode} />
        </div>
      ) : null}
    </main>
  );
}
