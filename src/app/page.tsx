"use client";

import { useEffect, useMemo, useState } from "react";
import { AIVerdictMeter } from "@/components/AIVerdictMeter";
import { Checkpoint } from "@/components/Checkpoint";
import { FinalVerdict } from "@/components/FinalVerdict";
import { Hero } from "@/components/Hero";
import { JourneyMap } from "@/components/JourneyMap";
import { JourneyCompleteCard } from "@/components/JourneyCompleteCard";
import { TechnoCat } from "@/components/TechnoCat";
import { assets, zoneBackgrounds } from "@/data/assets";
import { catMessages } from "@/data/catMessages";
import { siteContent } from "@/data/siteContent";
import type { ChoiceKind, ZoneId } from "@/data/zones";
import { zones } from "@/data/zones";
import { calculateScores, getVerdict } from "@/lib/verdict";

const JOURNEY_STORAGE_KEY = "ai-jungle-journey";
const NAME_STORAGE_KEY = "ai-jungle-user-name";
const ZONE_SCENE_CLASSES: Record<ZoneId, string> = {
  education: "zone-scene-education",
  healthcare: "zone-scene-healthcare",
  business: "zone-scene-business",
  dailyLife: "zone-scene-daily-life",
};

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
  const fallbackName = siteContent.names.fallback;
  const [hydrated, setHydrated] = useState(false);
  const [userName, setUserName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices] = useState<Partial<Record<ZoneId, ChoiceKind>>>({});
  const [presentationMode, setPresentationMode] = useState(false);
  const [savedJourney, setSavedJourney] = useState<StoredJourney | null>(null);
  const [loadedSceneBackground, setLoadedSceneBackground] = useState("");

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
  const requestedBackground = !hasStarted
    ? assets.hero
    : isFinal
      ? assets.finalTemple
      : currentZone
        ? zoneBackgrounds[currentZone.id]
        : assets.hero;
  const activeSceneBackground = loadedSceneBackground === requestedBackground ? loadedSceneBackground : "";
  const zoneSceneActive = Boolean(hasStarted && !isFinal && currentZone && activeSceneBackground);
  const finalSceneActive = Boolean(hasStarted && isFinal && activeSceneBackground);
  const zoneSceneClass = zoneSceneActive && currentZone ? ZONE_SCENE_CLASSES[currentZone.id] : "";

  useEffect(() => {
    if (!requestedBackground) {
      setLoadedSceneBackground("");
      return;
    }

    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (!cancelled) {
        setLoadedSceneBackground(requestedBackground);
      }
    };

    image.onerror = () => {
      if (!cancelled) {
        setLoadedSceneBackground("");
      }
    };

    image.src = requestedBackground;

    return () => {
      cancelled = true;
    };
  }, [requestedBackground]);

  const byteMessage = useMemo(() => {
    if (!hasStarted) {
      return "";
    }

    if (isFinal) {
      return catMessages.finalTemple(userName || fallbackName);
    }

    if (!currentZone) {
      return catMessages.intro(userName || fallbackName);
    }

    const selectedChoice = choices[currentZone.id];

    if (selectedChoice) {
      return catMessages.choices[currentZone.id][selectedChoice](userName || fallbackName);
    }

    if (currentIndex === 0 && Object.keys(choices).length === 0) {
      return catMessages.intro(userName || fallbackName);
    }

    return catMessages.zoneIntro[currentZone.id](userName || fallbackName);
  }, [choices, currentIndex, currentZone, fallbackName, hasStarted, isFinal, userName]);
  const finalByteMessage = useMemo(
    () => catMessages.final[verdict](userName || fallbackName),
    [fallbackName, userName, verdict],
  );

  function handleStart(name: string) {
    const safeName = name.trim() || fallbackName;
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

    setUserName(savedJourney.userName || fallbackName);
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
    currentIndex >= zones.length - 1
      ? siteContent.journey.enterFinalTemple
      : siteContent.journey.continueTo(zones[currentIndex + 1]?.areaTitle ?? "");

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden ${presentationMode ? "presentation-mode" : ""} ${
        zoneSceneActive ? `zone-scene-active ${zoneSceneClass}` : ""
      } ${finalSceneActive ? "final-scene-active" : ""}`}
    >
      <div
        aria-hidden="true"
        className="scene-background fixed inset-0 -z-30 bg-cover bg-center transition-all duration-500"
        style={activeSceneBackground ? { backgroundImage: `url(${activeSceneBackground})` } : undefined}
      />
      <div aria-hidden="true" className="scene-scrim fixed inset-0 -z-20 bg-[rgba(5,8,5,0.62)]" />
      <div
        aria-hidden="true"
        className="jungle-depth fixed inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="scene-fog pointer-events-none fixed inset-0 -z-10 bg-cover bg-center opacity-45 mix-blend-screen"
        style={{ backgroundImage: `url(${assets.fog})` }}
      />
      <div
        aria-hidden="true"
        className="scene-noise pointer-events-none fixed inset-0 -z-10 opacity-[0.07]"
        style={{ backgroundImage: `url(${assets.noise})` }}
      />
      <button
        aria-pressed={presentationMode}
        className="quiet-button fixed right-4 top-4 z-40 rounded-full px-4 py-2 text-sm font-bold shadow-lg shadow-black/20"
        onClick={() => setPresentationMode((enabled) => !enabled)}
        type="button"
      >
        {presentationMode ? siteContent.controls.exitProjectorMode : siteContent.controls.projectorMode}
      </button>
      <button
        className="quiet-button fixed right-4 top-16 z-40 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] shadow-lg shadow-black/20"
        onClick={handleResetJourney}
        type="button"
      >
        {siteContent.controls.resetJourney}
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
        <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-20 pt-20 lg:px-6 lg:pb-48">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="trail-chip inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
                {siteContent.journey.explorerLabel(userName || fallbackName)}
              </p>
              <h1 className="mt-3 font-heading text-4xl font-bold text-[var(--soft-white)] sm:text-5xl">
                {siteContent.journey.title}
              </h1>
            </div>
            <p className="max-w-md text-sm leading-6 text-stone-300">
              {siteContent.journey.description}
            </p>
          </header>
          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              {isFinal ? (
                <FinalVerdict
                  byteMessage={finalByteMessage}
                  friendScore={scores.friendScore}
                  name={userName || fallbackName}
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
                  sceneActive={zoneSceneActive}
                  selectedChoice={choices[currentZone.id]}
                  zone={currentZone}
                  zoneIndex={currentIndex}
                />
              ) : null}
            </div>
            <div className="grid min-w-0 content-start gap-5 lg:sticky lg:top-20 lg:self-start">
              {!isFinal && byteMessage ? (
                <div className="byte-sidebar-slot">
                  <TechnoCat message={byteMessage} mode="dock" reduceMotion={presentationMode} />
                </div>
              ) : null}
              <JourneyMap
                choices={choices}
                currentIndex={currentIndex}
                isFinal={isFinal}
                onNavigate={handleNavigate}
              />
              {isFinal ? (
                <JourneyCompleteCard />
              ) : (
                <AIVerdictMeter
                  friendScore={scores.friendScore}
                  responsibilityScore={scores.responsibilityScore}
                  threatScore={scores.threatScore}
                />
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
