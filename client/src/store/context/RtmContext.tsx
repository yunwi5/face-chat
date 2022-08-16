import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AgoraRTM, { RtmChannel, RtmClient, RtmMessage } from 'agora-rtm-sdk';
import { config } from 'config/settings';
import { IMember, IChatMessage, MessageType, BOT_UID } from 'models/rtm-models';

interface IRtmContext {
    client: RtmClient | null | undefined;
    channel: RtmChannel | null | undefined;
    messages: IChatMessage[];
    participants: IMember[];
    isLoading: boolean;
    addUserMessage: (message: string) => void;
    addBotMessage: (message: string) => void;
}

const RtmContext = React.createContext<IRtmContext>({
    client: null,
    channel: null,
    messages: [],
    participants: [],
    isLoading: false,
    addUserMessage: () => {},
    addBotMessage: () => {},
});

export const useRtmContext = () => useContext(RtmContext);

interface Props {
    children: React.ReactNode;
    uid: string;
    channelName: string;
    displayName: string;
}

interface UserMessageProps {
    text: string;
    uid: string;
    name: string;
}

export const RtmContextProvider: React.FC<Props> = (props) => {
    const { children, uid, channelName, displayName } = props;
    const clientRef = useRef<{ client?: RtmClient }>({});
    const channelRef = useRef<{ channel?: RtmChannel }>({});

    const [participants, setParticipants] = useState<IMember[]>([]);
    const [messages, setMessages] = useState<IChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addBotMessage = useCallback((message: string) => {
        const botMessage = {
            type: MessageType.BOT,
            text: message,
            dateTime: new Date(),
            uid: BOT_UID,
        };
        setMessages((ps) => [...ps, botMessage]);
    }, []);

    const addUserMessage = useCallback(({ text, uid, name }: UserMessageProps) => {
        const userMessage = {
            type: MessageType.USER,
            text,
            dateTime: new Date(),
            uid,
            name,
        };
        setMessages((ps) => [...ps, userMessage]);
    }, []);

    // Send the message through the channel as well, so that remote users can receive this message.
    const addClientUserMessage = async (text: string) => {
        addUserMessage({ text, uid, name: displayName });
        await channelRef.current.channel?.sendMessage({
            text: JSON.stringify({ type: 'chat', message: text, displayName }),
        });
    };

    const handleMmemberJoin = useCallback(
        async (memberId: string) => {
            console.log('A new member has joined the room:', memberId);
            const attributes = await clientRef.current.client?.getUserAttributesByKeys(
                memberId,
                ['name'],
            );
            if (attributes == null) return;

            const { name } = attributes;
            setParticipants((prevList) => {
                console.log('prevList:', prevList);
                if (prevList.find((mem) => mem.uid === memberId)) return [...prevList];
                return [...prevList, { uid: memberId, name }];
            });
            addBotMessage(`Welcome to the room ${name}! 👋`);
        },
        [addBotMessage],
    );

    const handleMemberLeft = useCallback((memberId: string) => {
        setParticipants((prevList) => prevList.filter((mem) => mem.uid !== memberId));
    }, []);

    const handleChannelMessage = useCallback(
        async (messageData: RtmMessage, memberId: string) => {
            const data = JSON.parse((messageData as any).text);
            const { displayName, message, type } = data;

            if (message != null)
                addUserMessage({ text: message, uid: memberId, name: displayName });
        },
        [addUserMessage],
    );

    const addParticipant = useCallback(async (memberId: string) => {
        const client = clientRef.current.client;
        if (client == null) return;
        const member = await client.getUserAttributesByKeys(memberId, ['name']);
        setParticipants((prevList) => {
            if (prevList.find((mem) => mem.uid === memberId)) return [...prevList];
            return [...prevList, { uid: memberId, name: member['name'] }];
        });
    }, []);

    const getParticipants = useCallback(async () => {
        const channel = channelRef.current.channel;
        if (channel == null) return;

        // list of member ids
        const members = await channel.getMembers();
        members.forEach((memberId: string) => {
            addParticipant(memberId);
        });
    }, [addParticipant]);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            const newClient: RtmClient = AgoraRTM.createInstance(config.appId);
            await newClient.login({ uid: uid });

            const newChannel = newClient.createChannel(channelName);
            await newChannel.join();

            // add name to the rtmClient, so that member names can be displayed in the participants list
            await newClient.addOrUpdateLocalUserAttributes({ name: displayName });

            // Add 3 event listeners to the rtm client
            newChannel.on('MemberJoined', handleMmemberJoin);
            newChannel.on('MemberLeft', handleMemberLeft);
            // Occurs when the local user receives a channel message
            newChannel.on('ChannelMessage', handleChannelMessage);

            clientRef.current.client = newClient;
            channelRef.current.channel = newChannel;

            getParticipants();
            addBotMessage(`Welcome to the room ${displayName}! 👋`);
            setIsLoading(false);
        };
        init();
    }, [
        uid,
        channelName,
        displayName,
        getParticipants,
        addBotMessage,
        handleMmemberJoin,
        handleMemberLeft,
        handleChannelMessage,
    ]);

    useEffect(() => {
        const leaveChannel = async () => {
            await channelRef.current.channel?.leave();
            await clientRef.current.client?.logout();
        };

        window.addEventListener('beforeunload', leaveChannel);
        return () => window.removeEventListener('beforeunload', leaveChannel);
    });

    const value = {
        client: clientRef.current.client,
        channel: channelRef.current.channel,
        messages,
        participants,
        isLoading,
        addBotMessage,
        addUserMessage: addClientUserMessage,
    };

    return <RtmContext.Provider value={value}>{children}</RtmContext.Provider>;
};
