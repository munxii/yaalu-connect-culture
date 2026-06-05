import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MarketingSections } from "@/components/MarketingSections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "서비스 소개 — 얄루(Yaalu)" },
      { name: "description", content: "얄루의 2:2 매칭, 다층 인증, K-컬처 퀘스트, 리워드 시스템을 자세히 소개합니다." },
      { property: "og:title", content: "서비스 소개 — 얄루(Yaalu)" },
      { property: "og:description", content: "얄루의 2:2 매칭, 다층 인증, K-컬처 퀘스트, 리워드 시스템을 자세히 소개합니다." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-md pt-safe">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
          <button
            onClick={() => router.history.back()}
            aria-label="back"
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted active:bg-muted transition"
          >
            <ArrowLeft className="h-5 w-5 text-secondary" />
          </button>
          <div className="flex-1 text-center font-bold text-secondary truncate">서비스 소개</div>
          <Link to="/" className="flex h-11 w-11 items-center justify-center">
            <div className="h-8 w-8 rounded-xl gradient-sunset flex items-center justify-center font-black text-white text-sm">Y</div>
          </Link>
        </div>
      </header>
      <MarketingSections />
    </div>
  );
}