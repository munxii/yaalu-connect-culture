import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MY_TEAM } from "@/lib/seed";
import { store } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/quest/review/$id")({ component: Review });

const TAGS = ["친절함", "유머", "지식", "리더십", "센스", "성실"];

function Review() {
  const nav = useNavigate();
  const others = MY_TEAM.filter(u => u.id !== "me");
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const submit = () => {
    setSubmitted(true);
    store.addPoints(200, "q2");
    setTimeout(() => {
      toast.success("+200P 획득! 🎉");
      nav({ to: "/rewards" });
    }, 1800);
  };

  if (submitted) {
    return (
      <AppShell>
        <div className="min-h-[70vh] flex items-center justify-center px-5">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="text-center">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: 2, duration: 0.5 }} className="text-7xl">🎉</motion.div>
            <h1 className="mt-6 text-3xl font-black text-secondary">+200P!</h1>
            <p className="mt-2 text-muted-foreground">우리팀 누적 점수가 올랐어요</p>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-5 py-6 space-y-4">
        <div>
          <span className="text-xs font-bold text-primary tracking-widest"><Sparkles className="inline h-3 w-3" /> 사후 교차 리뷰</span>
          <h1 className="mt-1 text-2xl font-black text-secondary">오늘의 우리팀, 어땠어?</h1>
          <p className="text-sm text-muted-foreground">3명 모두에게 별점·태그·배운 점을 남겨주세요</p>
        </div>

        {others.map(u => (
          <Card key={u.id} className="rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <img src={u.avatar} alt={u.name} className="h-12 w-12 rounded-2xl bg-muted" />
              <div>
                <div className="font-bold text-secondary">{u.name} <span className="text-xs font-normal text-muted-foreground">{u.flag}</span></div>
                <div className="text-xs text-muted-foreground">{u.major}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setRatings(r => ({...r, [u.id]: n}))}>
                  <Star className={`h-7 w-7 transition ${(ratings[u.id]??0) >= n ? "fill-warning text-warning" : "text-muted"}`} />
                </button>
              ))}
            </div>
            <div className="mt-3">
              <div className="text-xs text-muted-foreground mb-1.5">한 단어 태그</div>
              <div className="flex flex-wrap gap-1.5">
                {TAGS.map(t => <button key={t} className="px-3 py-1 rounded-full bg-muted text-xs hover:bg-primary hover:text-primary-foreground transition">{t}</button>)}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xs text-muted-foreground mb-1.5">오늘 {u.name}이(가) 알려준 것 1가지</div>
              <Input placeholder="예: 베트남식 인사 표현" className="rounded-xl" />
            </div>
          </Card>
        ))}

        <Button size="lg" className="w-full rounded-full h-13 shadow-pop" onClick={submit}>리뷰 제출 <ArrowRight className="ml-1 h-4 w-4" /></Button>
      </div>
    </AppShell>
  );
}
