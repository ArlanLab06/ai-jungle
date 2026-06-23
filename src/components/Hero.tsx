"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NameIntro } from "./NameIntro";
import { TechnoCat } from "./TechnoCat";

type HeroProps = {
  savedName: string;
  onStart: (name: string) => void;
  onContinueSaved: () => void;
  canContinueSaved: boolean;
  reduceMotion: boolean;
};

export function Hero({
  savedName,
  onStart,
  onContinueSaved,
  canContinueSaved,
  reduceMotion,
}: HeroProps) {
  const [draftName, setDraftName] = useState(savedName);
  const previewName = draftName.trim();
  const byteMessage = previewName
    ? `Welcome, ${previewName}. I'm Byte, your techno-cat guide.`
    : "I'm Byte, your guide. Enter your name, and I will open the trail.";

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-20 sm:py-24">
      <div aria-hidden="true" className="absolute inset-0 hero-vignette" />
      <div
        aria-hidden="true"
        className="trail-path absolute bottom-0 left-1/2 h-1/2 w-[38rem] max-w-[86vw] -translate-x-1/2 skew-x-[-10deg] opacity-85"
      />
      <div aria-hidden="true" className="canopy-shadow absolute inset-x-0 top-0 h-48" />
      <motion.div
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="relative mx-auto grid w-full max-w-6xl items-end gap-8 lg:grid-cols-[minmax(0,1fr)_410px]"
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div>
          <p className="trail-chip mb-5 inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
            Artificial Intelligence: Friend or Threat?
          </p>
          <h1 className="max-w-4xl font-heading text-6xl font-bold leading-[0.95] text-[var(--soft-white)] sm:text-8xl">
            Into the AI Jungle
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-100 sm:text-2xl sm:leading-9">
            A digital journey through the opportunities and risks of artificial intelligence.
          </p>
          <div className="mt-8 flex max-w-xl gap-3 text-sm text-stone-300">
            <span className="h-px flex-1 translate-y-3 bg-trail-gold/40" />
            <span>Follow the warm trail. Choose with responsibility.</span>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300">
            Travel through four checkpoints. Make choices. Discover when AI becomes a friend or a threat.
          </p>
        </div>
        <div className="grid gap-5">
          <div className="hidden sm:block">
            <TechnoCat message={byteMessage} mode="inline" reduceMotion={reduceMotion} />
          </div>
          <div className="expedition-card hero-name-card rounded-lg p-5 shadow-trail sm:p-6">
            <p className="text-sm font-bold uppercase text-jungle-emerald">Name Gate</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-trail-soft">Begin the expedition</h2>
            <p className="mt-3 leading-7 text-stone-200">
              Byte will guide you through four places where AI can help people or create risks.
            </p>
            <NameIntro
              canContinueSaved={canContinueSaved}
              initialName={savedName}
              onContinueSaved={onContinueSaved}
              onNamePreview={setDraftName}
              onStart={onStart}
            />
          </div>
        </div>
      </motion.div>
      <div className="sm:hidden">
        <TechnoCat message={byteMessage} mode="fixed" reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}
