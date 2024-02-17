'use client';
import DashBoardHeader from '@/components/dashboard-header';
import DashboardSideBar from '@/components/dashboard-sidebar';
import { ReactNode } from 'react';

export default function AdminDashBoardLayout({ children }: { children: ReactNode }) {
  const navLinks = [
    { url: 'overview', title: 'Overview', icon: 'dashboard' },
    { url: 'communities', title:'Communities', icon: 'group' },
    { url: 'articles', title: 'Articles', icon: 'book' },
    // { url: 'appointments', title: 'Appointments', icon: 'book_online' },
    { url: 'settings', title: 'Settings', icon: 'settings' },
  ];
  return (
    <div className='flex max-w-[1350px] mx-auto my-0 h-[100dvh] max-h-[750px] min-h-[700px] bg-primaryBeige'>
      <DashboardSideBar links={navLinks} entryPath='/admin/dashboard/' />
      <div className=' flex-1 pb-20 overflow-y-auto'>
        <DashBoardHeader />

        {children}
      </div>
    </div>
  );
}
