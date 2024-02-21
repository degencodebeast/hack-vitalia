import { Box, Flex, Text, Button, Heading } from '@chakra-ui/react';
import NutritionistDashBoardLayout from '../layout';
import Head from 'next/head';
import { Link } from '@chakra-ui/next-js';

export default function ArticlesDashBoard() {
  return (
    <>
      <Head>
        <title>Dashboard | Articles</title>
      </Head>
      <NutritionistDashBoardLayout>
        <Box className='min-h-full h-full px-4 mt-6'>
          {' '}
          <Flex align={'center'} justify={'space-between'}>
            <Flex align={'center'} gap={6}>
              <Heading size={'lg'} className='text-primaryGreen'>
                Articles
              </Heading>{' '}
            </Flex>
            <Button
              as={Link}
              href={'articles/new'}
              className='bg-primaryGreen text-primaryBeige hover:bg-primaryYellowTrans hover:text-primaryGreen'
            >
              Create Post
            </Button>
          </Flex>
        </Box>
        ;
      </NutritionistDashBoardLayout>
    </>
  );
}
