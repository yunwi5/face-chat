import React, { useState } from 'react';
import { useRtcContext } from 'store/context/RtcContext';

interface Props {
    channelName: string;
    displayName: string;
}

const ChatRoomMain: React.FC<Props> = ({ channelName, displayName }) => {
    const { inCall } = useRtcContext();

    return (
        <div style={{ color: 'white' }}>
            {inCall ? 'We are in the call!' : 'Waiting to join call!'}
        </div>
    );
};

export default ChatRoomMain;
