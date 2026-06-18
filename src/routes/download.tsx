import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Smartphone, QrCode, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const APK_URL =
  "https://github.com/munxii/yaalu-connect-culture/releases/download/v1.0.0/app-release.apk";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "앱 다운로드 — 얄루(Yaalu)" },
      {
        name: "description",
        content:
          "얄루 안드로이드 앱(APK)을 휴대폰에서 바로 설치하세요. QR을 스캔하거나 직접 다운로드 링크로 받을 수 있습니다.",
      },
      { property: "og:title", content: "앱 다운로드 — 얄루(Yaalu)" },
      {
        property: "og:description",
        content: "얄루 안드로이드 앱(APK)을 휴대폰에서 바로 설치하세요.",
      },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  const router = useRouter();

  const steps = [
    {
      icon: QrCode,
      title: "1. 다운로드",
      desc: "QR을 스캔하거나 아래 버튼을 눌러 APK 파일을 받으세요.",
    },
    {
      icon: Smartphone,
      title: "2. 설치",
      desc: "다운로드한 파일을 폰에서 탭하여 설치 (출처 알 수 없는 앱 허용 필요).",
    },
    {
      icon: CheckCircle2,
      title: "3. 실행",
      desc: "설치가 완료되면 홈 화면의 얄루 아이콘으로 앱을 실행하세요.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-md pt-safe">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
          <button
            onClick={() => router.history.back()}
            aria-label="back"
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted active:bg-muted transition"
          >
            <ArrowLeft className="h-5 w-5 text-secondary" />
          </button>
          <div className="flex-1 text-center font-bold text-secondary truncate">앱 다운로드</div>
          <Link to="/" className="flex h-11 w-11 items-center justify-center">
            <div className="h-8 w-8 rounded-xl gradient-sunset flex items-center justify-center font-black text-white text-sm">
              Y
            </div>
          </Link>
        </div>
      </header>

      <main className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(80%_60%_at_50%_0%,oklch(0.74_0.18_35/0.22),transparent_70%)]" />

        <div className="mx-auto max-w-3xl px-5 py-10 md:py-16">
          {/* Hero */}
          <section className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.7 }}
              className="mx-auto h-20 w-20 md:h-24 md:w-24 rounded-[1.75rem] md:rounded-[2rem] gradient-sunset flex items-center justify-center text-white font-black text-4xl md:text-5xl shadow-pop"
            >
              Y
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary/10 text-secondary px-3 py-1 text-[11px] font-semibold">
                <Sparkles className="h-3 w-3" /> ANDROID APP · v1.0.0
              </div>
              <h1 className="mt-5 text-3xl md:text-5xl font-black text-secondary leading-[1.1] text-balance">
                얄루 앱을<br className="md:hidden" /> 폰에서 만나보세요
              </h1>
              <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                QR을 스캔하거나 아래 버튼으로 안드로이드 앱(APK)을 바로 설치할 수 있어요.
              </p>
            </motion.div>
          </section>

          {/* QR card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-10 md:mt-14"
          >
            <Card className="mx-auto max-w-md rounded-[2rem] border-2 p-6 md:p-8 text-center shadow-pop">
              <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-bold">
                <QrCode className="h-3 w-3" /> SCAN ME
              </div>
              <div className="mt-5 rounded-3xl bg-white p-4 md:p-6 ring-1 ring-border shadow-soft">
                <img
                  src="/yaalu-qr.png"
                  alt="얄루 앱 다운로드 QR 코드"
                  className="mx-auto block aspect-square w-full max-w-[280px] md:max-w-[320px] object-contain"
                />
              </div>
              <p className="mt-5 text-sm font-semibold text-secondary">
                휴대폰 카메라로 스캔하세요
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                QR을 카메라로 비추면 다운로드 링크가 열려요.
              </p>
            </Card>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 md:mt-10"
          >
            <a href={APK_URL} className="block" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full md:max-w-md mx-auto rounded-full text-base h-14 shadow-[0_12px_30px_-10px_oklch(0.69_0.21_25/0.5)] flex"
              >
                <Download className="mr-1.5 h-5 w-5" /> APK 직접 다운로드
              </Button>
            </a>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              v1.0.0 · 약 15MB · GitHub Releases
            </p>
          </motion.section>

          {/* Install steps */}
          <section className="mt-14 md:mt-20">
            <h2 className="text-center text-xs font-bold text-primary tracking-widest">
              INSTALL GUIDE
            </h2>
            <h3 className="mt-2 text-center text-2xl md:text-3xl font-black text-secondary">
              세 단계면 충분해요
            </h3>
            <div className="mt-8 grid gap-3 md:grid-cols-3 md:gap-5">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                >
                  <Card className="h-full rounded-3xl border-2 p-5 md:p-6 hover:border-primary/30 transition">
                    <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="mt-4 font-bold text-secondary">{s.title}</div>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer note */}
          <section className="mt-14 md:mt-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-xs text-muted-foreground">
              <Smartphone className="h-3.5 w-3.5" />
              안드로이드 전용 · iOS는 웹 버전을 이용해 주세요
            </div>
            <div className="mt-5">
              <Link
                to="/"
                className="text-xs text-muted-foreground underline underline-offset-4"
              >
                홈으로 돌아가기 →
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
