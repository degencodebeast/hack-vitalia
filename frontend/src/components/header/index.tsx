'use client';

import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/next-js';

import { useAppContext } from '@/context/state';
import RegisterForm from '../register-form';
import { useAccount, useEnsName, useEnsAvatar } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, HStack, Image, Text, useDisclosure } from '@chakra-ui/react';
import LogoutButton from '../LogoutButton';

const Header = ({ bg = 'transparent' }: { bg?: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setAddress, setEnsName, user } = useAppContext();

  const { address } = useAccount();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  // const { data: ensName } = useEnsName({
  //   address: address,

  //   chainId: 421613,
  // });

  // const { data: ensAvatar } = useEnsAvatar({
  //   name: ensName,
  //   chainId: 421613,
  // });

  useEffect(() => {
    setAddress(`${address}`);
    //setEnsName(ensName);
  }, [address, setAddress]);

  const isLoggedin = () => user && user?.userAddress !== '';
  return (
    <>
      <header
        className={`bg-${bg} px-2 pr-4 max-w-[1300px] w-full py-1 flex justify-between items-center mx-auto`}
      >
        <div>
          <Link href={'/'} textDecor={'none'}>
            <Image alt='Logo' src='/images/svg/app-logo.svg' />
          </Link>
        </div>
        <HStack spacing={4}>
          <Text as={Link} href={'/'} fontWeight={'medium'}>
            Home
          </Text>
          <Text as={Link} href={'/blog'} fontWeight={'medium'}>
            Blog
          </Text>
          <Text as={Link} href={'/meal-plans'} fontWeight={'medium'}>
            Meal Plans
          </Text>
        </HStack>
        {/* {isLoggedin() && <LogoutButton/>} */}
        {address && !isLoggedin() && (
          <HStack spacing={4}>
            <Button
              colorScheme='primaryColor'
              variant={'outline'}
              onClick={() => onOpen()}
            >
              Login
            </Button>
            <Button
              colorScheme='primaryColor'
              variant={'solid'}
              onClick={() => onOpen()}
            >
              Register
            </Button>
          </HStack>
        )}
        {!address && (
          <Button size={'lg'} onClick={openConnectModal}>
            Connect Wallet
          </Button>
        )}
        {/* <ConnectKitButton /> */}
      </header>
      <RegisterForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
