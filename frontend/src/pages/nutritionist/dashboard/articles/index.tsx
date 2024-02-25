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
