'use client';

import { Button } from '@/components/ui/button/Button';
import { Field } from '@/components/ui/field/Field';
import { Heading } from '@/components/ui/Heading';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { useAuthForm } from '@/hooks/useAuthForm';
// import { useAuthForm } from '@/hooks/useAuthForm';
import type { TAuthForm } from '@/types/auth.types';

import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

export function Auth() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { resolvedTheme } = useTheme();

  console.log('Текущая тема:', resolvedTheme);
  const isDark = resolvedTheme === 'dark';
  const isLogin = searchParams.get('mode') === 'login';

  const setAuthMode = (login: boolean) => {
    router.replace(`/auth?mode=${login ? 'login' : 'register'}`);
  };
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<TAuthForm>({
    mode: 'onChange',
  });
  const type = isLogin ? 'login' : 'register';
  const { onSubmit, recaptchaRef, isLoading } = useAuthForm(type, reset);
  const [isCaptchaLoaded, setIsCaptchaLoaded] = useState(false);
  // useEffect(() => {
  //   const checkCaptcha = () => {
  //     const iframe = document.querySelector('.recaptcha iframe');

  //     if (iframe) {
  //       setIsCaptchaLoaded(true);
  //     }
  //   };

  //   checkCaptcha();

  //   const observer = new MutationObserver(checkCaptcha);

  //   observer.observe(document.body, {
  //     childList: true,
  //     subtree: true,
  //   });

  //   return () => observer.disconnect();
  // }, []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-x-hidden ">
      <div className="w-full md:w-1/2 lg:w-1/4 px-13.75 py-8.25 shadow-[0px_0px_50px_0px_#00000040] rounded-3xl bg-background flex-column justify-center">
        <Heading className="justify-center">{isLogin ? 'Вход' : 'Регистрация'}</Heading>

        {isLoading ? (
          <SkeletonLoader count={4} className={'h-10'} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <Field
                label="Имя пользователя"
                type="text"
                registration={register('name', {
                  required: 'Username is required.',
                  minLength: {
                    value: 3,
                    message: 'Минимум 3 символа.',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Максимум 20 символов.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'Допустимы только лат. буквы, цифры и _.',
                  },
                })}
                error={errors.name?.message}
                placeholder="Введите имя"
              />
            )}
            <Field
              label="Почта"
              type="email"
              registration={register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Введите корректный адрес почты.',
                },
              })}
              error={errors.email?.message}
              placeholder="Введите почту"
            />
            <Field
              label="Пароль"
              type="password"
              registration={register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов.',
                },
              })}
              error={errors.password?.message}
              placeholder="Введите пароль"
            />

            <div className="relative min-h-20 mb-4">
              {!mounted && <SkeletonLoader className="absolute inset-0 h-20" />}

              {mounted && (
                <ReCAPTCHA
                  key={isDark ? 'light' : 'dark'}
                  ref={recaptchaRef}
                  size="normal"
                  theme={isDark ? 'light' : 'light'}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                  className={isDark ? 'recaptcha1' : 'recaptcha2'}
                  hl="en"
                  onLoad={() => setIsCaptchaLoaded(true)}
                />
              )}
            </div>
            <div className="text-center">
              <Button isLoading={isLoading} type="submit" variant="primary" className="w-full">
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </div>
          </form>
        )}
        {isLogin ? (
          <div className="flex justify-center mt-5 items-center gap-2">
            <span className="text-border font-normal">Нет аккаунта?</span>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setAuthMode(false)}
              className={cn('py-0 px-0 font-normal')}>
              Регистрация
            </Button>
          </div>
        ) : (
          <div className="flex justify-center mt-5 items-center gap-2">
            <span className="text-border font-normal">Уже есть аккаунт?</span>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setAuthMode(true)}
              className={cn('py-0 px-0 font-normal')}>
              Войти
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
