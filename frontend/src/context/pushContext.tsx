// Import Push SDK & Ethers
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import * as ethers from 'ethers';
//import * as PushAPI from '@pushprotocol/restapi';
import { pushContextType } from '@/types/pushContext';
import { useAccount, useWalletClient } from 'wagmi';
//import { useEthersSigner, walletClientToSigner } from '@/hooks/useEthersSigner';
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
/* eslint-disable */
const pushContextDefaultValue: pushContextType = {
  pushProtocolUser: {},
  setPushProtocolUser: () => null,
  groupChats: [],
  setGroupChats: () => null,
  messages: [] as any,
  setMessages: () => null,
  sendPushGroupChat: () => null,
  initialize: () => null
}

type PushContextProviderProps = {
  children: React.ReactNode;
};


const PushProtocolContext = createContext<pushContextType>(
  pushContextDefaultValue
);

export function PushProtocolProvider({ children }: PushContextProviderProps) {
  const [pushProtocolUser, setPushProtocolUser] = useState<any>({});
  const [decryptedPGPKey, setDecryptedPGPKey] = useState<any>({});
  const [groupChats, setGroupChats] = useState<any>([]);
  const { data: walletClient, isError } = useWalletClient();
  const { address } = useAccount();
  const [messages, setMessages] = useState<any>({});
  const [chatId, setChatId] = useState<any>({});
  //const signer = useEthersSigner(421613 as unknown as undefined)

  // { chatId: [messages] }

  const initialize = async () => {
    // try {
    //   if (!pushProtocolUser) {
    //     //@ts-ignore
    //     const user: any = await PushAPI.initialize(signer as unknown as undefined, {
    //       env: CONSTANTS.ENV.PROD,
    //     });
    //     console.log('Created New Push User', user);
    //     setPushProtocolUser(user);
    //     return user;
    //   } else {
    //     throw new Error("User already exists, Don't create. ");
    //   }
    // } catch (e) {
    //   setPushProtocolUser(null);
    //   console.log(e);
    // }

    //@ts-ignore
    const user: any = await PushAPI.initialize(walletClient as unknown as undefined, {
      env: CONSTANTS.ENV.PROD,
    });
    console.log('Created New Push User', user);
    setPushProtocolUser(user);
    return user;
  };

  // const initialize = async () => {
  //   //GET USER
  //   //let res = await getUser();

  //   // let res = pushProtocolUser;
  //   // // if (!res) {
  //   // //   //IF USER DOESNT EXIST CREATE
  //   // //   res = await createUser();
  //   // // }

  //   let res = createUser;
  //   //setPushProtocolUser(res);
  //   return res;
  // };

  const sendPushGroupChat = async (
    messageType: string,
    messageText: any,
    //toAddress: any,
    chatID: any
  ) => {
    try {

      //@ts-ignore
      const response: any = await pushProtocolUser.chat.send(chatID, {
        type: messageType,
        content: messageText, // can be "Text" | "Image" | "File" | "GIF
      });

      console.log('Push Chat Response?', response);
      return response;
      //setOnMessages or Replace?
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   initialize();
  // }, []);

  let sharedState = {
    pushProtocolUser,
    setPushProtocolUser,
    groupChats,
    setGroupChats,
    messages,
    setMessages,
    sendPushGroupChat,
    initialize
  };
  

  return (
    <PushProtocolContext.Provider value={sharedState}>{children}</PushProtocolContext.Provider>
  );
}

export const usePushProtocolContext = () => useContext(PushProtocolContext);