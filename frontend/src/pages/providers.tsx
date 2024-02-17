/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React from 'react';
// import { ChakraProvider } from '@chakra-ui/react';

import { AppWrapper } from '../context/state';
import ChakraProviders from '@/providers/chakra-provider';
import { PushProtocolProvider } from '@/context/pushContext';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    
    <AppWrapper>
      <PushProtocolProvider>
        <ChakraProviders>{children}</ChakraProviders>
      </PushProtocolProvider>
    </AppWrapper>
  );
}

export default Providers;
