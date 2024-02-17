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
  Tr,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay, useDisclosure, Stack, FormControl, Input, Select, Textarea, FormLabel, FormHelperText, HStack, useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { format } from 'date-fns';
import NutritionistDashBoardLayout from '../layout';
import { useState } from 'react';
import { MealPlan } from '@/types/shared';
import {v4 as uuid} from 'uuid'
import { useAppContext } from '@/context/state';
import { shortenText } from '@/helpers';

export default function DashBoard() {
  const today = new Date().getTime();
const {isOpen,onClose,onOpen}=useDisclosure();
const [isSubmitting,setIsSubmitting]=useState(false)
const {user,mealPlans,setMealPlans}=useAppContext()
 const toast = useToast({
    duration: 3000,
    position: 'top',
    status: 'success',
    title: 'Meal Plan added successfully',
  });
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Field is required'),
    time: Yup.string().required('Field is required'),
    details: Yup.string().required('Field is required')
    
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState,reset,setValue } = useForm(formOptions);
  const { errors, isValid} = formState;
  const onValidSubmit=(data:any)=>{
if(isValid){
const dataObject={
  id:uuid(),
  title:data?.title,
  time:data?.time,
  details:data?.details,createdAt:new Date().getTime(),
  userAddress:user?.userAddress
}
console.log('meal plan',{dataObject})
setIsSubmitting(true);
setTimeout(()=>{
  setIsSubmitting(false)
  
  const prevPlans=mealPlans||[];
  setMealPlans([...prevPlans,dataObject])
toast()
  reset()
  onClose()
},3000)
}
  }


  function editMealPlan(plan:MealPlan){
    onOpen()
setValue('time',plan.time) 
setValue('title',plan.title)
setValue('details',plan.details)
  }
  return (
    <NutritionistDashBoardLayout>

<Modal isOpen={isOpen} onClose={()=>{onClose();reset()}} size={'lg'} closeOnOverlayClick={false}>
<ModalOverlay/>
  <ModalContent>

<ModalHeader>
  <Heading as='h3' size='lg'> Add a New Plan</Heading>
</ModalHeader>
  <ModalCloseButton />

<ModalBody mb={5}>

  <FormControl as={'form'} onSubmit={handleSubmit(onValidSubmit)}>
    <Stack spacing='2'>

    <Box>
<FormLabel htmlFor='meal-title'>Meal Title</FormLabel>
    <Input id={'meal-title'}  placeholder='Meal Title' {...register('title')} />
    <Text my={2} color='red.600'>{errors.title?.message}</Text>
    </Box>
    <Box>

      <FormLabel htmlFor='meal-time'>Choose Meal Time</FormLabel>
    <Select id='meal-time' defaultValue={''} {...register('time')} >
      <option value="" disabled></option>
      <option value="Breakfast">Breakfast</option>
      <option value="Lunch">Lunch</option>
      <option value="Dinner">Dinner</option>
    </Select>
    <Text my={2} color='red.600'>{errors.time?.message}</Text>

    </Box>

<Box>
  <HStack justify={'space-between'} mb={2}>

<FormLabel htmlFor='meal-details'>Details about this Meal:</FormLabel><Text color={'gray.500'} as={'em'} fontSize={'small'}>*markdown supported*</Text>
  </HStack>
    <Textarea minH={120} maxH={250} id='meal-details' {...register('details')} placeholder='Write a well detailed information about this meal...'>

    </Textarea>
    <Text my={2} color='red.600'>{errors.details?.message}</Text>

</Box>
<Button type='submit' mt={3} isLoading={isSubmitting}>Create Plan</Button>
    </Stack>
  </FormControl>

</ModalBody>
  </ModalContent>
</Modal>
    <Box className='min-h-full h-full px-4 mt-6'>
      <Flex align={'center'} justify={'space-between'}>
        <Flex align={'center'} gap={6}>
          <Heading size={'lg'} className='text-primaryGreen'>
            Meal Plans
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
          Create Meal Plan
        </Button>
      </Flex>

{!mealPlans?.length &&

<Flex bg={'gray.100'} minH={'250px'} my={5} justify={'center'} align={'center'}>
  <Text color={'gray.500'} fontWeight={'medium'} fontSize={'xl'}>You don&apos;t any meal plan yet.</Text>
</Flex>
}
{mealPlans?.length &&

      <TableContainer my={6}>
        <Table>
          <Thead bg={'white'} className='mb-4'>
            <Tr>
              <Th>Time</Th>
              <Th>Meal Name</Th>
              <Th>Details</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mealPlans?.map((mealPlan)=>
             <Tr key={mealPlan?.id} bg={'white'} rounded={'md'} my={4}>
             <Td>{mealPlan?.time}</Td>
             <Td>{mealPlan?.title}</Td>
             <Td minW={'300'} maxW={400}>
              {shortenText(mealPlan?.details||'')}
             </Td>
             <Td>
               <Flex gap={2}>
                 <Button
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
                   className='text-primaryGreen' onClick={()=>editMealPlan(mealPlan)}
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
}
    </Box>
    
    </NutritionistDashBoardLayout>

  );
}
