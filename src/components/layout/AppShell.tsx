import { Link, useRouterState, useRouter } from "@tanstack/react-router";
import { Home, Compass, MessageCircle, Gift, User, BarChart3, Globe, Sparkles, ArrowLeft } from "lucide-react";
import { store, useStore } from "@/lib/store";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";

const tabs = [
  { to: "/home", label: "홈", labelEn: "Home", icon: Home },
  { to: "/quests", label: "퀘스트", labelEn: "Quests", icon: Compass },
  { to: "/chat", label: "채팅", labelEn: "Chat", icon: MessageCircle },
  { to: "/rewards", label: "리워드", labelEn: "Rewards", icon: Gift },
  { to: "/profile", label: "마이", labelEn: "Me", icon: User },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();
  const lang = useStore((s) => s.lang);
  const demo = useStore((s) => s.demoMode);

  const rootTabs = ["/home", "/quests", "/chat", "/rewards", "/profile"];
  const isRootTab = rootTabs.some((t) => path === t || path.startsWith(t + "/") === false && path === t) || path === "/";
  // Show back button on any page that isn't one of the top-level tabs exactly
  const showBack = !rootTabs.includes(path) && path !== "/";

  const titleMap: Record<string, { ko: string; en: string }> = {
    "/quests": { ko: "퀘스트", en: "Quests" },
    "/chat": { ko: "채팅", en: "Chat" },
    "/rewards": { ko: "리워드", en: "Rewards" },
    "/profile": { ko: "마이", en: "Me" },
    "/home": { ko: "홈", en: "Home" },
    "/match": { ko: "우리 팀", en: "My Team" },
    "/admin": { ko: "관리자", en: "Admin" },
    "/onboarding": { ko: "회원가입", en: "Sign up" },
    "/quest/active": { ko: "진행 중인 퀘스트", en: "Active Quest" },
  };
  let pageTitle = titleMap[path]?.[lang];
  if (!pageTitle) {
    if (path.startsWith("/quests/")) pageTitle = lang === "ko" ? "퀘스트 상세" : "Quest";
    else if (path.startsWith("/quest/review")) pageTitle = lang === "ko" ? "퀘스트 후기" : "Review";
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-md pt-safe">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 lg:pl-72">
          {/* Mobile back button on sub-pages */}
          {showBack && (
            <button
              onClick={() => router.history.back()}
              aria-label="back"
              className="lg:hidden -ml-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted active:bg-muted transition"
            >
              <ArrowLeft className="h-5 w-5 text-secondary" />
            </button>
          )}
          {showBack && pageTitle ? (
            <div className="lg:hidden flex-1 text-center font-bold text-secondary truncate">{pageTitle}</div>
          ) : null}
          <Link to="/home" className={`flex items-center gap-2 ${showBack ? "hidden lg:flex" : ""}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-sunset text-white font-black">Y</div>
            <div>
              <div className="text-sm font-bold leading-none text-secondary">얄루 <span className="text-muted-foreground font-normal">Yaalu</span></div>
              <div className="text-[10px] text-muted-foreground mt-0.5">GLOCAL × KYUNGSUNG</div>
            </div>
          </Link>
          <div className={`flex items-center gap-3 ${showBack ? "ml-auto" : ""}`}>
            <button
              onClick={() => store.set({ lang: lang === "ko" ? "en" : "ko" })}
              className="flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-medium hover:bg-muted transition min-h-touch"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r bg-card pt-20 px-4 pb-safe">
          <nav className="flex flex-col gap-1">
            {tabs.map((t) => {
              const active = path.startsWith(t.to);
              const Icon = t.icon;
              return (
                <Link key={t.to} to={t.to} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition min-h-touch ${active ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted"}`}>
                  <Icon className="h-4 w-4" />
                  {lang === "ko" ? t.label : t.labelEn}
                </Link>
              );
            })}
            <Link to="/admin" className={`mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition min-h-touch ${path.startsWith("/admin") ? "bg-secondary/10 text-secondary font-semibold" : "text-muted-foreground hover:bg-muted"}`}>
              <BarChart3 className="h-4 w-4" />
              관리자 대시보드
            </Link>
          </nav>
          <div className="mt-auto mb-6 rounded-2xl border bg-muted/40 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> 데모 모드
              </div>
              <Switch checked={demo} onCheckedChange={(v) => store.set({ demoMode: v })} />
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground leading-relaxed">시연용 단축 모드 — 타이머·로딩이 1/10 속도</p>
          </div>
        </aside>

        <main
          className="flex-1 lg:ml-64 min-h-[calc(100vh-4rem)]"
          style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom tab */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t bg-background/95 backdrop-blur-md pb-safe">
        <div className="grid grid-cols-5">
          {tabs.map((t) => {
            const active = path.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link key={t.to} to={t.to} className="flex flex-col items-center justify-center gap-1 py-3 min-h-touch">
                <Icon className={`h-5 w-5 transition ${active ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-[10px] ${active ? "text-primary font-semibold" : "text-muted-foreground"}`}>{lang === "ko" ? t.label : t.labelEn}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating demo toggle on mobile */}
      <button
        onClick={() => store.set({ demoMode: !demo })}
        style={{ bottom: "calc(5.5rem + env(safe-area-inset-bottom))" }}
        className={`lg:hidden fixed right-4 z-40 flex items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold shadow-lg transition min-h-touch ${demo ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
      >
        🎭 데모 모드 {demo ? "ON" : "OFF"}
      </button>

      <Toaster position="top-center" />
    </div>
  );
}
