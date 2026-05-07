import { createFileRoute } from "@tanstack/react-router";
import { Award, Calendar } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { ME } from "@/lib/seed";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/profile")({ component: Profile });

const BADGES = [
  { e: "🎬", n: "BIFF 첫 동행", on: true },
  { e: "🎨", n: "감천 콘텐츠 메이커", on: true },
  { e: "☕", n: "카페 토크", on: true },
  { e: "🌏", n: "3국 친구", on: true },
  { e: "🎤", n: "K-pop 마스터", on: false },
  { e: "🍜", n: "야시장 헌터", on: false },
  { e: "📚", n: "스터디 챔피언", on: false },
  { e: "👑", n: "글로컬 앰버서더", on: false },
];

function Profile() {
  const points = useStore(s => s.teamPoints);
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-5 py-6 space-y-5">
        <Card className="rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <img src={ME.avatar} alt={ME.name} className="h-20 w-20 rounded-3xl bg-muted" />
            <div>
              <div className="font-black text-xl text-secondary">{ME.name} <span className="text-sm font-normal">{ME.flag}</span></div>
              <div className="text-sm text-muted-foreground">{ME.major} · {ME.year}학년</div>
              <div className="mt-1 text-xs text-primary font-semibold">MBTI {ME.mbti}</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <Stat l="만난 사람" v="11" />
            <Stat l="완료 퀘스트" v="3" />
            <Stat l="누적 점수" v={`${points}P`} />
          </div>
        </Card>

        <Card className="rounded-3xl p-5">
          <h2 className="font-bold text-secondary flex items-center gap-2"><Award className="h-4 w-4 text-warning" /> 획득 배지</h2>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {BADGES.map(b => (
              <div key={b.n} className={`text-center rounded-2xl p-3 ${b.on ? "bg-warning/10" : "bg-muted opacity-50"}`}>
                <div className="text-3xl">{b.on ? b.e : "🔒"}</div>
                <div className="mt-1 text-[10px] font-medium text-secondary">{b.n}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl p-5">
          <h2 className="font-bold text-secondary flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> 활동 히스토리</h2>
          <ol className="mt-4 space-y-4">
            {[
              { d: "오늘", t: "감천문화마을 단체 콘텐츠 제작", p: "+200P" },
              { d: "5/3", t: "캠퍼스 사진 챌린지", p: "+80P" },
              { d: "5/1", t: "학교 근처 카페에서 메뉴 교환", p: "+80P" },
              { d: "4/28", t: "매칭 완료 — 우리팀 결성", p: "—" },
            ].map((h, i) => (
              <li key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary mt-2" />
                  {i < 3 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 pb-3">
                  <div className="text-xs text-muted-foreground">{h.d}</div>
                  <div className="font-semibold text-secondary text-sm">{h.t}</div>
                  <div className="text-xs text-primary font-semibold">{h.p}</div>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </AppShell>
  );
}

function Stat({ l, v }: { l: string; v: string }) {
  return (
    <div className="rounded-2xl bg-muted/50 p-3">
      <div className="text-xl font-black text-secondary">{v}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
    </div>
  );
}
