import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Trophy, Users, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MY_TEAM, QUESTS, REWARDS } from "@/lib/seed";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/home")({ component: Home });

function Home() {
  const points = useStore((s) => s.teamPoints);
  const tierIdx = REWARDS.reduce((acc, r, i) => points >= r.min ? i : acc, 0);
  const next = REWARDS[Math.min(tierIdx + 1, REWARDS.length - 1)];
  const cur = REWARDS[tierIdx];
  const pct = Math.min(100, ((points - cur.min) / Math.max(1, next.min - cur.min)) * 100);

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-5 py-6 space-y-5">
        <div>
          <p className="text-xs text-muted-foreground">안녕, 은지!</p>
          <h1 className="text-2xl font-black text-secondary">오늘도 한 명 더 알아갈 시간 ☀️</h1>
        </div>

        <Card className="rounded-3xl p-5 gradient-indigo text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs opacity-70">우리팀 누적 점수</div>
              <div className="text-3xl font-black mt-1">{points} <span className="text-sm font-normal opacity-70">P</span></div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-70">현재 등급</div>
              <div className="text-lg font-bold">{cur.tier} {cur.icon}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[10px] opacity-70 mb-1.5"><span>{cur.tier}</span><span>{next.tier} · {next.min}P</span></div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          {[
            { i: Users, l: "팀원", v: "4명" },
            { i: Trophy, l: "완료 퀘스트", v: "2개" },
            { i: Zap, l: "이번 주", v: "1회" },
            { i: Calendar, l: "다음 활동", v: "내일 14:00" },
          ].map((s) => (
            <Card key={s.l} className="rounded-2xl p-4">
              <s.i className="h-4 w-4 text-primary" />
              <div className="mt-2 text-xs text-muted-foreground">{s.l}</div>
              <div className="text-lg font-bold text-secondary">{s.v}</div>
            </Card>
          ))}
        </div>

        <Card className="rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-secondary">우리팀</h2>
            <Link to="/match" className="text-xs text-primary font-semibold">상세 →</Link>
          </div>
          <div className="mt-4 flex -space-x-3">
            {MY_TEAM.map((u) => (
              <img key={u.id} src={u.avatar} alt={u.name} title={u.name} className="h-12 w-12 rounded-full border-3 border-card bg-muted" />
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-secondary">추천 퀘스트</h2>
            <Link to="/quests" className="text-xs text-primary font-semibold">전체 보기 →</Link>
          </div>
          <div className="mt-4 space-y-3">
            {QUESTS.slice(0, 3).map(q => (
              <Link key={q.id} to="/quests/$id" params={{ id: q.id }} className="flex gap-3 items-center group">
                <img src={q.image} alt={q.title} className="h-16 w-16 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-secondary truncate group-hover:text-primary transition">{q.title}</div>
                  <div className="text-xs text-muted-foreground">{q.location} · {q.points}P</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
