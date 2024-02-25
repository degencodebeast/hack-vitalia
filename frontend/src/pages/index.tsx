'use client';
import Header from '@/components/header';
import Hero from '@/components/hero';
import WhatWeDo from '@/components/what-we-do';
import WorkWithUs from '@/components/work-with-us';
import TalkToNutritionist from '@/components/talk-to-nutritionist';
import CTA from '@/components/cta';
import Footer from '@/components/footer';
import { useDisclosure } from '@chakra-ui/react';
import RegisterForm from '@/components/register-form';
import 'swiper/css';
import BlogSection from '@/components/blog-section';

const App = () => {
  return (
    <div className='bg-primaryBeige min-h-screen'>
      <div className='px-4 lg:px-8 w-full'>
        <Header />
      </div>
      <div className=' h-7 bg-[#EEC438]' />
      <Hero />
      <div className='px-4 lg:px-8'>
        <WhatWeDo />
      </div>
      <WorkWithUs />
      <TalkToNutritionist />
      <CTA />
      <BlogSection/>
      <Footer />
    </div>
  );
};

// export const getServerSideProps = async () => {
//   const response = await fetch("https://api.huddle01.com/api/v1/create-room", {
//     method: "POST",
//     body: JSON.stringify({
//       title: "Huddle01 Room",
//     }),
//     headers: {
//       "Content-type": "application/json",
//       "x-api-key": process.env.HUDDLE_API_KEY || "",
     
//     },
//   });

//   const data = await response.json();

//   const roomId = data.data.roomId;

//   return {
//     redirect: {
//       destination: `/${roomId}`,
//       permanent: false,
//     },
//   };
// };

export default App;
