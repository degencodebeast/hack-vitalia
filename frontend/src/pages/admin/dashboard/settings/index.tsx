'use client';

import DashboardSideBar from '@/components/dashboard-sidebar';
import { Box } from '@chakra-ui/react';
import AdminDashBoardLayout from '../layout';

export default function DashBoard() {
  
  return (
    <AdminDashBoardLayout>

    <Box className='min-h-full h-full'>
      {/* <DashboardSideBar links={navLinks} /> */}
    </Box>
    </AdminDashBoardLayout>
  );
}
