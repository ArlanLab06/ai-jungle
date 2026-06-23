"use client";

import { AnimatePresence, motion } from "framer-motion";

type TechnoCatProps = {
  message: string;
  reduceMotion: boolean;
  mode?: "fixed" | "inline" | "dock";
};

export function TechnoCat({ message, reduceMotion, mode = "fixed" }: TechnoCatProps) {
  const fixed = mode === "fixed";
  const docked = mode === "dock";

  return (
    <motion.aside
      animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
      className={`z-50 flex max-w-[min(94vw,520px)] items-end gap-3 ${docked ? "byte-dock" : ""} ${
        fixed
          ? "fixed bottom-5 left-3 sm:bottom-8 sm:left-6 lg:bottom-10 lg:left-auto lg:right-[360px]"
          : docked
            ? "relative flex-col-reverse items-center"
            : "relative"
      }`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      transition={
        reduceMotion
          ? undefined
          : { opacity: { duration: 0.25 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          className="byte-bubble glass-panel presentation-panel relative rounded-lg p-4 text-sm leading-6 text-stone-100 shadow-emerald"
          exit={reduceMotion ? undefined : { opacity: 0, x: 8 }}
          initial={reduceMotion ? undefined : { opacity: 0, x: 8 }}
          key={message}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <span
            aria-hidden="true"
            className={`byte-bubble-arrow absolute -right-2 bottom-7 h-4 w-4 rotate-45 border-r border-t border-[var(--border-soft)] bg-[rgba(8,14,10,0.84)] ${
              docked ? "hidden" : ""
            }`}
          />
          <p className="font-bold text-trail-gold">Byte</p>
          <p>{message}</p>
        </motion.div>
      </AnimatePresence>
      <div aria-label="Byte, the floating techno-cat guide" className="byte-shell" role="img">
        <div className="byte-aura" />
        <div className="byte-tail" />
        <div className="byte-ear byte-ear-left" />
        <div className="byte-ear byte-ear-right" />
        <div className="byte-head" />
        <div className="byte-eye byte-eye-left" />
        <div className="byte-eye byte-eye-right" />
        <div className="byte-nose" />
        <div className="byte-body" />
        <div className="byte-circuit" />
        <div className="byte-paw byte-paw-left" />
        <div className="byte-paw byte-paw-right" />
      </div>
    </motion.aside>
  );
}
