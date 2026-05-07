import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, QrCode } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { REWARDS } from "@/lib/seed";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/rewards")({ component: Rewards });

function Rewards() {
  const points = useStore(s => s.teamPoints);
  const [open, setOpen] = useState<typeof REWARDS[number] | null>(null);

  const tierIdx = REWARDS.reduce((acc, r, i) => points >= r.min ? i : acc, 0);
  const next = REWARDS[Math.min(tierIdx + 1, REWARDS.length - 1)];
  const cur = REWARDS[tierIdx];
  const pct = Math.min(100, ((points - cur.min) / Math.max(1, next.min - cur.min)) * 100);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-5 py-6 space-y-5">
        <div>
          <h1 className="text-2xl font-black text-secondary">리워드</h1>
          <p className="text-sm text-muted-foreground">함께 쌓은 점수를 함께 받으세요</p>
        </div>

        <Card className="rounded-3xl p-6 gradient-indigo text-white border-0 overflow-hidden relative">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative">
            <div className="text-xs opacity-70">우리팀 누적</div>
            <div className="text-4xl font-black mt-1">{points}P</div>
            <div className="mt-4 flex justify-between text-xs opacity-70 mb-1.5"><span>{cur.tier}</span><span>{next.tier} 까지 {Math.max(0, next.min - points)}P</span></div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div className="h-full bg-primary" animate={{ width: `${pct}%` }} />
            </div>
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          {REWARDS.map((r, i) => {
            const unlocked = points >= r.min;
            return (
              <Card key={r.tier} className={`rounded-3xl p-5 transition ${unlocked ? "" : "opacity-60"}`}>
                <div className={`h-24 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-4xl relative overflow-hidden`}>
                  {!unlocked && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"><Lock className="h-7 w-7 text-white" /></div>}
                  {r.icon}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">{r.tier}</div>
                    <div className="font-bold text-secondary">{r.title}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{r.min}P+</div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{r.desc}</p>
                <Button disabled={!unlocked} onClick={() => setOpen(r)} className="mt-4 w-full rounded-full" variant={unlocked ? "default" : "outline"}>
                  {unlocked ? "쿠폰 교환" : `${r.min - points}P 부족`}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="rounded-3xl">
          <DialogHeader><DialogTitle>{open?.title}</DialogTitle></DialogHeader>
          <div className="text-center py-4">
            <div className={`mx-auto h-40 w-40 rounded-3xl bg-gradient-to-br ${open?.color} flex items-center justify-center`}>
              <div className="bg-white p-3 rounded-xl"><QrCode className="h-24 w-24 text-secondary" /></div>
            </div>
            <div className="mt-4 font-mono text-xs text-muted-foreground">YAALU-{open?.tier.toUpperCase()}-{Math.floor(Math.random()*9000+1000)}</div>
            <div className="mt-2 text-xs text-muted-foreground">유효기간: 2026-12-31</div>
            <p className="mt-4 text-sm">매장에서 QR을 보여주세요</p>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
