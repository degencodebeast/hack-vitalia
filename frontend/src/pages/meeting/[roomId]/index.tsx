import ChatBox from '../../../components/video-chat-box/ChatBox';
import RemotePeer from '../../../components/remote-peer';
import { TPeerMetadata } from '../../../types/peerMetadata';
import {
  useLocalAudio,
  useLocalPeer,
  useLocalScreenShare,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from '@huddle01/react/hooks';
import { AccessToken, Role } from '@huddle01/server-sdk/auth';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/react';
import MatIcon from '@/components/Icon';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  token: string;
};

export default function Home() {
  const [displayName, setDisplayName] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const token = router.query.token as string;

  const { joinRoom, state } = useRoom({
    onJoin: (room) => {
      console.log('onJoin', room);
      updateMetadata({ displayName });
    },
    onPeerJoin: (peer) => {
      console.log('onPeerJoin', peer);
    },
  });
  const { enableVideo, isVideoOn, stream, disableVideo } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();
  const { startScreenShare, stopScreenShare, shareStream } =
    useLocalScreenShare();
  const { updateMetadata } = useLocalPeer<TPeerMetadata>();
  const { peerIds } = usePeerIds();

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (shareStream && screenRef.current) {
      screenRef.current.srcObject = shareStream;
    }
  }, [shareStream]);
  async function handleJoinRoom() {
    await joinRoom({
      roomId: router.query.roomId as string,
      token,
    });
    router.replace(`/meeting/${router.query.roomId}`);
  }
  return (
    <Box as='main'>
      {/* <p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
          <code className='font-mono font-bold'>{state}</code>
        </p> */}
      <Box className=''>
        {state === 'idle' && (
          <Flex my={10} py={10}>
            <Stack
              minW={300}
              gap={4}
              shadow={'md'}
              py={8}
              px={4}
              rounded={'md'}
            >
              <Input
                isDisabled={state !== 'idle'}
                placeholder='Enter Display Name'
                type='text'
                // className='border-2 border-blue-400 rounded-lg p-2 mx-2 bg-black text-white'
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />

              <Button
                isDisabled={!displayName}
                type='button'
                onClick={() => handleJoinRoom()}
              >
                Join Room
              </Button>
            </Stack>
          </Flex>
        )}
      </Box>
      {state === 'connected' && (
        <Flex
          py={8}
          h={'100vh'}
          maxW={1440}
          mx={'auto'}
          gap={4}
          maxH={'1100px'}
          justify={'space-between'}
          bg={'red.50'}
        >
          <Stack h={'full'} bg={'blackAlpha.100'} w={'full'}>
            <Flex pos={'relative'} gap={2} flex={1}>
              {isVideoOn && (
                <Box
                  rounded={'xl'}
                  top={2}
                  left={5}
                  pos={shareStream ? 'absolute' : 'relative'}
                  h={'full'}
                  // maxH={'1000px'}
                  maxW={shareStream ? '300px' : '100%'}
                  flex={1}
                >
                  <video
                    height={'100%'}
                    width={'100%'}
                    ref={videoRef}
                    className='aspect-video rounded-lg'
                    autoPlay
                    muted
                  />
                </Box>
              )}
              {!isVideoOn && <Box></Box>}
              {shareStream && (
                <Box>
                  <video
                    ref={screenRef}
                    height={'100%'}
                    width={'100%'}
                    className='aspect-video rounded-xl'
                    autoPlay
                    muted
                  />
                </Box>
              )}
            </Flex>
            {state === 'connected' && (
              <HStack gap={3} bg={'black'} p={3}>
                <Button
                  type='button'
                  rounded={'30px'}
                  bg={'gray.500'}
                  color={'white'}
                  aria-label='video enable or disable'
                  // className='bg-blue-500 p-2 mx-2 rounded-lg'
                  onClick={async () => {
                    isVideoOn ? await disableVideo() : await enableVideo();
                  }}
                >
                  {isVideoOn ? (
                    <MatIcon name='videocam' />
                  ) : (
                    <MatIcon name='videocam_off' />
                  )}
                </Button>
                <Button
                  type='button'
                  rounded={'30px'}
                  bg={'gray.500'}
                  color={'white'}
                  onClick={async () => {
                    isAudioOn ? await disableAudio() : await enableAudio();
                  }}
                >
                  {isAudioOn ? (
                    <MatIcon name='mic' />
                  ) : (
                    <MatIcon name='mic_off' />
                  )}
                </Button>
                <Button
                  type='button'
                  rounded={'30px'}
                  bg={'gray.500'}
                  color={'white'}
                  onClick={async () => {
                    shareStream
                      ? await stopScreenShare()
                      : await startScreenShare();
                  }}
                >
                  {shareStream ? (
                    <MatIcon
                      name='stop_screen_share
                    
                    '
                    />
                  ) : (
                    <MatIcon name='screen_share' />
                  )}
                </Button>
                <Button
                  type='button'
                  rounded={'30px'}
                  bg={'gray.500'}
                  color={'white'}
                  onClick={async () => {
                    const status = isRecording
                      ? await fetch(
                          `/api/stop-recording?roomId=${router.query.roomId}`
                        )
                      : await fetch(
                          `/api/start-recording?roomId=${router.query.roomId}`
                        );

                    const data = await status.json();

                    setIsRecording(!isRecording);
                  }}
                >
                  {isRecording ? (
                    <MatIcon name='stop_circle' />
                  ) : (
                    <MatIcon name='screen_record' />
                  )}
                </Button>
              </HStack>
            )}
          </Stack>
          <Box h={'full'}>
            {/* <div className='mt-8 mb-32 grid gap-2 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
            {peerIds.map((peerId) =>
              peerId ? <RemotePeer key={peerId} peerId={peerId} /> : null
            )}
          </div> */}
            {state === 'connected' && <ChatBox />}
          </Box>
        </Flex>
      )}
    </Box>
  );
}
