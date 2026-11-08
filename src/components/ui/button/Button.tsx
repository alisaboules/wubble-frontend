import { cn } from '@/utils/cn';

import type {
  ButtonHTMLAttributes,
  ReactNode
} from 'react';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'tertiary';
  className: string;
}

export function Button({
  children,
  isLoading,
  variant = 'primary',
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={cn(
        'py-2 px-5 font-medium rounded-2xl transition-colors', className,

        variant === 'primary' && [
          'bg-gpurple text-white',
          'hover:bg-[#8380F5]',
        ],

        variant === 'secondary' && [
          'bg-background text-gpurple',
          'hover:text-[#8380F5]',
        ],

        // variant === 'tertiary' && [
        //   'bg-quaternary text-white',
        //   'disabled:bg-quaternary',
        // ],
      )}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}