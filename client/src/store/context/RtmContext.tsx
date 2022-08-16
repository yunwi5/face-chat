import AgoraRTM, { RtmChannel, RtmClient } from 'agora-rtm-sdk';
import { config } from 'config/settings';
import React, { useContext, useEffect, useState } from 'react';

interface IRtmContext {
    client: any;
    channel: string;
    messages: any[];
}

const RtmContext = React.createContext<IRtmContext>({
    client: null,
    channel: '',
    messages: [],
});

export const useRtmContext = () => useContext(RtmContext);

interface Props {
    children: React.ReactNode;
    uid: string;
    channelName: string;
    displayName: string;
}

export const RtmContextProvider: React.FC<Props> = (props) => {
    const { children, uid, channelName, displayName } = props;
    const [client, setClient] = useState<RtmClient | null>(null);
    const [channel, setChannel] = useState<RtmChannel | null>(null);

    useEffect(() => {
        const init = async () => {
            const client = AgoraRTM.createInstance(config.appId);
            client.login({ uid, token: config.token ?? undefined });

            const newChannel = client.createChannel(channelName);
            await newChannel.join();

            // add name to the rtmClient, so that member names can be displayed in the participants list
            await client.addOrUpdateLocalUserAttributes({ name: displayName });

            // Add 3 event listeners to the rtm client
            newChannel.on('MemberJoined', (memberId) => {});
            newChannel.on('MemberLeft', (memberId) => {});
            // Occurs when the local user receives a channel message
            newChannel.on('ChannelMessage', () => {});

            setClient(client);
            setChannel(newChannel);
        };

        init();
    }, [uid, channelName, displayName]);

    const value = { client: null, channel: '', messages: [] };

    return <RtmContext.Provider value={value}>{children}</RtmContext.Provider>;
};
