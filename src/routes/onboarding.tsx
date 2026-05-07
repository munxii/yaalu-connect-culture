import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Mail, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { store } from "@/lib/store";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const INTERESTS = ["영화", "음식", "K-pop", "운동", "게임", "여행", "언어교환", "취업"];
const MBTIS = ["ENFP","INFP","ENFJ","INFJ","ENTP","INTP","ENTJ","INTJ","ESFP","ISFP","ESFJ","ISFJ","ESTP","ISTP","ESTJ","ISTJ"];

function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const [mbti, setMbti] = useState("");
  const [loading, setLoading] = useState(false);
  const demo = store.get().demoMode;

  const next = () => setStep((s) => s + 1);
  const finish = () => {
    setLoading(true);
    setTimeout(() => nav({ to: "/match" }), demo ? 800 : 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/90 backdrop-blur z-20 border-b">
        <div className="mx-auto max-w-xl px-5 py-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Step {step}/4</span>
            <span>{Math.round((step/4)*100)}%</span>
          </div>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary" animate={{ width: `${(step/4)*100}%` }} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-5 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
            {step === 1 && (
              <Card className="p-6 rounded-3xl">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center"><Mail className="h-5 w-5 text-primary" /></div>
                <h1 className="mt-5 text-2xl font-black text-secondary">학교 이메일로 시작</h1>
                <p className="mt-2 text-sm text-muted-foreground">@ks.ac.kr 또는 유학생 임시 코드</p>
                <Input className="mt-6 h-12 rounded-xl" placeholder="eunji@ks.ac.kr" defaultValue="eunji@ks.ac.kr" />
                <Button className="mt-4 w-full h-12 rounded-full" onClick={next}>인증 메일 보내기 <ArrowRight className="ml-1 h-4 w-4" /></Button>
                <p className="mt-3 text-xs text-center text-muted-foreground">데모용 — 자동 인증됩니다</p>
              </Card>
            )}
            {step === 2 && (
              <Card className="p-6 rounded-3xl">
                <h1 className="text-2xl font-black text-secondary">기본 정보</h1>
                <div className="mt-6 space-y-4">
                  <div><label className="text-xs font-semibold text-muted-foreground">이름</label><Input className="mt-1 h-11 rounded-xl" defaultValue="이은지" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs font-semibold text-muted-foreground">국적</label><select className="mt-1 w-full h-11 rounded-xl border bg-background px-3 text-sm"><option>🇰🇷 대한민국</option><option>🇻🇳 베트남</option><option>🇨🇳 중국</option><option>🇯🇵 일본</option><option>🇺🇸 미국</option></select></div>
                    <div><label className="text-xs font-semibold text-muted-foreground">학년</label><select className="mt-1 w-full h-11 rounded-xl border bg-background px-3 text-sm"><option>1</option><option>2</option><option selected>3</option><option>4</option></select></div>
                  </div>
                  <div><label className="text-xs font-semibold text-muted-foreground">학과</label><Input className="mt-1 h-11 rounded-xl" defaultValue="디지털미디어학과" /></div>
                  <div><label className="text-xs font-semibold text-muted-foreground">사용 언어</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["한국어","English","中文","日本語","Tiếng Việt"].map(l => (
                        <span key={l} className="px-3 py-1.5 rounded-full bg-muted text-xs">{l}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full h-12 rounded-full" onClick={next}>다음 <ArrowRight className="ml-1 h-4 w-4" /></Button>
              </Card>
            )}
            {step === 3 && (
              <Card className="p-6 rounded-3xl">
                <h1 className="text-2xl font-black text-secondary">너를 알려줘</h1>
                <div className="mt-6">
                  <label className="text-xs font-semibold text-muted-foreground">MBTI</label>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {MBTIS.map((m) => (
                      <button key={m} onClick={() => setMbti(m)} className={`h-10 rounded-xl text-xs font-semibold border transition ${mbti===m?"bg-primary text-white border-primary":"bg-card hover:bg-muted"}`}>{m}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-xs font-semibold text-muted-foreground">관심사 (3개)</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {INTERESTS.map((i) => {
                      const on = picked.includes(i);
                      return (
                        <button key={i} onClick={() => setPicked(p => on ? p.filter(x=>x!==i) : p.length<3 ? [...p, i] : p)} className={`px-3.5 py-2 rounded-full text-sm font-medium border transition ${on?"bg-secondary text-secondary-foreground border-secondary":"bg-card hover:bg-muted"}`}>{i}</button>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-xs font-semibold text-muted-foreground">활동 목적</label>
                  <select className="mt-1 w-full h-11 rounded-xl border bg-background px-3 text-sm"><option>친구 만들기</option><option>언어 교환</option><option>문화 체험</option></select>
                </div>
                <div className="mt-6">
                  <label className="text-xs font-semibold text-muted-foreground">주간 가용 빈도 (회/주)</label>
                  <div className="mt-3"><Slider defaultValue={[3]} max={7} min={1} step={1} /></div>
                </div>
                <Button className="mt-6 w-full h-12 rounded-full" onClick={next}>다음 <ArrowRight className="ml-1 h-4 w-4" /></Button>
              </Card>
            )}
            {step === 4 && !loading && (
              <Card className="p-6 rounded-3xl text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center"><Upload className="h-8 w-8 text-muted-foreground" /></div>
                <h1 className="mt-5 text-2xl font-black text-secondary">프로필 사진</h1>
                <p className="mt-2 text-sm text-muted-foreground">없으면 스킵해도 괜찮아요</p>
                <Button className="mt-6 w-full h-12 rounded-full" onClick={finish}>매칭 시작 <Sparkles className="ml-1 h-4 w-4" /></Button>
                <button className="mt-2 text-xs text-muted-foreground" onClick={finish}>건너뛰기</button>
              </Card>
            )}
            {loading && (
              <Card className="p-10 rounded-3xl text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }} className="mx-auto h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary" />
                <h2 className="mt-6 text-xl font-bold text-secondary">매칭 풀에 등록 중…</h2>
                <p className="mt-2 text-sm text-muted-foreground">너랑 잘 맞는 친구들을 찾고 있어요</p>
                <ul className="mt-6 text-xs text-muted-foreground space-y-1.5 inline-block text-left">
                  <li><Check className="inline h-3.5 w-3.5 text-mint" /> 관심사 매칭…</li>
                  <li><Check className="inline h-3.5 w-3.5 text-mint" /> 가용 시간대 분석…</li>
                  <li><Check className="inline h-3.5 w-3.5 text-mint" /> 국적 균형 확인…</li>
                </ul>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
