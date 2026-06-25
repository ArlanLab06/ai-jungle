"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { jungleLaws, siteContent } from "@/data/siteContent";
import type { VerdictKind } from "@/lib/verdict";
import { AIVerdictMeter } from "./AIVerdictMeter";
import { TechnoCat } from "./TechnoCat";

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
  const [badgeOpen, setBadgeOpen] = useState(false);
  const verdictTitle = siteContent.final.titles[verdict];

  return (
    <>
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
        <div className="final-reveal-panel rounded-lg p-5 sm:p-7">
          <p className="trail-chip inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
            {siteContent.final.temple}
          </p>
          <p className="relative mt-6 text-xs font-bold uppercase tracking-[0.28em] text-jungle-emerald">
            {siteContent.final.heading}
          </p>
          <h2 className="relative mt-2 font-heading text-5xl font-bold sm:text-7xl">
            {siteContent.final.titles[verdict]}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-100">
            {siteContent.final.summary(name)}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button className="jungle-button rounded-lg px-5 py-3" onClick={onRestart} type="button">
              {siteContent.final.restart}
            </button>
            <button
              className="final-badge rounded-lg px-5 py-3 text-left font-bold text-trail-soft transition hover:border-trail-gold/60"
              onClick={() => setBadgeOpen(true)}
              type="button"
            >
              {siteContent.final.badge}
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.8fr)]">
          <div className="grid content-start gap-5">
            <div className="final-byte-message rounded-lg p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-jungle-emerald">
                {siteContent.final.byteTitle}
              </p>
              <div className="mt-3">
                <TechnoCat message={byteMessage} mode="final" reduceMotion={reduceMotion} />
              </div>
            </div>
            <div>
              <AIVerdictMeter
                friendScore={friendScore}
                responsibilityScore={responsibilityScore}
                threatScore={threatScore}
                variant="final"
              />
            </div>
          </div>
          <div className="final-laws-panel rounded-lg p-5">
            <h3 className="text-2xl font-bold text-trail-soft">{siteContent.final.lawsTitle}</h3>
            <ol className="mt-4 grid gap-3">
              {jungleLaws.map((law, index) => (
                <li className="law-card rounded-lg p-4" key={law}>
                  <span className="law-number font-heading text-2xl font-bold text-trail-gold">{index + 1}</span>
                  <span>{law}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.section>
      <AnimatePresence>
        {badgeOpen ? (
          <motion.div
            animate={reduceMotion ? undefined : { opacity: 1 }}
            className="badge-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center px-4"
            exit={reduceMotion ? undefined : { opacity: 0 }}
            initial={reduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setBadgeOpen(false)}
          >
            <motion.div
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              aria-labelledby="badge-modal-title"
              aria-modal="true"
              className="badge-modal-card w-full max-w-md rounded-lg p-6"
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 12 }}
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 12 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <p className="trail-chip inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
                {siteContent.final.badge}
              </p>
              <h3 className="mt-4 font-heading text-4xl font-bold text-trail-soft" id="badge-modal-title">
                {siteContent.final.badgeModal.title}
              </h3>
              <dl className="mt-5 grid gap-3">
                <BadgeDetail label={siteContent.final.badgeModal.explorer} value={name} />
                <BadgeDetail label={siteContent.final.badgeModal.verdict} value={verdictTitle} />
                <BadgeDetail
                  label={siteContent.final.badgeModal.responsibility}
                  value={`${responsibilityScore}`}
                />
              </dl>
              <p className="mt-5 rounded-lg border border-jungle-emerald/25 bg-jungle-emerald/10 p-4 leading-7 text-stone-100">
                {siteContent.final.badgeModal.message}
              </p>
              <button
                className="jungle-button mt-5 w-full rounded-lg px-5 py-3"
                onClick={() => setBadgeOpen(false)}
                type="button"
              >
                {siteContent.final.badgeModal.close}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function BadgeDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="badge-modal-detail rounded-lg p-3">
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-trail-gold">{label}</dt>
      <dd className="mt-1 text-lg font-bold text-stone-100">{value}</dd>
    </div>
  );
}
