import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin, Clock, Star, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QUESTS, MY_TEAM } from "@/lib/seed";

export const Route = createFileRoute("/quests/$id")({
  loader: ({ params }) => {
    const q = QUESTS.find(x => x.id === params.id);
    if (!q) throw notFound();
    return q;
  },
  component: QuestDetail,
  notFoundComponent: () => <AppShell><div className="p-10 text-center text-muted-foreground">퀘스트를 찾을 수 없어요</div></AppShell>,
});

function QuestDetail() {
  const q = Route.useLoaderData();

  return (
    <AppShell>
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={q.image} alt={q.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>
      <div className="mx-auto max-w-3xl px-5 -mt-16 relative">
        <Card className="rounded-3xl p-6">
          <span className="text-xs font-bold text-primary tracking-widest">{q.track === "kculture" ? "K-CULTURE" : "GENERAL"}</span>
          <h1 className="mt-2 text-3xl font-black text-secondary">{q.title}</h1>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{q.location}</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" />{q.durationMin}분</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">{Array.from({length: q.difficulty}).map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />)}</span>
            <span className="ml-auto px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">+{q.points}P</span>
          </div>

          <p className="mt-5 text-sm text-foreground/80 leading-relaxed">{q.description}</p>

          <div className="mt-5 rounded-2xl bg-mint/10 border border-mint/30 p-4 text-sm">
            <strong>💡 팁:</strong> {q.tip}
          </div>

          <div className="mt-5">
            <div className="text-xs font-semibold text-muted-foreground mb-2">위치</div>
            <div className="h-48 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-secondary relative overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <div className="relative text-center">
                <MapPin className="h-10 w-10 mx-auto text-primary" />
                <div className="mt-1 text-sm font-bold">{q.location}</div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1"><Users className="h-3 w-3" /> 우리팀 4명</div>
            <div className="flex -space-x-2">
              {MY_TEAM.map(u => <img key={u.id} src={u.avatar} className="h-10 w-10 rounded-full border-2 border-card bg-muted" alt={u.name} />)}
            </div>
          </div>

          <Link to="/quest/active" className="block mt-6">
            <Button size="lg" className="w-full rounded-full h-12 shadow-pop">이 퀘스트 시작하기 <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </Link>
        </Card>
      </div>
    </AppShell>
  );
}
