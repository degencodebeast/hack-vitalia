import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useGetArticleQuery } from '@/state/services';
import { Article } from '@/types/shared';
import {
  Box,
  HStack,
  Text,
  Avatar,
  Heading,
  Image,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import Head from 'next/head';
import { usePathname, useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ArticleView = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, isFetching } = useGetArticleQuery(slug as string);
  const article = data?.data;

  return (
    <>
      <Head>
        <title>{article?.title}</title>
      </Head>
      <Box bg={'secondaryColor.100'}>
        <Box
          bg={'white'}
          maxW={'1200px'}
          mx={'auto'}
          minH={'100vh'}
          px={{ lg: 6, base: 4 }}
          py={6}
        >
          <Box maxW={'1000px'} mx={'auto'}>
            <HStack my={4} spacing={'4'} mb={8}>
              <Avatar size={'lg'} src={article?.author?.avatar} />
              <HStack divider={<DotDivider />}>
                <Text as={'strong'} fontSize={'large'}>
                  {article?.author?.fullName}
                </Text>{' '}
                <Text
                  as={'time'}
                  fontWeight={'medium'}
                  fontSize={'sm'}
                  color={'gray.600'}
                >
                  {article &&
                    format(
                      new Date(article?.createdAt as string),
                      'MMM dd, yyyy'
                    )}
                </Text>
              </HStack>
            </HStack>
            <Stack spacing={4} mb={6}>
              <Box>
                <Heading mb={5} as={'h1'}>
                  {article?.title}
                </Heading>
                {article?.intro && (
                  <Text color={'gray.600'} fontSize={'18px'} mb={1}>
                    {article?.intro}
                  </Text>
                )}
              </Box>
            </Stack>
          </Box>
          <Box>
            <Image
              w={'full'}
              bg={'gray.100'}
              alt=''
              src={article?.image || '/images/placeholder-image.png'}
              h={'auto'}
              // maxH={{ lg: 500, base: 400 }}
              // objectFit={'contain'}
            />
          </Box>
          <Box maxW={'1000px'} mx={'auto'}>
            <MarkdownRenderer markdown={article?.content as string} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const DotDivider = () => {
  return (
    <Flex align={'center'} justify={'center'} px={2}>
      <Box w={1} h={1} rounded={'full'} bg={'gray.300'}></Box>
    </Flex>
  );
};

export default ArticleView;
