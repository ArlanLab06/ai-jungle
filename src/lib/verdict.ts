import type { ChoiceKind, ZoneId } from "@/data/zones";

export type VerdictKind = "friend" | "threat" | "both";

export type ScoreState = {
  friendScore: number;
  threatScore: number;
  responsibilityScore: number;
  choices: Partial<Record<ZoneId, ChoiceKind>>;
};

export const initialScoreState: ScoreState = {
  friendScore: 0,
  threatScore: 0,
  responsibilityScore: 0,
  choices: {},
};

export function clampScore(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function calculateScores(
  choices: Partial<Record<ZoneId, ChoiceKind>>,
): Omit<ScoreState, "choices"> {
  return Object.values(choices).reduce(
    (scores, choice) => {
      if (choice === "responsible") {
        return {
          friendScore: scores.friendScore + 20,
          threatScore: scores.threatScore,
          responsibilityScore: clampScore(scores.responsibilityScore + 20),
        };
      }

      if (choice === "dangerous") {
        return {
          friendScore: scores.friendScore,
          threatScore: scores.threatScore + 20,
          responsibilityScore: clampScore(scores.responsibilityScore - 5),
        };
      }

      return scores;
    },
    {
      friendScore: 0,
      threatScore: 0,
      responsibilityScore: 0,
    },
  );
}

export function getVerdict(friendScore: number, threatScore: number): VerdictKind {
  if (friendScore >= threatScore + 30) {
    return "friend";
  }

  if (threatScore >= friendScore + 30) {
    return "threat";
  }

  return "both";
}

export function getVerdictTitle(verdict: VerdictKind) {
  if (verdict === "friend") {
    return "AI is a friend";
  }

  if (verdict === "threat") {
    return "AI is a threat";
  }

  return "AI is both";
}

export const jungleLaws = [
  "Use AI as a tool, not as a replacement for thinking.",
  "Check information before you trust it.",
  "Protect personal data.",
  "Keep humans in control of serious decisions.",
  "Use AI with honesty and responsibility.",
];
