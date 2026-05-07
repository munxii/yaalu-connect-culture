import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Languages, Send, Image as ImageIcon, MapPin } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { CHAT_SEED, MY_TEAM, USERS } from "@/lib/seed";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/chat")({ component: Chat });

function Chat() {
  const [msgs, setMsgs] = useState(CHAT_SEED);
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState<Record<string, boolean>>({});

  const send = () => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { id: String(Date.now()), senderId: "me", content: text, time: "지금" }]);
    setText("");
  };

  const userOf = (id: string) => USERS.find(u => u.id === id) ?? MY_TEAM[0];

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl flex flex-col h-[calc(100vh-9rem)] lg:h-[calc(100vh-7rem)]">
        <div className="px-5 py-4 border-b bg-card">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {MY_TEAM.map(u => <img key={u.id} src={u.avatar} className="h-8 w-8 rounded-full border-2 border-card bg-muted" alt="" />)}
            </div>
            <div>
              <div className="font-bold text-secondary text-sm">우리팀 4명</div>
              <div className="text-xs text-muted-foreground">감천문화마을 팀</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-muted/20">
          {msgs.map(m => {
            const u = userOf(m.senderId);
            const mine = m.senderId === "me";
            const showTr = translated[m.id];
            return (
              <div key={m.id} className={`flex gap-2 ${mine ? "flex-row-reverse" : ""}`}>
                {!mine && <img src={u.avatar} className="h-8 w-8 rounded-full bg-muted flex-shrink-0" alt="" />}
                <div className={`max-w-[75%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
                  {!mine && <span className="text-[10px] text-muted-foreground mb-0.5 px-1">{u.name}</span>}
                  <div className={`px-3.5 py-2 rounded-2xl text-sm ${mine ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card border rounded-bl-md"}`}>
                    {showTr && m.translated ? m.translated : m.content}
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <span className="text-[10px] text-muted-foreground">{m.time}</span>
                    {m.translated && (
                      <button onClick={() => setTranslated(t => ({...t, [m.id]: !t[m.id]}))} className="flex items-center gap-0.5 text-[10px] text-primary hover:underline">
                        <Languages className="h-3 w-3" /> {showTr ? "원문" : "번역"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-3 py-3 border-t bg-card flex items-center gap-2">
          <button className="h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground"><ImageIcon className="h-4 w-4" /></button>
          <button className="h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground"><MapPin className="h-4 w-4" /></button>
          <Input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="메시지 입력…" className="rounded-full flex-1" />
          <Button onClick={send} size="icon" className="rounded-full"><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </AppShell>
  );
}
