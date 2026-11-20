'use client'

import UserCircle from '@/assets/userCircle.svg';
import Link from 'next/link';
import { USER_PAGE } from '@/config/user-page.config';
import { Logo } from '../content/Logo';
import { usePathname } from 'next/navigation';

export function TopBar() {
  const pathname = usePathname();
  const isProfilePage = pathname === USER_PAGE.PROFILE;
  return (
    <div className="flex justify-between items-center mb-10">
      <Logo />
       <Link
        href={isProfilePage ? USER_PAGE.DASHBOARD : USER_PAGE.PROFILE}
        className="flex gap-3 items-center bg-background px-6 py-4 rounded-3xl">
        <UserCircle className="size-12 text-foreground cursor-pointer" />
        <span className="text-foreground text-xl font-medium">{isProfilePage ? 'Мои мониторы' : 'Мой профиль'}</span>
      </Link>
    </div>
  );
}
