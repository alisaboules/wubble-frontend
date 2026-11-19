
"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { XCircle, LoaderCircle } from "lucide-react";
import { axiosClassic } from "@/api/axios";
import Link from "next/link";

type VerificationStatus = "loading" | "error";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const requestStarted = useRef(false);

  useEffect(() => {
    if (requestStarted.current) return;
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");
    if (!userId || !token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("error");
      setErrorMessage( "Ссылка подтверждения неполная или некорректная." );
      return;
    }

    requestStarted.current = true;

    const verifyEmail = async () => {
      try {
        await axiosClassic.post("/api/auth/verify-email", { userId, token });
        router.replace("/verified");
      } catch {
        setStatus("error");
        setErrorMessage( "Не удалось подтвердить почту. Возможно, ссылка недействительна или срок её действия истёк." );
      }
    };

    void verifyEmail();
  }, [searchParams, router]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-background/80 p-8 text-center shadow-[0_0_40px_rgba(0,0,0,0.15)]">
          <LoaderCircle size={48} className="mx-auto mb-6 animate-spin text-gblue" />
          <h1 className="mb-3 text-2xl font-semibold text-foreground">Подтверждаем почту</h1>
          <p className="text-sm text-foreground/70">Пожалуйста, подождите. Мы проверяем вашу ссылку подтверждения.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-background/80 p-8 text-center shadow-[0_0_40px_rgba(0,0,0,0.15)]">
        <XCircle size={48} className="mx-auto mb-6 text-red-400" />
        <h1 className="mb-3 text-2xl font-semibold text-foreground">Не удалось подтвердить почту</h1>
        <p className="mb-8 text-sm leading-relaxed text-foreground/70">{errorMessage}</p>
        <Link href="/" className="flex w-full items-center justify-center rounded-xl bg-gpurple px-6 py-3 font-semibold text-white transition hover:bg-gpurple/80">Вернуться на главную</Link>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background">
          <LoaderCircle size={48} className="animate-spin text-gblue" />
        </main>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
