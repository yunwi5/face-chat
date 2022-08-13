import React, { useState } from 'react';
import { useRtcContext } from 'store/context/RtcContext';
import VideoCall from './video-call/VideoCall';

interface Props {}

const ChatRoomMain: React.FC<Props> = () => {
    const { inCall } = useRtcContext();
    console.log('inCall:', inCall);

    return (
        <main className="container">
            {inCall ? (
                <>
                    <VideoCall />
                </>
            ) : (
                'Waiting to join call!'
            )}
        </main>
    );
};

export default ChatRoomMain;
