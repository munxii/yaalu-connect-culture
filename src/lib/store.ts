import { useEffect, useState } from "react";

type Listener = () => void;
const listeners = new Set<Listener>();

type Lang = "ko" | "en";
type State = {
  lang: Lang;
  demoMode: boolean;
  teamPoints: number;
  completedQuests: string[];
};

const state: State = {
  lang: "ko",
  demoMode: true,
  teamPoints: 250,
  completedQuests: ["q6", "q9"],
};

export const store = {
  get: () => state,
  set: (patch: Partial<State>) => {
    Object.assign(state, patch);
    listeners.forEach((l) => l());
  },
  addPoints: (n: number, questId?: string) => {
    state.teamPoints += n;
    if (questId && !state.completedQuests.includes(questId)) state.completedQuests.push(questId);
    listeners.forEach((l) => l());
  },
};

export function useStore<T>(selector: (s: State) => T): T {
  const [, setT] = useState(0);
  useEffect(() => {
    const l = () => setT((x) => x + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);
  return selector(state);
}

const dict = {
  ko: {
    home: "홈", quests: "퀘스트", chat: "채팅", rewards: "리워드", profile: "마이",
    startMatching: "지금 매칭 시작하기",
  },
  en: {
    home: "Home", quests: "Quests", chat: "Chat", rewards: "Rewards", profile: "Me",
    startMatching: "Start Matching",
  },
} as const;

export function t(key: keyof typeof dict.ko): string {
  return (dict[state.lang] as any)[key] ?? key;
}
