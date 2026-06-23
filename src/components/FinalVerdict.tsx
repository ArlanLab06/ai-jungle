"use client";

import { motion } from "framer-motion";
import { getVerdictTitle, jungleLaws, type VerdictKind } from "@/lib/verdict";
import { AICompass } from "./AICompass";

type FinalVerdictProps = {
  name: string;
  verdict: VerdictKind;
  byteMessage: string;
  friendScore: number;
  threatScore: number;
  responsibilityScore: number;
  onRestart: () => void;
  reduceMotion: boolean;
};

export function FinalVerdict({
  name,
  verdict,
  byteMessage,
  friendScore,
  threatScore,
  responsibilityScore,
  onRestart,
  reduceMotion,
}: FinalVerdictProps) {
  return (
    <motion.section
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      className="final-temple-card presentation-panel relative overflow-hidden rounded-lg p-5 shadow-trail sm:p-8"
      initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 24 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-trail-gold/16 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-56 w-44 -translate-x-1/2 bg-gradient-to-b from-trail-gold/20 to-transparent blur-2xl"
      />
      <p className="trail-chip inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
        Final Temple
      </p>
      <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.28em] text-jungle-emerald">
        Final Verdict
      </p>
      <h2 className="relative mt-2 font-heading text-5xl font-bold sm:text-7xl">{getVerdictTitle(verdict)}</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-100">
        {name}, AI becomes a friend when it supports people. AI becomes a threat when it replaces
        human thinking, privacy, honesty, or responsibility.
      </p>
      <div className="final-byte-message mt-6 rounded-lg p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-jungle-emerald">
          Byte&apos;s final message
        </p>
        <p className="mt-2 leading-7 text-stone-100">{byteMessage}</p>
      </div>
      <div className="mt-7">
        <AICompass
          friendScore={friendScore}
          responsibilityScore={responsibilityScore}
          threatScore={threatScore}
          variant="final"
        />
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-trail-soft">5 Laws of the AI Jungle</h3>
        <ol className="mt-4 grid gap-3">
          {jungleLaws.map((law, index) => (
            <li className="law-card rounded-lg p-4" key={law}>
              <span className="mr-2 font-heading text-2xl font-bold text-trail-gold">{index + 1}.</span>
              <span>{law}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button className="jungle-button rounded-lg px-5 py-3" onClick={onRestart} type="button">
          Restart Journey
        </button>
        <div className="rounded-lg border border-trail-gold/45 bg-trail-gold/12 px-5 py-3 font-bold text-trail-soft">
          Badge: AI Jungle Explorer
        </div>
      </div>
    </motion.section>
  );
}
