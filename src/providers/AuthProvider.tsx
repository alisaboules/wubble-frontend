'use client'
import { useEffect } from 'react'
import { authService } from '@/services/auth.services'
import { useAppDispatch } from '@/store'
import { clearAuthData, setAuthData } from '@/store/auth.slice'

export function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await authService.getNewTokens();

        const { data: user } = await authService.getMe();

        dispatch(setAuthData(user));
      } catch {
        dispatch(clearAuthData());
      }
    };

    initAuth();
  }, [dispatch]);

  return null;
}