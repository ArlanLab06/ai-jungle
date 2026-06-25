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

const SCORE_PER_ZONE = 25;

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
          friendScore: clampScore(scores.friendScore + SCORE_PER_ZONE),
          threatScore: scores.threatScore,
          responsibilityScore: clampScore(scores.responsibilityScore + SCORE_PER_ZONE),
        };
      }

      if (choice === "dangerous") {
        return {
          friendScore: scores.friendScore,
          threatScore: clampScore(scores.threatScore + SCORE_PER_ZONE),
          responsibilityScore: scores.responsibilityScore,
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
