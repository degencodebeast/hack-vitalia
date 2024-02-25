import { Box, Image } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as='footer' className='w-full bg-[#014421]' py={8}>
      <div className='max-w-[1300px] w-full px-4 flex justify-between items-center mx-auto'>
        <Image
          alt='Logo'
          src='/images/svg/
        yellow-logo.svg'
        />
      </div>
    </Box>
  );
};

export default Footer;
