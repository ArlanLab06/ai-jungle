import type { VerdictKind } from "@/lib/verdict";

export const siteContent = {
  metadata: {
    title: "Into the AI Jungle",
    description: "An interactive journey about artificial intelligence as a friend or a threat.",
  },
  names: {
    fallback: "Explorer",
  },
  controls: {
    resetJourney: "Reset Journey",
    projectorMode: "Projector Mode",
    exitProjectorMode: "Exit Projector Mode",
  },
  hero: {
    eyebrow: "Artificial Intelligence: Friend or Threat?",
    title: "Into the AI Jungle",
    subtitle: "A digital journey through the opportunities and risks of artificial intelligence.",
    trailLine: "Follow the warm trail. Choose with responsibility.",
    description: "Travel through four checkpoints. Make choices. Discover when AI becomes a friend or a threat.",
    gateLabel: "Name Gate",
    gateTitle: "Begin the expedition",
    gateDescription: "Byte will guide you through four places where AI can help people or create risks.",
  },
  nameForm: {
    label: "What is your name, explorer?",
    placeholder: "Enter your name...",
    start: "Start the Journey",
    continue: "Continue Last Route",
  },
  journey: {
    title: "AI Jungle Expedition",
    description: "Move through each checkpoint. Every choice moves the verdict meter and shapes the ending.",
    explorerLabel: (name: string) => `Explorer: ${name}`,
    continueTo: (zoneTitle: string) => `Continue to ${zoneTitle}`,
    enterFinalTemple: "Enter Final Temple",
  },
  checkpoint: {
    chapter: (chapterNumber: string) => `Chapter ${chapterNumber}`,
    location: (zoneNumber: number, placeName: string) => `Checkpoint ${zoneNumber} / ${placeName}`,
    guide: "The path splits here. Read the signs, then choose how AI should be used.",
    labels: {
      problem: "Problem Statement",
      opportunity: "Opportunity",
      risk: "Risk",
      situation: "Situation",
      audienceMoment: "Audience Moment",
      audienceSubtitle: "Which path should we choose?",
      choosePath: "Choose your path",
      checkpointLesson: "Checkpoint Lesson",
      consequence: "Consequence",
      whyItMatters: "Why it matters",
      humanControl: "Human Control Rule",
      byteAdvice: "Byte's Advice",
    },
  },
  choices: {
    safeTitle: "Safe Trail",
    riskyTitle: "Risky Shortcut",
    safeBadge: "WISE",
    riskyBadge: "RISK",
    safeSummary: "Safe trail with human control",
    riskySummary: "Risky shortcut without checks",
  },
  map: {
    title: "Trail Map",
    description: "A route through the AI Jungle.",
    progress: (completed: number, total: number) => `${completed}/${total}`,
    ariaLabel: "Journey checkpoints",
    entrance: {
      label: "Entrance",
      place: "Name Gate",
    },
    final: {
      label: "Final Temple",
      place: "Verdict",
    },
    lockedPath: "Locked path",
  },
  meter: {
    title: "AI Verdict Meter",
    description: "Every choice moves the verdict.",
    states: {
      friend: "Friend path",
      threat: "Threat path",
      balanced: "Balanced path",
    },
    axis: {
      friend: "Friend",
      center: "Center",
      threat: "Threat",
    },
    captions: {
      friend: "Supports people",
      center: "Needs human judgment",
      threat: "Creates risk",
    },
    responsibility: "Responsibility Level",
    chips: {
      friend: "Friend",
      threat: "Threat",
      responsibility: "Responsibility",
    },
  },
  final: {
    temple: "Final Temple",
    heading: "Final Verdict",
    titles: {
      friend: "AI is a friend",
      threat: "AI is a threat",
      both: "AI is both",
    } satisfies Record<VerdictKind, string>,
    summary: (name: string) =>
      `${name}, AI becomes a friend when it supports people. AI becomes a threat when it replaces human thinking, privacy, honesty, or responsibility.`,
    byteTitle: "Byte's final message",
    lawsTitle: "5 Laws of the AI Jungle",
    restart: "Restart Journey",
    badge: "Badge: AI Jungle Explorer",
    badgeModal: {
      title: "AI Jungle Explorer",
      explorer: "Explorer",
      verdict: "Final Verdict",
      responsibility: "Responsibility Score",
      message: "Use AI responsibly and honestly.",
      close: "Close",
    },
    journeyComplete: {
      title: "Journey Complete",
      text: "Your choices shaped the final verdict.",
      statValue: "4/4",
      statLabel: "checkpoints completed",
    },
  },
};

export const jungleLaws = [
  "Use AI as a tool, not as a replacement for thinking.",
  "Check information before you trust it.",
  "Protect personal data.",
  "Keep humans in control of serious decisions.",
  "Use AI with honesty and responsibility.",
];
