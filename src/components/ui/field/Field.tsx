import { cn } from "@/utils/cn";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  label: string,
  error?: string,
  registration: UseFormRegisterReturn
}

export function Field({error, label, registration, ...props}: Props) {
  return (
    <div className="mb-4">
      <label>
        <span className="block text-foreground font-normal mb-2">{label}</span>
        <input className={cn('w-full py-2 px-2 border border-border bg-background rounded-2xl shadow-sm transition-colors focus:outline-none focus:ring-0 focus:border-border', error && 'border-red-500')}
        {...registration}
        {...props}/>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}