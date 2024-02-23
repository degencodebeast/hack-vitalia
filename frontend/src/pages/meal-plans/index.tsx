'use client'

import Icon from "@/components/Icon"
import { useAppContext } from "@/context/state"
import { shortenText } from "@/helpers"
import { MealPlan } from "@/types/shared"
import { Box, Button, Flex, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"


const MealPlansPage = () => {
    const [btnIcon,setBtnIcon]=useState('bookmark_add')
    const {mealPlans}=useAppContext();
    const handleAddMealPlan=(plan:MealPlan)=>{
setBtnIcon('done')
        setTimeout(()=>{
            setBtnIcon('bookmark_add')
        },2000)
    }
  return (
   <Box className="bg-primaryBeige" >
    <Stack direction={'row'} px={{lg:6,base:4}} py={8} wrap={'wrap'} spacing={{base:4,lg:6}} mx={'auto'} maxW={1200} bg={'gray.100'}>

    {mealPlans && mealPlans?.map((plan)=>
    
<Stack key={plan?.id} rounded={'lg'} boxShadow={'md'} bg={'white'} minH={'200px'} p={3} maxW={300} gap={4}>
<Box h={'150px'} bg={'gray.200'} roundedTop={'md'} overflow={'hidden'} pos={'relative'}>
    <Box pos={'absolute'} roundedRight={'md'} left={0} bottom={0} bg={'primaryColor.700'} color={'white'} px={3} py={2}>
<Text as={'span'} fontWeight={'bold'}>{plan?.time}</Text>
    </Box>
<Image alt="" h={'full'} w={'full'} src="/images/meal-plan.jpg"/>
</Box>
<Box>
    <Heading size={'md'}>{plan?.title}</Heading>

    <Text mt={3}>{shortenText(plan?.details,100)}</Text>
</Box>
<HStack spacing={'6'} flex={1}>

    <Button rounded={'full'} size={'sm'} variant='outline'  gap={'3'} ><Icon name="visibility" size={20}/> <span>
        View plan
        </span> 
        </Button>
    <Button rounded={'full'} onClick={()=>handleAddMealPlan(plan)} size={'sm'} gap={3} ><Icon name={btnIcon} size={20}/> <span>
        Add to list
        </span> 
        </Button>
</HStack>
</Stack>
    )}
    </Stack>
   </Box>
  )
}

export default MealPlansPage