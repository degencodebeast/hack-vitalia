import { Box } from '@chakra-ui/react';
import NutritionistDashBoardLayout from '../layout';
import Head from 'next/head';

export default function ArticlesDashBoard() {
  return (
    <>
      <Head>
        <title>Dashboard | Articles</title>
      </Head>
      <NutritionistDashBoardLayout>
        <Box className='min-h-full h-full'></Box>;
      </NutritionistDashBoardLayout>
    </>
  );
}
