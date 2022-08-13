import React from 'react';
import { useRtcContext } from 'store/context/RtcContext';
import ChatMessageSidebar from '../messages/ChatMessageSidebar';
import ParticipantsSidebar from '../video-participants/ParticipantsSidebar';
import StreamContainer from './StreamContainer';

// display overall chat room layout
const VideoCall = () => {
    const { ready, tracks } = useRtcContext();

    return (
        <div id="room__container">
            <ParticipantsSidebar />
            {ready && tracks && <StreamContainer tracks={tracks} />} <ChatMessageSidebar />
        </div>
    );
};

export default VideoCall;
