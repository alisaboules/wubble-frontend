import { PUBLIC_PAGE } from '@/config/public-page.config';
import { authService } from '@/services/auth.services';
import type { TAuthFormData } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';
import reCAPTCHA from 'react-google-recaptcha';
import type { SubmitHandler, UseFormReset, UseFormSetError } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setAuthData } from '@/store/auth.slice';
import { useAppDispatch } from '@/store';

export function useAuthForm(type: 'login' | 'register', reset: UseFormReset<TAuthFormData>, setError: UseFormSetError<TAuthFormData>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const recaptchaRef = useRef<reCAPTCHA>(null);

  const { mutateAsync, isPending: isAuthPending } = useMutation({
    mutationKey: [type],
    mutationFn: async ({
      data,
      recaptchaToken,
    }: {
      data: TAuthFormData;
      recaptchaToken: string;
    }) => {
      await authService.main(type, data, recaptchaToken);
      if (type === 'login') {
        const { data: user } = await authService.getMe();
        dispatch(setAuthData(user));
        return user;
      }
    },
  });

  const onSubmit: SubmitHandler<TAuthFormData> = ({ username, email, password }) => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      toast.error('Pass the captcha!', {
        id: 'recaptcha',
      });
      return;
    }

    toast.promise(mutateAsync({ data: { email, password, username }, recaptchaToken: token }), {
      loading: 'Loading...',
      success: () => {
        startTransition(() => {
          reset();
          router.push(PUBLIC_PAGE.HOME);
        });
        return 'Success login!';
      },
      error: (e) => {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 409) {
            setError('email', {
              type: 'server',
              message: 'Пользователь с такой почтой уже существует.',
            });
            return ' ';
          }
          if (e.response?.data?.code === 'invalid_recaptcha') {
            recaptchaRef.current?.reset();
            return 'Проверка CAPTCHA не пройдена. Попробуйте ещё раз.';
          }
          return e.response?.data?.message || 'Произошла ошибка.';
        }

        return 'Произошла неизвестная ошибка.';
      },
    });
  };

  const isLoading = isPending || isAuthPending;

  return {
    onSubmit,
    recaptchaRef,
    isLoading,
  };
}
