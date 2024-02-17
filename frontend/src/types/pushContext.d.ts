export type pushContextType = {
    pushProtocolUser: any;
    setPushProtocolUser: (data: any) => void;
    groupChats: string[];
    setGroupChats: (data: any) => void;
    messages: string[];
    initialize: () => any;
    setMessages: (data: any) => void;
    sendPushGroupChat: (messageType: any, messageText: any, chatId: any) => any;
  };