import Monitors from '@/assets/monitors.svg';
import Menu from '@/assets/menu.svg';
import UserCircle from '@/assets/userCircle.svg';
import { cn } from '@/utils/cn';

export type Tab = 'monitors' | 'profile' | 'menu';

type NavigationMenuProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export function NavigationMenu({ activeTab, onTabChange }: NavigationMenuProps) {
  return (
    <div className="rounded-3xl bg-background flex gap-5 px-12 py-5 shadow-[0_0_50px_0_#00000040] items-center text-border">
      <button onClick={() => onTabChange('monitors')}>
        <Monitors className={cn(activeTab === 'monitors' && 'text-foreground') } />
      </button>
      <button onClick={() => onTabChange('profile')}>
        <UserCircle className={cn('size-15', activeTab === 'profile' && 'text-foreground')} />
      </button>
      <button onClick={() => onTabChange('menu')}>
        <Menu className={cn(activeTab === 'menu' && 'text-foreground') } />
      </button>
    </div>
  );
}