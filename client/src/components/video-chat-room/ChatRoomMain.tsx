import React from 'react';
import ChatMessageSidebar from './messages/ChatMessageSidebar';
import VideoCall from './video-call/VideoCall';
import ParticipantsSidebar from './video-participants/ParticipantsSidebar';

interface Props {}

const ChatRoomMain: React.FC<Props> = () => {
    return (
        <main className="container">
            <div id="room__container">
                <ParticipantsSidebar />
                <VideoCall />
                <ChatMessageSidebar />
            </div>
        </main>
    );
};

export default ChatRoomMain;
