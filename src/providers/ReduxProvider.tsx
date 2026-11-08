
'use client';

import { store } from '@/store';
import { Provider } from 'react-redux';
import { AuthInitializer } from './AuthProvider';
import type { ReactNode } from 'react';

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}
