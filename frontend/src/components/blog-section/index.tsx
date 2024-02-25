import {
  Box,
  Flex,
  HStack,
  Heading,
  LinkBox,
  Stack,
  Text,
  Image,
  Skeleton,
  LinkOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ArticleCard from '../article';
import { useGetArticlesQuery } from '@/state/services';
import { Article } from '@/types/shared';

const BlogSection = () => {
  const { data, isFetching, isLoading } = useGetArticlesQuery({});
  const articles = data?.data as Article[];
  return (
    <Box as='section' my={12} mx={'auto'}>
      <Heading
        textTransform={'uppercase'}
        color={'primaryColor.800'}
        size={'2xl'}
        my={6}
        textAlign={'center'}
      >
        Our Blog
      </Heading>

      <HStack
        wrap={'wrap'}
        align={'initial'}
        justify={'initial'}
        gap={4}
        mx={'auto'}
        maxW={'1200px'}
        my={6}
        p={4}
        // px={{ base: 3, lg: 0 }}
      >
        {(isFetching || isLoading) && (
          <Flex wrap={'wrap'} gap={5}>
            {[0, 0, 0, 0].map((s, i) => (
              <Skeleton
                key={'skelon' + i}
                w={300}
                h={350}
                rounded={'sm'}
              ></Skeleton>
            ))}
          </Flex>
        )}
        {!isLoading &&
          articles?.length &&
          articles.map((article) => (
            <ArticleCard key={article?.id} article={article} />
          ))}
      </HStack>
    </Box>
  );
};

export default BlogSection;
