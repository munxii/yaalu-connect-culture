import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, CartesianGrid } from "recharts";
import { TrendingUp, Users, Heart, Ticket } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/admin")({ component: Admin });

const monthly = [
  { m: "1월", v: 32 }, { m: "2월", v: 48 }, { m: "3월", v: 89 }, { m: "4월", v: 142 }, { m: "5월", v: 213 },
];
const completion = [
  { name: "완료", value: 73, c: "var(--coral)" },
  { name: "진행", value: 18, c: "var(--mint)" },
  { name: "중단", value: 9, c: "var(--border)" },
];
const nations = [
  { n: "베트남", v: 124 }, { n: "중국", v: 98 }, { n: "일본", v: 76 }, { n: "미국", v: 54 }, { n: "기타", v: 42 },
];
const coupons = [
  { d: "W1", v: 22 }, { d: "W2", v: 41 }, { d: "W3", v: 67 }, { d: "W4", v: 88 }, { d: "W5", v: 94 },
];

function Admin() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-6 space-y-5">
        <div className="flex items-end justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold text-primary tracking-widest">ADMIN DASHBOARD</span>
            <h1 className="text-2xl font-black text-secondary">경성대 글로컬 운영 현황</h1>
          </div>
          <div className="text-xs text-muted-foreground">최근 30일 · 데모 데이터</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KPI i={Users} l="누적 매칭" v="524건" delta="+38%" />
          <KPI i={TrendingUp} l="퀘스트 완료율" v="73%" delta="+11%p" />
          <KPI i={Heart} l="만족도" v="+27%p" delta="설문" />
          <KPI i={Ticket} l="쿠폰 사용" v="312건" delta="+62%" />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <Card className="rounded-3xl p-5">
            <h3 className="font-bold text-secondary">월간 활성 매칭 수</h3>
            <div className="h-56 mt-3">
              <ResponsiveContainer><LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="var(--coral)" strokeWidth={3} dot={{ r: 5, fill: "var(--coral)" }} />
              </LineChart></ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="font-bold text-secondary">퀘스트 완료율</h3>
            <div className="h-56 mt-3">
              <ResponsiveContainer><PieChart>
                <Pie data={completion} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {completion.map((c, i) => <Cell key={i} fill={c.c} />)}
                </Pie>
                <Tooltip />
              </PieChart></ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs">
              {completion.map(c => <div key={c.name} className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: c.c }} />{c.name} {c.value}%</div>)}
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="font-bold text-secondary">국적별 참여 분포</h3>
            <div className="h-56 mt-3">
              <ResponsiveContainer><BarChart data={nations} layout="vertical">
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis dataKey="n" type="category" stroke="var(--muted-foreground)" fontSize={11} width={50} />
                <Tooltip />
                <Bar dataKey="v" fill="var(--indigo)" radius={[0, 8, 8, 0]} />
              </BarChart></ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="font-bold text-secondary">상권 유입 효과 (쿠폰 사용)</h3>
            <div className="h-56 mt-3">
              <ResponsiveContainer><AreaChart data={coupons}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--mint)" stopOpacity={0.6} /><stop offset="100%" stopColor="var(--mint)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="var(--mint)" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart></ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function KPI({ i: Icon, l, v, delta }: { i: any; l: string; v: string; delta: string }) {
  return (
    <Card className="rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-[10px] font-bold text-mint bg-mint/15 px-1.5 py-0.5 rounded-full">{delta}</span>
      </div>
      <div className="mt-3 text-2xl font-black text-secondary">{v}</div>
      <div className="text-xs text-muted-foreground">{l}</div>
    </Card>
  );
}
