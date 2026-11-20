import { Heading } from "@/components/ui/Heading";
import { USER_PAGE } from "@/config/user-page.config";
import { Plus } from "lucide-react";
import Link from "next/link";


export function MyMonitors() {
  return (
    <div className="w-full rounded-3xl bg-background px-12.5 py-7.5 shadow-[0_0_50px_0_#00000040] md:mb-15 mb-7 mt-10 md:mt-0">
      <Heading className="md:mb-5 mb-7 text-foreground">Мои мониторы</Heading>

      <div className="flex flex-wrap gap-6 cursor-pointer items-center flex-col md:flex-row">
        <Link href={USER_PAGE.MONITOR} className="h-30 w-50 rounded-[20px] bg-background p-4 shadow-[0_0_15px_0_#00000030] transition-shadow hover:shadow-[0_0_20px_0_#00000040]">
          <h3 className="text-lg font-medium text-foreground">Монитор 1</h3>
          <p className="mt-2.5 text-foreground leading-none">Описание первого монитора...</p>
        </Link>

        <div className="h-30 w-50 rounded-[20px] bg-background p-4 shadow-[0_0_15px_0_#00000030] transition-shadow hover:shadow-[0_0_20px_0_#00000040]">
          <h3 className="text-lg font-medium text-foreground">Монитор 2</h3>
          <p className="mt-2.5 text-foreground leading-none">Описание второго монитора...</p>
        </div>

        <button className="flex h-30 w-50 items-center justify-center rounded-[20px] bg-background text-4xl font-light text-foreground shadow-[0_0_15px_0_#00000030] transition-shadow hover:shadow-[0_0_20px_0_#00000040]">
          <Plus className="size-13 stroke-[1.25]" />
        </button>
      </div>
    </div>
  );
}
