import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MapPin } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { QUESTS } from "@/lib/seed";

export const Route = createFileRoute("/quests/")({ component: QuestsList });

function QuestsList() {
  const [tab, setTab] = useState<"kculture" | "general">("kculture");
  const list = QUESTS.filter(q => q.track === tab);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-5 py-6">
        <h1 className="text-2xl font-black text-secondary">퀘스트</h1>
        <p className="text-sm text-muted-foreground">함께 도전하면 점수가 쌓여요</p>

        <div className="mt-5 inline-flex rounded-full bg-muted p-1">
          {([["kculture","K-컬처 트랙"],["general","일반 트랙"]] as const).map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} className={`px-5 py-2 rounded-full text-sm font-semibold transition ${tab===k?"bg-card shadow-sm text-secondary":"text-muted-foreground"}`}>{l}</button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map(q => (
            <Link key={q.id} to="/quests/$id" params={{ id: q.id }}>
              <Card className="rounded-3xl overflow-hidden border hover:shadow-pop transition group h-full">
                <div className="relative h-44 overflow-hidden">
                  <img src={q.image} alt={q.title} className="h-full w-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">+{q.points}P</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-secondary leading-snug">{q.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {q.location}</span>
                    <span>· {q.durationMin}분</span>
                  </div>
                  <div className="mt-2 flex">
                    {Array.from({length: 3}).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < q.difficulty ? "fill-warning text-warning" : "text-muted"}`} />
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
