import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Users, Sparkles, Trophy, ShieldCheck, Camera, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

export function MarketingSections() {
  return (
    <>
      {/* Problem stats */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl md:text-5xl font-black text-balance">유학생은 왔지만, <span className="text-primary">겉돈다.</span></h2>
          <p className="mt-3 text-white/60 max-w-2xl">한국 캠퍼스의 외국인 유학생은 매년 늘지만, 한국인 친구를 사귄 비율은 그만큼 자라지 못했습니다.</p>
          <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8">
            {[
              { n: 208000, suf: "+", l: "국내 외국인 유학생" },
              { n: 67, suf: "%", l: "한국인 친구 0~1명" },
              { n: 41, suf: "%", l: "외로움 호소" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/5 p-5 md:p-8">
                <div className="text-3xl md:text-5xl font-black text-primary"><CountUp end={s.n} suffix={s.suf} /></div>
                <div className="mt-2 text-xs md:text-sm text-white/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution 3 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-primary tracking-widest">YAALU SOLUTION</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-secondary text-balance">얄루는 셋으로 풉니다.</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { icon: Users, t: "2:2 매칭", d: "한국인 2 + 유학생 2. 친구 만들기에 가장 안정적인 조합." },
              { icon: ShieldCheck, t: "다층 인증", d: "위치·체류·랜덤미션·교차리뷰 4단계 검증으로 신뢰 확보." },
              { icon: Sparkles, t: "K-컬처 퀘스트", d: "BIFF·감천문화마을·K-pop 등 부산만의 문화 콘텐츠." },
            ].map((s) => (
              <Card key={s.t} className="p-7 rounded-3xl border-2 hover:border-primary/30 transition">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center"><s.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="mt-5 text-xl font-bold text-secondary">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 2:2 Why */}
      <section className="py-16 bg-muted/40">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-3xl md:text-4xl font-black text-secondary text-center">왜 2:2가 최적인가?</h2>
          <div className="mt-10 grid grid-cols-3 gap-3 md:gap-5">
            {[
              { t: "1:1", pros: "친밀도 ↑", cons: "부담 큼·이탈률 ↑", hi: false },
              { t: "2:2", pros: "안정·균형·다양성", cons: "—", hi: true },
              { t: "3:3", pros: "다양성 ↑", cons: "조율 어려움·소외 발생", hi: false },
            ].map((c) => (
              <div key={c.t} className={`rounded-3xl p-5 md:p-7 text-center ${c.hi ? "bg-primary text-primary-foreground shadow-pop scale-105 md:scale-110" : "bg-card border"}`}>
                <div className={`text-3xl md:text-4xl font-black ${c.hi ? "" : "text-secondary"}`}>{c.t}</div>
                <div className={`mt-3 text-xs md:text-sm font-semibold ${c.hi ? "" : "text-mint"}`}>+ {c.pros}</div>
                <div className={`mt-1 text-xs ${c.hi ? "text-white/70" : "text-muted-foreground"}`}>− {c.cons}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quest preview */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl md:text-4xl font-black text-secondary">부산만의 K-컬처 퀘스트</h2>
          <p className="mt-2 text-muted-foreground">함께할수록 점수가 쌓이는 미션들</p>
          <div className="mt-8 flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-3">
            {[
              { t: "부산국제영화제 동반 관람", img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600", p: 150 },
              { t: "감천문화마을 콘텐츠", img: "https://images.unsplash.com/photo-1601370690183-1c7796ecec48?w=600", p: 200 },
              { t: "K-pop 댄스 클래스", img: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600", p: 120 },
              { t: "광안리 야시장 미션", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600", p: 130 },
            ].map((q) => (
              <div key={q.t} className="min-w-[260px] rounded-3xl overflow-hidden border bg-card shadow-soft">
                <img src={q.img} alt={q.t} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="font-bold text-secondary">{q.t}</div>
                  <div className="mt-1 text-xs text-primary font-semibold">+{q.p}P</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-step verification timeline */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="mx-auto max-w-3xl px-5">
          <span className="text-xs font-bold text-primary tracking-widest">VERIFICATION</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-balance">신뢰는 4단계로 만들어집니다.</h2>
          <ol className="mt-10 space-y-5">
            {[
              { i: MapPin, t: "위치 인증", d: "4명이 같은 지점에 동시 도착했는지 확인" },
              { i: Clock, t: "체류시간 인증", d: "퀘스트별 권장 시간만큼 함께 머물렀는지" },
              { i: Camera, t: "랜덤 미션", d: "현장에서 즉흥 미션(셀카·키워드 등) 수행" },
              { i: Users, t: "사후 교차 리뷰", d: "팀원 4명이 서로 평가하고 배운 점 기록" },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center"><s.i className="h-5 w-5" /></div>
                  {i < 3 && <div className="w-px h-12 bg-white/20 my-1" />}
                </div>
                <div className="pt-1.5 flex-1">
                  <div className="font-bold text-lg">{s.t}</div>
                  <div className="text-sm text-white/60">{s.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reward tiers */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl md:text-4xl font-black text-secondary"><Trophy className="inline h-8 w-8 text-warning -mt-2" /> 함께 쌓고 함께 받는 리워드</h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { t: "Bronze", c: "from-orange-400 to-amber-600", p: "0+", r: "제휴 카페 쿠폰" },
              { t: "Silver", c: "from-slate-300 to-slate-500", p: "300+", r: "언어교환 쿠폰" },
              { t: "Gold", c: "from-yellow-400 to-amber-600", p: "700+", r: "공식 인증 배지" },
              { t: "Platinum", c: "from-cyan-300 to-indigo-500", p: "1200+", r: "글로컬 앰버서더" },
            ].map((t) => (
              <div key={t.t} className="rounded-3xl border p-5 bg-card">
                <div className={`h-20 rounded-2xl bg-gradient-to-br ${t.c} flex items-center justify-center text-white font-black text-xl`}>{t.t}</div>
                <div className="mt-3 text-xs text-muted-foreground">{t.p} P</div>
                <div className="text-sm font-semibold text-secondary">{t.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 bg-muted/40">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-3xl md:text-4xl font-black text-secondary">로드맵</h2>
          <div className="mt-10 relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-border rounded-full" />
            <div className="absolute top-5 left-0 h-1 bg-primary rounded-full" style={{ width: "30%" }} />
            <div className="grid grid-cols-4 relative">
              {[
                { t: "경성대", s: "2026" },
                { t: "부산", s: "2027" },
                { t: "전국", s: "2028" },
                { t: "해외", s: "2030" },
              ].map((p, i) => (
                <div key={p.t} className="text-center">
                  <div className={`mx-auto h-11 w-11 rounded-full border-4 border-background flex items-center justify-center font-bold ${i === 0 ? "bg-primary text-white" : "bg-card text-muted-foreground"}`}>{i + 1}</div>
                  <div className="mt-3 font-bold text-secondary">{p.t}</div>
                  <div className="text-xs text-muted-foreground">{p.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-secondary text-balance px-5">오늘, 한 명을 더 알게 되는 일.</h2>
        <Link to="/onboarding" className="inline-block mt-8">
          <Button size="lg" className="rounded-full h-14 px-10 text-base shadow-pop">지금 매칭 시작하기 <ArrowRight className="ml-1 h-4 w-4" /></Button>
        </Link>
      </section>

      <footer className="border-t py-10 bg-card pb-safe" style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))" }}>
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl gradient-sunset flex items-center justify-center font-black text-white">Y</div>
              <div className="font-bold text-secondary">얄루 Yaalu</div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">경성대학교 글로컬대학30 연계 캠퍼스 교류 플랫폼</p>
          </div>
          <div>
            <div className="font-semibold text-secondary text-xs">팀</div>
            <p className="mt-2 text-xs text-muted-foreground">이은지 · 손영빈 · 김규태 · 이건우</p>
          </div>
          <div>
            <div className="font-semibold text-secondary text-xs">파트너</div>
            <div className="mt-2 flex gap-2">
              <div className="h-10 w-24 rounded-md border bg-muted flex items-center justify-center text-[10px] text-muted-foreground">글로컬30 로고</div>
              <div className="h-10 w-24 rounded-md border bg-muted flex items-center justify-center text-[10px] text-muted-foreground">경성대 로고</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}