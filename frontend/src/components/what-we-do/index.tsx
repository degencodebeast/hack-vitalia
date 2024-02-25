import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

const WhatWeDo = () => {
  return (
    <section className='w-full flex flex-col py-20 max-w-[1074px] mx-auto items-center justify-center'>
      <Heading className='uppercase text-[#014421] text-lg font-bold pb-2 lg:text-[40px]'>
        What We do
      </Heading>
      <Text
        mb={4}
        maxW={700}
        fontWeight={500}
        fontSize={'lg'}
        className=' text-[#3C4142] text-center pb-4'
      >
        We are at the forefront of healthy living. We want to build healthy
        communities all around the world, we want these communities to form
        green zones in their regions, where people can live up to 100 years and
        become centenarians and live healthy, vital and fulfilling lives whilst
        still contributing to community.
      </Text>
      <Flex wrap={'wrap'} className='flex gap-5  lg:gap-16 text-[#3C4142]'>
        <Box minW={300} className='flex flex-col gap-2' flex={1} maxW={500}>
          <Box
            alignSelf={'center'}
            className='w-full relative  h-[250px] lg:h-[471px]'
          >
            <Image
              src={'/images/png/food.png'}
              w={'full'}
              h={'full'}
              objectFit='cover'
              alt='food'
            />
          </Box>
          <div className='flex flex-col w-full items-center justify-center lg:items-start gap-2'>
            <Heading as={'h3'} size={'md'} className='font-bold text-lg'>
              Meal Plans
            </Heading>
            <Text className=' text-sm lg:text-base w-full'>
              Learn to eat like the world&apos;s longest-lived people with the
              Rejuvenate Meal Planner. Savor delicious meals that are optimized
              for your life. Eat for wellness, vitality, and longevity. Make
              life simple, with easy-to-make, flavorful recipes.
            </Text>
          </div>
        </Box>
        <Box flex={1} minW={300} className='flex flex-col gap-2' maxW={500}>
          <Box
            alignSelf={'center'}
            className='w-full relative  h-[250px] lg:h-[471px]'
          >
            <Image
              w={'full'}
              h={'full'}
              src={'/images/png/excercise.png'}
              objectFit='cover'
              alt='food'
            />
          </Box>
          <div className='flex flex-col w-full items-center lg:items-start gap-2'>
            <Heading as={'h3'} size={'md'} className='font-bold text-lg'>
              Fitness
            </Heading>
            <p className='text-sm lg:text-base w-full'>
              Learn how to incorporate fitness into your daily routines
              naturally, so exercises don’t just feel like work anymore, so
              rather than separating fitness into a different part of your day.
              It’s built into your lifestyles subconsciously.
            </p>
          </div>
        </Box>
      </Flex>
    </section>
  );
};

export default WhatWeDo;
