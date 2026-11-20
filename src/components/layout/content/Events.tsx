import { Heading } from '@/components/ui/Heading';
import Circle from '@/assets/circle.svg';

export function Events() {
  return (
    <div className="w-full rounded-3xl bg-background md:px-12.5 px-4 py-7.5 shadow-[0_0_50px_0_#00000040] md:mb-20 mt-10 md:mt-0 mb-7">
      <Heading className="mb-2 text-foreground">События</Heading>
      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2 md:gap-4 border-b-[1.5] border-border py-2 md:px-5 px-2 last:border-b-0 hover:bg-border/10 hover:rounded-md cursor-pointer">
            <Circle className="w-3 h-3 shrink-0 flex-none"/>
            <p className="text-foreground truncate min-w-0">
              Статус · Название монитора · Что произошло · сколько назад
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
