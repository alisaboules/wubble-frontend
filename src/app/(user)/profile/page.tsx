import { Profile } from '@/components/layout/content/Profile';
import { TopBar } from '@/components/layout/topbar/Topbar';

export default function ProfilePage() {
  return (
    <div className="hidden md:flex mx-auto mt-20 w-full max-w-5xl flex-col gap-1">
      <TopBar />
      <Profile />
    </div>
  );
}
