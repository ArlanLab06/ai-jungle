"use client";

import { FormEvent, useEffect, useState } from "react";

type NameIntroProps = {
  initialName: string;
  onStart: (name: string) => void;
  onContinueSaved?: () => void;
  canContinueSaved?: boolean;
  onNamePreview?: (name: string) => void;
};

export function NameIntro({
  initialName,
  onStart,
  onContinueSaved,
  canContinueSaved = false,
  onNamePreview,
}: NameIntroProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
    onNamePreview?.(initialName);
  }, [initialName, onNamePreview]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onStart(name.trim() || "Explorer");
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <label className="block text-sm font-bold uppercase text-trail-gold" htmlFor="explorer-name">
        What is your name, explorer?
      </label>
      <div className="mt-3 grid gap-3">
        <input
          autoComplete="name"
          className="min-h-12 rounded-lg border border-[var(--border-soft)] bg-black/40 px-4 text-base text-[var(--soft-white)] shadow-inner shadow-black/30 placeholder:text-stone-400"
          id="explorer-name"
          onChange={(event) => {
            setName(event.target.value);
            onNamePreview?.(event.target.value);
          }}
          placeholder="Enter your name..."
          value={name}
        />
        <button className="jungle-button min-h-12 rounded-lg px-6" type="submit">
          Start the Journey
        </button>
        {canContinueSaved && onContinueSaved ? (
          <button className="quiet-button min-h-12 rounded-lg px-6 font-bold" onClick={onContinueSaved} type="button">
            Continue Last Route
          </button>
        ) : null}
      </div>
    </form>
  );
}
