import { cn } from "@/utils/cn";
import type { CSSProperties } from "react"

interface Props {
  count?: number
  style?: CSSProperties
  className?: string
}

export function SkeletonLoader({ count=1, className='', style}: Props) {
  return (
    <>
    {Array.from({length: count}).map((_, index) => (
      <div key={index} style={style} className={cn('bg-border rounded-xl h-50 mb-2.5 animate-pulse', className)}/>
    ))}
    </>
  );
}