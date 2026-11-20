'use client';

import { Logo } from '@/components/layout/content/Logo';
import { MyMonitors } from '@/components/layout/content/MyMonitors';
import { NavigationMenu, Tab } from '@/components/layout/content/Navigation';
import { Events } from '@/components/layout/content/Events';
import { useState } from 'react';
import { TopBar } from '@/components/layout/topbar/Topbar';
import { Profile } from '@/components/layout/content/Profile';

export default function Dashboard({ initialTab }: { initialTab: Tab }) {
   const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    document.cookie = `activeTab=${tab}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <>
      <div className="hidden md:flex mx-auto mt-20 w-full max-w-5xl flex-col gap-1">
        <TopBar />
        <MyMonitors />
        <Events />
      </div>

      <div className="flex md:hidden w-full flex-col items-center justify-center my-10">
        <Logo />
        {activeTab === 'monitors' && <MyMonitors />}

        {activeTab === 'profile' && <Profile />}

        {activeTab === 'menu' && <Events />}

        <NavigationMenu activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </>
  );
}