import { maskHexAddress } from '@/helpers';
import { Button, HStack, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import Avatar from 'boring-avatars';
import Icon from '../Icon';
import { useAppContext } from '@/context/state';
import LogoutButton from '../LogoutButton';
import isEmpty from 'just-is-empty';
export default function DashBoardHeader(props: any) {
  const { address } = useAccount();
  const { user, ensName } = useAppContext();
  return (
    <div className='flex items-center justify-between w-full bg-white py-2  px-4'>
      <Text
        as={'span'}
        fontSize={{ lg: 'xl', base: 'lg' }}
        fontWeight={'semibold'}
        className='text-primaryGreen '
      >
        Welcome back
      </Text>
      <div className='flex items-center gap-3'>
        <HStack mr={4}>
          <Avatar
            variant='beam'
            colors={['#928D26', '#1A6A7C', '#00AB3D', '#3371B4', '#0A20D90']}
          />
          {!isEmpty(address) && (
            <Text fontWeight={'semibold'} className='text-primaryGreen '>
              {/* {maskHexAddress(user?.userAddress as string)} */}
              {maskHexAddress((address as string) || '')}
              {/* {ensName} */}
            </Text>
          )}
        </HStack>
        <LogoutButton />
      </div>
    </div>
  );
}
