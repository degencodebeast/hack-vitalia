import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Tr,
  ResponsiveValue,
} from '@chakra-ui/react';
import NutritionistDashBoardLayout from '../layout';
import Head from 'next/head';
import { Link } from '@chakra-ui/next-js';
import { useGetArticlesQuery } from '@/state/services';
import { removeKeyFromObject, selectObjectKeys } from '@/utils';
import { Article } from '@/types/shared';
import TableItems from '@/components/TableItems';

export default function ArticlesDashBoard() {
  const { data, isLoading, isFetching } = useGetArticlesQuery({ s: 'all' });
  const _data = removeKeyFromObject(data?.data as Article[], ['author']);
  const tableHeadStyles = {
    // pb: 4,
    fontSize: '16px',
    fontWeight: 'medium',
    textTransform: 'uppercase' as ResponsiveValue<'capitalize'>,
    // color: '#9CA4AB',
  };
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
          <Box
            my={8}
            maxW={'full'}
            minW={{ xl: '350px', base: '100%' }}
            px={5}
            py={4}
            w={{ base: 'full' }}
            flex={1}
            alignSelf={'flex-start'}
            // h={"442px"}
            border={'1px'}
            borderColor={'gray.300'}
            rounded={'14px'}
            bg={'white'}
            //   pos={"relative/"}
          >
            <TableContainer>
              <Table>
                <Thead>
                  <Tr
                    h={'auto'}
                    borderBottom={'2px'}
                    borderBottomColor={'gray.100'}
                  >
                    {_data &&
                      selectObjectKeys(_data[0]).map((key, i) => {
                        return (
                          <Th key={'article-' + key} {...tableHeadStyles}>
                            {key}
                          </Th>
                        );
                      })}
                    <Th {...tableHeadStyles}>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody className='files-table-body'>
                  {_data &&
                    _data.map((d, i) => (
                      <Tr key={'data' + i}>
                        <TableItems dataItem={d} />
                        <Td>
                          <HStack>
                            <Button
                              href={'/blog/article/' + d.slug}
                              variant={'outline'}
                              as={Link}
                              textDecor={'none'}
                              rounded={'full'}
                            >
                              View
                            </Button>
                            <Button
                              href={'./articles/edit?pid=' + d.id}
                              variant={'outline'}
                              as={Link}
                              textDecor={'none'}
                              rounded={'full'}
                            >
                              Edit
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        ;
      </NutritionistDashBoardLayout>
    </>
  );
}

export function FilesTable() {
  type Status = 'Paid' | 'Refund';
  const data = [
    {
      name: 'Marcus Bergson',
      date: 'Nov 15, 2023',
      amount: '$80,000',
      status: 'Paid',
      image: '/images/guy.jpg',
    },
    {
      name: 'Jaydon Vaccaro',
      date: 'Nov 15, 2023',
      amount: '$150,000',
      status: 'Refund',
      image: '/images/lady2.jpg',
    },
    {
      name: 'Corey Schleifer',
      date: 'Nov 14, 2023',
      amount: '$87,000',
      status: 'Paid',
      image: '/images/lady3.jpg',
    },
    {
      image: '/images/lady1.jpg',
      name: 'Cooper Press',
      date: 'Nov 14, 2023',
      amount: '$100,000',
      status: 'Refund',
    },
    {
      name: 'Phillip Lubin',
      date: 'Nov 13, 2023',
      amount: '$78,000',
      status: 'Paid',
      image: '/images/guy2.jpg',
    },
  ];
  const statusColor = (status: Status) =>
    status === 'Paid' ? 'appGreen' : 'appRed';
  const tableHeadStyles = {
    pb: 4,
    textTransform: 'capitalize' as ResponsiveValue<'capitalize'>,
    fontSize: '16px',
    fontWeight: 'medium',
    color: '#9CA4AB',
  };
  return (
    <Box
      maxW={'806px'}
      minW={{ xl: '350px', base: '100%' }}
      px={5}
      py={4}
      w={{ base: 'full' }}
      flex={1}
      alignSelf={'flex-start'}
      // h={"442px"}
      border={'1px'}
      borderColor={'strokeColor'}
      rounded={'14px'}
      bg={'white'}
      //   pos={"relative/"}
    >
      <TableContainer>
        <Table>
          <Thead mb={5}>
            <Tr h={'auto'}>
              <Th paddingInlineStart={0} {...tableHeadStyles}>
                Name
              </Th>
              <Th {...tableHeadStyles}>Date</Th>
              <Th {...tableHeadStyles}>Amount</Th>
              <Th {...tableHeadStyles}>Status</Th>
              <Th {...tableHeadStyles}>Invoice</Th>
            </Tr>
          </Thead>
          <Tbody className='files-table-body'>
            {data.map((d, i) => (
              <Tr key={'data' + i}>
                <Td paddingInlineStart={0}>
                  <HStack gap={'10px'}>
                    <Image
                      alt=''
                      src={d.image}
                      objectFit={'cover'}
                      w={8}
                      h={8}
                      rounded={'34px'}
                      flexShrink={0}
                    />
                    <Text as={'span'} fontWeight={'medium'} fontSize={'16px'}>
                      {d.name}
                    </Text>
                  </HStack>
                </Td>
                <Td color={'appGray.500'}>{d.date}</Td>
                <Td fontWeight={'medium'}>{d.amount}</Td>
                <Td color={statusColor(d.status as Status)}>{d.status}</Td>
                <Td>
                  <Button
                    variant={'ghost'}
                    color={'#0D062D'}
                    fontWeight={'normal'}
                    fontSize={'14px'}
                    gap={'6px'}
                    // h="auto"
                  >
                    <Image alt='' src='/icons/document-download.svg' />{' '}
                    <span>View</span>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
