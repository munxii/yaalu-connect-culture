import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/AppShell";
import { MY_TEAM } from "@/lib/seed";

export const Route = createFileRoute("/match")({ component: Match });

function Match() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-5 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-mint/30 text-secondary text-xs font-bold"><Sparkles className="h-3 w-3" /> MATCH SCORE 92%</div>
          <h1 className="mt-4 text-3xl md:text-4xl font-black text-secondary">🎉 우리팀이 결정됐어요!</h1>
          <p className="mt-2 text-sm text-muted-foreground">관심사·가용 시간대·국적 균형이 맞아요</p>
        </motion.div>

        <div className="mt-10 relative">
          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md md:max-w-xl mx-auto">
            {MY_TEAM.map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.15, type: "spring" }}
                className="rounded-3xl bg-card border-2 p-4 md:p-5 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt={u.name} className="h-14 w-14 rounded-2xl bg-muted" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-secondary truncate">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.flag} {u.nationality}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">{u.major} · {u.year}학년</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {u.interests.map(i => <span key={i} className="px-2 py-0.5 rounded-full bg-muted text-[10px]">{i}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full gradient-sunset flex items-center justify-center text-white font-black shadow-pop hidden md:flex">Y</motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 rounded-2xl bg-secondary/5 border border-secondary/10 p-4 text-sm text-secondary">
          <strong>매칭 근거:</strong> 🎬 영화 · 🍜 음식 · 🎤 K-pop 관심사 일치
        </motion.div>

        <Link to="/quests" className="block mt-8">
          <Button size="lg" className="w-full h-13 rounded-full text-base shadow-pop">퀘스트 골라서 만나러 가기 <ArrowRight className="ml-1 h-4 w-4" /></Button>
        </Link>
      </div>
    </AppShell>
  );
}
