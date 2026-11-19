
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function VerifiedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#0D1631]">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/4 p-8 text-center shadow-2xl">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2
            size={44}
            className="text-emerald-400"
          />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-white">
          Почта успешно подтверждена!
        </h1>

        <p className="mb-8 text-sm leading-relaxed text-gray-400">
          Ваш адрес электронной почты подтверждён.
          Теперь вы можете пользоваться всеми возможностями Wubble.
        </p>

        <Link
          href="/"
          className="flex w-full items-center justify-center rounded-xl bg-[#3FA9F5] px-6 py-3 font-semibold text-white transition hover:bg-[#2995E5]"
        >
          Вернуться на главную
        </Link>

        <p className="mt-6 text-xs text-gray-500">
          Спасибо, что выбрали Wubble!
        </p>
      </div>
    </main>
  );
}
