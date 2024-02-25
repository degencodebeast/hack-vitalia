'use client';

import Icon from '@/components/Icon';
import Header from '@/components/header';
import { maskHexAddress, shortenText } from '@/helpers';
import { useGetMealPlansQuery, useGetUsersQuery } from '@/state/services';
import { MealPlan } from '@/types/shared';
import { Link } from '@chakra-ui/next-js';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import BoringAvatar from 'boring-avatars';
import isEmpty from 'just-is-empty';
import Head from 'next/head';
import { useState } from 'react';

const MembersPage = () => {
  const { isLoading, isFetching, data } = useGetUsersQuery({ t: 'all' });
  const users = data?.data;
  return (
    <>
      <Head>
        <title>Rejuvenate | Members</title>
      </Head>
      <Header />
      <Box className='bg-primaryBeige'>
        <Stack
          direction={'row'}
          px={{ lg: 6, base: 4 }}
          py={8}
          wrap={'wrap'}
          spacing={{ base: 4, lg: 6 }}
          mx={'auto'}
          maxW={1200}
          bg={'gray.100'}
        >
          {!isLoading &&
            !isEmpty(users) &&
            users?.map((user) => (
              <HStack
                key={user?.id}
                rounded={'lg'}
                boxShadow={'md'}
                bg={'white'}
                minH={'250px'}
                p={2}
                maxW={350}
                gap={4}
                pb={5}
              >
                <Box>
                  {user?.avatar ? (
                    <Avatar size={'md'} src={user?.avatar} />
                  ) : (
                    <BoringAvatar />
                  )}
                </Box>

                <Box>
                  <Heading size={'md'}>
                    {user?.fullName
                      ? user?.fullName
                      : maskHexAddress(user?.address)}
                  </Heading>

                  <HStack spacing={'6'} flex={1}>
                    <Button
                      as={Link}
                      href={'/members/'}
                      size={'sm'}
                      variant='outline'
                      gap={'3'}
                    >
                      <span>View Profile</span>
                    </Button>
                  </HStack>
                </Box>
              </HStack>
            ))}
        </Stack>
      </Box>
    </>
  );
};

export default MembersPage;
