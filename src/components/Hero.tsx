"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { catMessages } from "@/data/catMessages";
import { siteContent } from "@/data/siteContent";
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
  const byteMessage = previewName ? catMessages.intro(previewName) : catMessages.heroPrompt();

  useEffect(() => {
    setDraftName(savedName);
  }, [savedName]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onStart(previewName || siteContent.names.fallback);
  }

  return (
    <section className="hero-scene relative flex min-h-screen items-center overflow-hidden px-5 py-14 sm:py-16 lg:py-14">
      <div aria-hidden="true" className="hero-background absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 hero-vignette" />
      <motion.div
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="hero-content relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(320px,0.78fr)_minmax(380px,0.84fr)] lg:gap-[10vw]"
        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="hero-copy max-w-[42rem]">
          <p className="trail-chip mb-5 inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
            {siteContent.hero.eyebrow}
          </p>
          <h1 className="hero-title max-w-4xl font-heading text-6xl font-bold leading-[0.95] text-[var(--soft-white)] sm:text-7xl lg:text-[6.25rem]">
            {siteContent.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-100 sm:text-xl sm:leading-8">
            {siteContent.hero.subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300">
            {siteContent.hero.description}
          </p>
          <div className="hero-name-panel mt-7 max-w-xl">
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-bold uppercase text-trail-gold" htmlFor="explorer-name">
                {siteContent.nameForm.label}
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                <input
                  autoComplete="name"
                  className="hero-name-input min-h-12 rounded-lg px-4 text-base text-[var(--soft-white)] placeholder:text-stone-400"
                  id="explorer-name"
                  onChange={(event) => setDraftName(event.target.value)}
                  placeholder={siteContent.nameForm.placeholder}
                  value={draftName}
                />
                <button className="jungle-button hero-start-button min-h-12 rounded-lg px-6" type="submit">
                  {siteContent.nameForm.start}
                </button>
                {canContinueSaved ? (
                  <button
                    className="quiet-button min-h-12 rounded-lg px-6 font-bold sm:col-span-2"
                    onClick={onContinueSaved}
                    type="button"
                  >
                    {siteContent.nameForm.continue}
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
        <div className="hero-byte-stage relative flex justify-center lg:justify-end">
          <TechnoCat message={byteMessage} mode="inline" reduceMotion={reduceMotion} />
        </div>
      </motion.div>
    </section>
  );
}
