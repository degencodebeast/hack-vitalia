import DashBoardHeader from '@/components/dashboard-header';
import DashboardSideBar from '@/components/dashboard-sidebar';
import { ReactNode } from 'react';

export default function NutritionistDashBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const navLinks = [
    { url: 'overview', title: 'Overview', icon: 'dashboard', child: [] },
    {
      url: 'meal-plans',
      title: 'Meal Plans',
      icon: 'fastfood',
      child: ['new'],
    },
    {
      url: 'fitness-plans',
      title: 'Fitness Plans',
      icon: 'exercise',
      child: ['new'],
    },
    { url: 'articles', title: 'Articles', icon: 'post_add', child: ['new'] },
    {
      url: 'appointments',
      title: 'Appointments',
      icon: 'book_online',
      child: [],
    },
    { url: 'settings', title: 'Settings', icon: 'settings', child: [] },
  ];
  return (
    <div className='flex max-w-[1400px] mx-auto my-0 h-[100vh] max-h-[750px] min-h-[700px] bg-primaryBeige'>
      <DashboardSideBar links={navLinks} entryPath='/nutritionist/dashboard/' />
      <div className=' flex-1 pb-20 overflow-y-auto'>
        <DashBoardHeader />

        {children}
      </div>
    </div>
  );
}
