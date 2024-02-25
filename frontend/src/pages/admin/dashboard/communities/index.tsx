'use client';

import DashboardSideBar from '@/components/dashboard-sidebar';
import {
  Td,
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import {v4 as uuid} from 'uuid'
import { format } from 'date-fns';
import AdminDashBoardLayout from '../layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useState } from 'react';
import { useAppContext } from '@/context/state';
import { Community } from '@/types/state';
import { Router, useRouter } from 'next/router';
import { generateSlug, shortenText } from '@/helpers';



export default function CommunitiesTab() {
  const toast = useToast({
    duration: 3000,
    position: 'top',
    status: 'success',
    title: 'Community was successfully created',
  });
  const today = new Date().getTime();
  const {isOpen,onClose,onOpen}=useDisclosure();
const [isSubmitting,setIsSubmitting]=useState(false)
// const [formData,setFormData]=useState({title:'',time:'',details:''})
const router=useRouter()
const {communities,setCommunity,setCommunities}=useAppContext()
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Field is required').min(5),
    description: Yup.string().required('Field is required'),
    
    members:Yup.string().required('Field is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState,reset } = useForm(formOptions);
  const { errors, isValid} = formState;
  const onValidSubmit=(data:any)=>{
if(isValid){
setIsSubmitting(true)

const membersArray=data?.members?.split(',');
const dataObject:Community={description:data?.description,name:data?.name,cover:''
,  id:uuid(),members:membersArray,membersCount:membersArray?.length,slug:generateSlug(data?.name)
}
console.log({dataObject});
setTimeout(()=>{
  
  const prevCommunities=communities||[];
  setCommunities([...prevCommunities,dataObject])
setIsSubmitting(false)
toast()
  onClose();
  reset()
},3000)
}
  }

const handleCommView=(comm:Community)=>{
setCommunity(comm)
router.push('/community/'+comm?.slug)
}

  return (
    <AdminDashBoardLayout>

<Modal isOpen={isOpen} onClose={onClose} size={'xl'} closeOnOverlayClick={false}>
<ModalOverlay/>
  <ModalContent>

<ModalHeader>
  <Heading as='h3' size='lg'> Add a Community</Heading>
</ModalHeader>
  <ModalCloseButton />

<ModalBody mb={5}>

  <FormControl as={'form'} onSubmit={handleSubmit(onValidSubmit)}>
    <Stack spacing='2'>

    <Box>
<FormLabel htmlFor='comm-name'>Group Name</FormLabel>
    <Input id={'comm-name'}  placeholder='Group Name' {...register('name')} />
    <Text my={2} color='red.600'>{errors.name?.message}</Text>
    </Box>

<Box>
  <HStack justify={'space-between'} mb={2}>

<FormLabel htmlFor='comm-desc'>Group Description:</FormLabel>
  </HStack>
    <Textarea minH={100} maxH={250} id='comm-desc' {...register('description')} placeholder='Write a short description about this communty...'>

    </Textarea>
    <Text my={2} color='red.600'>{errors.description?.message}</Text>

</Box>
<Box>
  <HStack justify={'space-between'} mb={2}>

<FormLabel htmlFor='comm-members'>Members:</FormLabel><Text color={'gray.600'} as={'em'} fontSize={'small'}>*comma-seperated addresses*</Text>
  </HStack>
    <Textarea minH={100} maxH={250} id='comm-members' {...register('members')} placeholder='0x9d3ed9..., 0xde24ca...'>

    </Textarea>
    <Text my={2} color='red.600'>{errors.members?.message}</Text>

</Box>
<Button type='submit' mt={3} isLoading={isSubmitting}>Create </Button>
    </Stack>
  </FormControl>

</ModalBody>
  </ModalContent>
</Modal>

    <Box className='min-h-full h-full px-4 mt-6'>
      <Flex align={'center'} justify={'space-between'}>
        <Flex align={'center'} gap={6}>
          <Heading size={'lg'} className='text-primaryGreen'>
          Communities
          </Heading>{' '}
          <Text
            className='bg-primaryGreen text-white rounded-full py-1 px-4 '
            fontSize={'sm'}
            fontWeight={'semibold'}
          >
            {format(today, 'E, d MMM yyyy')}
          </Text>
        </Flex>
        <Button onClick={onOpen} className='bg-primaryGreen text-primaryBeige hover:bg-primaryYellowTrans hover:text-primaryGreen'>
          Create a Community
        </Button>
      </Flex>

      <TableContainer my={6} overflowX={'auto'} w={'100%'} >
        <Table>
          <Thead bg={'white'} className='mb-4'>
            <Tr>
              <Th>Group Name</Th>
              <Th>Description</Th>
              <Th>Members Count</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {communities?.map((_community)=>
             <Tr bg={'white'} key={'comm'+_community?.id} rounded={'md'} my={4}>

             <Td>{_community?.name}</Td>
             <Td>{shortenText(_community?.description)}</Td>
             <Td minW={'300'} maxW={400}>
             {_community?.membersCount}
             </Td>
             <Td>
               <Flex gap={2}>
                 <Button onClick={()=>handleCommView(_community)}
                   size={'sm'}
                   variant={'outline'}
                   rounded={'full'}
                   className='text-primaryGreen'
                 >
                   View
                 </Button>
                 <Button
                   size={'sm'}
                   variant={'outline'}
                   rounded={'full'}
                   className='text-primaryGreen'
                 >
                   Edit
                 </Button>
               </Flex>
             </Td>
           </Tr> 
            )}

          </Tbody>
        </Table>
      </TableContainer>
    </Box>
    </AdminDashBoardLayout>

  );
}
