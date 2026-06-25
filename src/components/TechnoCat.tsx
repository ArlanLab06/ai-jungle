"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { assets } from "@/data/assets";

type TechnoCatProps = {
  message: string;
  reduceMotion: boolean;
  mode?: "fixed" | "inline" | "dock" | "final";
};

export function TechnoCat({ message, reduceMotion, mode = "fixed" }: TechnoCatProps) {
  const fixed = mode === "fixed";
  const docked = mode === "dock";
  const final = mode === "final";
  const modeClass = fixed ? "byte-fixed" : docked ? "byte-dock" : final ? "byte-final" : "byte-inline";
  const imageSizes =
    mode === "inline"
      ? "(max-width: 640px) 120px, (max-width: 1024px) 180px, 280px"
      : mode === "final"
        ? "(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
        : "(max-width: 640px) 112px, (max-width: 1024px) 130px, 150px";
  const [imageSrc, setImageSrc] = useState<string>(assets.byteCat);
  const [showImage, setShowImage] = useState(true);

  function handleImageError() {
    if (imageSrc !== assets.byteCatFallback) {
      setImageSrc(assets.byteCatFallback);
      return;
    }

    setShowImage(false);
  }

  return (
    <motion.aside
      animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
      className={`byte-guide z-50 ${modeClass}`}
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
            className="byte-bubble-arrow absolute h-4 w-4 rotate-45 border-r border-t border-[var(--border-soft)] bg-[rgba(8,14,10,0.84)]"
          />
          <p className="font-bold text-trail-gold">Byte</p>
          <p>{message}</p>
        </motion.div>
      </AnimatePresence>
      <div aria-label="Byte, the floating techno-cat guide" className="byte-shell" role="img">
        <div className="byte-aura" />
        {showImage ? (
          <Image
            alt=""
            aria-hidden="true"
            className="byte-cat-image"
            draggable={false}
            height={220}
            onError={handleImageError}
            sizes={imageSizes}
            src={imageSrc}
            width={220}
          />
        ) : (
          <span aria-hidden="true" className="byte-cat-fallback" />
        )}
      </div>
    </motion.aside>
  );
}
