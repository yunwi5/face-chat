import React from 'react';
import VideoCall from './video-call/VideoCall';

interface Props {}

const ChatRoomMain: React.FC<Props> = () => {
    return (
        <main className="container">
            <VideoCall />
        </main>
    );
};

export default ChatRoomMain;
