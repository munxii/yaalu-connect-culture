import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Camera, MessageSquare, Check, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MY_TEAM } from "@/lib/seed";
import { store } from "@/lib/store";

export const Route = createFileRoute("/quest/active")({ component: ActiveQuest });

type S = "todo" | "doing" | "done";

function ActiveQuest() {
  const nav = useNavigate();
  const demo = store.get().demoMode;
  const [loc, setLoc] = useState<S>("todo");
  const [dur, setDur] = useState<S>("todo");
  const [duration, setDuration] = useState(0); // 0 -> 60
  const [mission, setMission] = useState<S>("todo");
  const [missionShake, setMissionShake] = useState(false);
  const [chat, setChat] = useState<S>("todo");
  const [keyword, setKeyword] = useState("");
  const allDone = loc === "done" && dur === "done" && mission === "done" && chat === "done";

  // location
  useEffect(() => {
    const t = setTimeout(() => setLoc("doing"), 400);
    const t2 = setTimeout(() => setLoc("done"), demo ? 1800 : 5000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [demo]);

  // duration starts after location done
  useEffect(() => {
    if (loc !== "done") return;
    setDur("doing");
    const step = demo ? 60 : 600;
    const iv = setInterval(() => {
      setDuration((d) => {
        const next = d + 2;
        if (next >= 60) { clearInterval(iv); setDur("done"); return 60; }
        return next;
      });
    }, step);
    return () => clearInterval(iv);
  }, [loc, demo]);

  // random mission appears after dur done
  useEffect(() => {
    if (dur !== "done") return;
    const t = setTimeout(() => { setMission("doing"); setMissionShake(true); setTimeout(()=>setMissionShake(false), 800); }, 600);
    return () => clearTimeout(t);
  }, [dur]);

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-5 py-6 space-y-4">
        <div>
          <span className="text-xs font-bold text-primary tracking-widest">진행 중 퀘스트</span>
          <h1 className="mt-1 text-2xl font-black text-secondary">감천문화마을 단체 콘텐츠 제작</h1>
          <p className="text-sm text-muted-foreground">4가지 인증을 모두 완료하면 점수가 지급됩니다</p>
        </div>

        {/* 1. Location */}
        <VCard title="위치 인증" icon={MapPin} status={loc}>
          <div className="relative h-44 rounded-2xl bg-gradient-to-br from-emerald-100 to-blue-100 overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, white 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }} />
            <motion.div className="absolute" initial={{ left: "20%", top: "20%" }} animate={loc !== "todo" ? { left: "45%", top: "45%" } : {}} transition={{ duration: 1.2 }}>
              <img src={MY_TEAM[0].avatar} className="h-9 w-9 rounded-full border-2 border-white shadow" alt="" />
            </motion.div>
            <motion.div className="absolute" initial={{ left: "70%", top: "20%" }} animate={loc !== "todo" ? { left: "50%", top: "45%" } : {}} transition={{ duration: 1.2 }}>
              <img src={MY_TEAM[1].avatar} className="h-9 w-9 rounded-full border-2 border-white shadow" alt="" />
            </motion.div>
            <motion.div className="absolute" initial={{ left: "20%", top: "70%" }} animate={loc !== "todo" ? { left: "45%", top: "50%" } : {}} transition={{ duration: 1.2 }}>
              <img src={MY_TEAM[2].avatar} className="h-9 w-9 rounded-full border-2 border-white shadow" alt="" />
            </motion.div>
            <motion.div className="absolute" initial={{ left: "70%", top: "70%" }} animate={loc !== "todo" ? { left: "50%", top: "50%" } : {}} transition={{ duration: 1.2 }}>
              <img src={MY_TEAM[3].avatar} className="h-9 w-9 rounded-full border-2 border-white shadow" alt="" />
            </motion.div>
            {loc === "done" && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-mint flex items-center justify-center shadow-lg">
                <Check className="h-7 w-7 text-secondary" strokeWidth={3} />
              </motion.div>
            )}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">감천문화마을 입구에 4명 모두 도착했는지 확인합니다</p>
        </VCard>

        {/* 2. Duration */}
        <VCard title="체류시간 인증" icon={Clock} status={dur}>
          <div className="flex items-center justify-center py-4">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 120 120" className="-rotate-90">
                <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="10" fill="none" className="text-muted" />
                <motion.circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" className="text-primary"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - duration / 60)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-black text-secondary">{duration}<span className="text-sm text-muted-foreground">/60</span></div>
                <div className="text-[10px] text-muted-foreground">분</div>
              </div>
            </div>
          </div>
        </VCard>

        {/* 3. Random mission */}
        <VCard title="랜덤 미션" icon={Camera} status={mission}>
          <AnimatePresence>
            {mission !== "todo" && (
              <motion.div animate={missionShake ? { x: [0, -6, 6, -6, 6, 0] } : {}} transition={{ duration: 0.5 }} className="rounded-2xl bg-warning/15 border border-warning/40 p-4">
                <div className="text-sm font-bold text-secondary">📸 지금 팀원과 셀카 찍기!</div>
                <div className="mt-1 text-xs text-muted-foreground">팀원 4명 모두 한 프레임에 들어가게</div>
                {mission === "doing" && (
                  <Button size="sm" className="mt-3 rounded-full" onClick={() => setMission("done")}>사진 업로드 (mock)</Button>
                )}
                {mission === "done" && <div className="mt-3 text-xs text-mint font-semibold">✓ 업로드 완료</div>}
              </motion.div>
            )}
          </AnimatePresence>
          {mission === "todo" && <p className="text-xs text-muted-foreground">위 단계 완료 후 미션이 도착합니다</p>}
        </VCard>

        {/* 4. Interaction */}
        <VCard title="상호작용 인증" icon={MessageSquare} status={chat}>
          <div className="flex gap-2">
            <Input placeholder="오늘 대화 키워드 (예: 영화, 떡볶이…)" value={keyword} onChange={e => setKeyword(e.target.value)} disabled={chat === "done"} className="rounded-xl" />
            <Button onClick={() => keyword.trim() && setChat("done")} disabled={chat === "done" || mission !== "done"} className="rounded-full">제출</Button>
          </div>
        </VCard>

        <Button size="lg" disabled={!allDone} onClick={() => nav({ to: "/quest/review/$id", params: { id: "q2" } })} className="w-full rounded-full h-13 shadow-pop">
          사후 교차 리뷰 시작 <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </AppShell>
  );
}

function VCard({ title, icon: Icon, status, children }: { title: string; icon: any; status: S; children: React.ReactNode }) {
  return (
    <Card className={`rounded-3xl p-5 transition border-2 ${status === "done" ? "border-mint/50 bg-mint/5" : status === "doing" ? "border-primary/40" : "border-border"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${status === "done" ? "bg-mint text-secondary" : status === "doing" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
            {status === "done" ? <Check className="h-5 w-5" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
          </div>
          <h3 className="font-bold text-secondary">{title}</h3>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${status === "done" ? "text-mint" : status === "doing" ? "text-primary" : "text-muted-foreground"}`}>
          {status === "done" ? "완료" : status === "doing" ? "진행 중" : "대기"}
        </span>
      </div>
      <div className="mt-3">{children}</div>
    </Card>
  );
}
