import { cookies } from 'next/headers';
import type { Tab } from '@/components/layout/content/Navigation';
import Dashboard from './Dashboard';

const TABS: Tab[] = ['monitors', 'profile', 'menu'];
export const instant = false;

export default async function Page() {
  const saved = (await cookies()).get('activeTab')?.value as Tab | undefined;
  const initialTab = saved && TABS.includes(saved) ? saved : 'monitors';

  return <Dashboard initialTab={initialTab} />;
}