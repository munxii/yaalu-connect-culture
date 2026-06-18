import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Download, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MarketingSections } from "@/components/MarketingSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "얄루(Yaalu) — 한국인 × 유학생 2:2 매칭 캠퍼스 교류 플랫폼" },
      { name: "description", content: "경성대 글로컬대학30 연계. 부산 K-컬처 퀘스트를 함께 수행하고 다층 인증으로 검증, 리워드를 받는 플랫폼." },
    ],
  }),
  component: Landing,
});

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const dur = 1400; const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

function Landing() {
  const cards = [
    { name: "이은지", flag: "🇰🇷", color: "from-rose-200 to-rose-400" },
    { name: "Linh", flag: "🇻🇳", color: "from-amber-200 to-amber-400" },
    { name: "김민준", flag: "🇰🇷", color: "from-indigo-200 to-indigo-400" },
    { name: "Wang", flag: "🇨🇳", color: "from-emerald-200 to-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top utility bar */}
      <div className="border-b bg-background/80 backdrop-blur sticky top-0 z-30 pt-safe">
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl gradient-sunset flex items-center justify-center font-black text-white">Y</div>
            <div className="font-bold text-secondary">얄루 <span className="text-muted-foreground font-normal text-sm">Yaalu</span></div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground">
            <span className="px-2.5 py-1 rounded-full bg-muted">GLOCAL × KYUNGSUNG</span>
            <span>경성대 · 글로컬대학30</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/download" className="hidden sm:inline-flex">
              <Button size="sm" variant="outline" className="rounded-full min-h-touch px-4 gap-1.5">
                <Download className="h-3.5 w-3.5" /> 앱 다운로드
              </Button>
            </Link>
            <Link to="/download" className="sm:hidden" aria-label="앱 다운로드">
              <Button size="sm" variant="outline" className="rounded-full h-9 w-9 p-0">
                <Download className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button size="sm" className="rounded-full min-h-touch px-4">시작하기</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile-only app-style hero */}
      <section className="md:hidden relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-between px-6 pt-10 pb-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,oklch(0.74_0.18_35/0.22),transparent_70%)]" />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.7 }}
            className="h-24 w-24 rounded-[2rem] gradient-sunset flex items-center justify-center text-white font-black text-5xl shadow-pop"
          >
            Y
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-7"
          >
            <div className="text-3xl font-black text-secondary tracking-tight">얄루 <span className="text-muted-foreground font-medium text-xl">Yaalu</span></div>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed text-balance max-w-xs mx-auto">
              한국인 2명 + 유학생 2명,<br/>오늘 오후 함께 커피 한 잔.
            </p>
            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-secondary/10 text-secondary px-3 py-1.5 text-[11px] font-semibold">
              <Sparkles className="h-3 w-3" /> GLOCAL × KYUNGSUNG
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="space-y-3"
        >
          <Link to="/onboarding" className="block">
            <Button size="lg" className="w-full rounded-full text-base h-14 shadow-pop">
              매칭 시작하기 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/home" className="block">
            <Button size="lg" variant="outline" className="w-full rounded-full h-12">데모 둘러보기</Button>
          </Link>
          <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-mint" /> 무료</div>
            <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-mint" /> 가입 1분</div>
            <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-mint" /> 부산 K-컬처</div>
          </div>
          <Link to="/about" className="block text-center text-xs text-muted-foreground underline underline-offset-4 pt-2">
            서비스 자세히 알아보기 →
          </Link>
        </motion.div>
      </section>

      {/* Desktop Hero */}
      <section className="hidden md:block relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,oklch(0.74_0.18_35/0.18),transparent_70%)]" />
        <div className="mx-auto max-w-6xl px-5 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 text-secondary px-3 py-1 text-xs font-semibold">
                <Sparkles className="h-3 w-3" /> GLOCAL × KYUNGSUNG · 글로컬대학30 연계
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl font-black text-secondary leading-[1.05] text-balance">
                벽을 허무는 것은,<br />
                오늘 오후 함께 <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">커피</span>를 마시는<br />
                <span className="underline decoration-primary decoration-4 underline-offset-4">네 명의 학생</span>에서 시작된다.
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg">
                한국인 2명 + 유학생 2명을 자동 매칭해 부산 K-컬처 퀘스트를 함께 수행하고, 다층 인증으로 검증한 뒤 리워드를 받는 캠퍼스 교류 플랫폼.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/onboarding">
                  <Button size="lg" className="rounded-full text-base px-7 h-12 shadow-[0_12px_30px_-10px_oklch(0.69_0.21_25/0.5)]">
                    지금 매칭 시작하기 <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button size="lg" variant="outline" className="rounded-full h-12">관리자 데모 보기</Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-mint" /> 무료 데모</div>
                <div className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-mint" /> 회원가입 1분</div>
                <div className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-mint" /> 모바일 PWA</div>
              </div>
            </motion.div>
          </div>

          {/* Right: 4 cards merging */}
          <div className="relative h-[420px] md:h-[480px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute h-24 w-24 rounded-3xl gradient-sunset flex items-center justify-center text-white font-black text-2xl shadow-2xl z-10"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }}
              >
                Y
              </motion.div>
              {cards.map((c, i) => {
                const angle = (i * 90) - 45;
                const rad = (angle * Math.PI) / 180;
                const dx = Math.cos(rad) * 140;
                const dy = Math.sin(rad) * 140;
                return (
                  <motion.div
                    key={c.name}
                    initial={{ x: dx * 2.5, y: dy * 2.5, opacity: 0, rotate: i * 8 }}
                    animate={{ x: dx, y: dy, opacity: 1, rotate: (i % 2 ? 1 : -1) * 6 }}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.7, type: "spring" }}
                    className={`absolute w-32 h-40 rounded-3xl bg-gradient-to-br ${c.color} shadow-xl p-3 flex flex-col justify-end`}
                  >
                    <div className="text-2xl">{c.flag}</div>
                    <div className="text-sm font-bold text-secondary">{c.name}</div>
                  </motion.div>
                );
              })}
              {/* connecting dashes */}
              <svg className="absolute inset-0 w-full h-full -z-0" viewBox="-200 -200 400 400">
                {cards.map((_, i) => {
                  const a = (i * 90 - 45) * Math.PI / 180;
                  return <motion.line key={i} x1="0" y1="0" x2={Math.cos(a) * 140} y2={Math.sin(a) * 140} stroke="oklch(0.69 0.21 25)" strokeWidth="1.5" strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1.4 }} />;
                })}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing sections — desktop only. On mobile they live on /about */}
      <div className="hidden md:block">
        <MarketingSections />
      </div>
    </div>
  );
}
