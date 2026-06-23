import type { ChoiceKind, ZoneId } from "./zones";

type CatMessage = (name: string) => string;
type ZoneMessages = Record<ZoneId, Record<ChoiceKind, CatMessage>>;

export const catMessages = {
  intro: (name: string) =>
    `Welcome, ${name}. I'm Byte, your techno-cat guide.`,
  zoneIntro: {
    education: (name: string) =>
      `${name}, AI can help learning, but it should not replace your thinking.`,
    healthcare: (name: string) =>
      `${name}, this camp is serious. AI can help doctors, but people must stay in control.`,
    business: (name: string) =>
      `${name}, AI can save time, but workers and privacy still matter.`,
    dailyLife: (name: string) =>
      `${name}, smart tools are useful, but you still need smart choices.`,
  } satisfies Record<ZoneId, CatMessage>,
  choices: {
    education: {
      responsible: (name: string) =>
        `Good choice, ${name}. AI helps most when you stay honest and do the thinking.`,
      dangerous: (name: string) =>
        `Careful, ${name}. This path replaces your learning instead of supporting it.`,
    },
    healthcare: {
      responsible: (name: string) =>
        `Good decision, ${name}. AI can support doctors, but humans must decide.`,
      dangerous: (name: string) =>
        `Warning, ${name}. Medical choices are too serious for AI alone.`,
    },
    business: {
      responsible: (name: string) =>
        `Responsible choice, ${name}. AI can save time while people learn new skills.`,
      dangerous: (name: string) =>
        `Risk detected, ${name}. Replacing people without support can make AI a threat.`,
    },
    dailyLife: {
      responsible: (name: string) =>
        `Nice, ${name}. Checking information keeps you safe.`,
      dangerous: (name: string) =>
        `Be careful, ${name}. Not every smart answer is true.`,
    },
  } satisfies ZoneMessages,
  finalTemple: (name: string) => `You reached the Final Temple, ${name}. Your choices shaped the verdict.`,
  final: {
    both: (name: string) =>
      `You survived the AI Jungle, ${name}. AI is not the monster. The danger is using it without responsibility.`,
    friend: (name: string) =>
      `You found the responsible path, ${name}. AI becomes a friend when people stay honest and in control.`,
    threat: (name: string) =>
      `The jungle warned you, ${name}. AI becomes a threat when people use it without responsibility.`,
  },
};
