
'use client';

import type { ReactNode } from 'react';

import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';
import { ReduxProvider } from './ReduxProvider';


export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
