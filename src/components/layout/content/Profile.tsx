import { Button } from "@/components/ui/button/Button";
import { Heading } from "@/components/ui/Heading";

export function Profile() {
  return (
    <div className="mx-auto rounded-3xl bg-background max-w-100 px-12.5 py-7.5 shadow-[0_0_50px_0_#00000040] w-full md:mb-15 mb-7 mt-10 md:mt-0">
      <Heading className="md:mb-5 mb-7 text-foreground">Мой профиль</Heading>
      <div className="flex justify-center">
        <div className="size-37.5 rounded-full bg-white/80 shadow-[0_0_15px_0_#00000030]" />
      </div>

      <div className="mt-6 flex flex-col text-lg gap-4">
        <div>
          <h3 className="text-foreground font-medium">Имя пользователя</h3>
          <p className="mt-1 text-border">Иван</p>
        </div>

        <div>
          <h3 className="text-foreground font-medium">Почта</h3>
          <p className="mt-1 text-border">ivanov@mail.ru</p>
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full mt-15 rounded-[14px]">
        Редактировать
      </Button>
    </div>
  );
}
