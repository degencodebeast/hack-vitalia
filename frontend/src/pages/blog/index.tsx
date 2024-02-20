'use client';

import Article from '@/components/article';
import Header from '@/components/header';
import { Box, HStack, Heading } from '@chakra-ui/react';
import Head from 'next/head';

const BlogPage = () => {
  const articles = [
    {
      id: 1,
      slug: 'article-1',
      title: 'Fitness Recipes: Healthy Food for any workout',
      intro: '',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',
      image: '/images/fruit.jpg',
    },
    {
      id: 2,
      slug: 'article-2',
      title: 'This may be the untold secret to longevity',
      intro: '',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',
      image: '/images/fruit.jpg',
    },
    {
      id: 3,
      slug: 'article-3',
      title: 'Walking leads to longer life, better outcomes.',
      intro: '',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',
      image: '/images/fruit.jpg',
    },
    {
      id: 4,
      slug: 'article-4',
      title: 'Walking leads to longer life, better outcomes.',
      intro: '',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',
      image: '/images/fruit.jpg',
    },
  ];
  return (
    <Box as='main' className='bg-primaryBeige min-h-screen'>
      <Head>
        <title>Rejuvenate AI | Blog</title>
      </Head>
      <Header />
      <Box maxW={'1200px'} mx={'auto'}>
        <Heading mt={5} mb={1}>
          Recent Post
        </Heading>
        <HStack
          wrap={'wrap'}
          gap={4}
          mx={'auto'}
          my={6}
          py={4}
          px={{ base: 3, lg: 0 }}
        >
          {articles.length &&
            articles.map((article) => (
              <Article key={article?.id} article={article} />
            ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default BlogPage;
