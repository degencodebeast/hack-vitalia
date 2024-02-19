'use client';

import DashboardSideBar from '@/components/dashboard-sidebar';
import { Box } from '@chakra-ui/react';
import NutritionistDashBoardLayout from '../layout';
import Head from 'next/head';

export default function DashBoard() {
  return <>
      <Head>
        <title>Dashboard | Fitness Plans</title>
      </Head>
  <NutritionistDashBoardLayout>

  <Box className='min-h-full h-full'></Box>;
  </NutritionistDashBoardLayout>
  </>
}
