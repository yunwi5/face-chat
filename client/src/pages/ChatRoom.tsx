import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { APP_NAME } from 'constants/globals';
import ChatRoomMain from 'components/video-chat-room/ChatRoomMain';
import ChatRoomHeader from 'components/video-chat-room/layout/ChatRoomHeader';

const ChatRoom = () => {
    const navigate = useNavigate();
    const channelName = useParams().id;

    // session name will change to real authentication later on.
    const displayName = sessionStorage.getItem('userName');

    // if user has no required props, redirect to the lobby page.
    if (channelName == null || displayName == null) {
        navigate('/lobby');
    }

    return (
        <>
            <Helmet>
                <title>Video Chat Room | {APP_NAME}</title>
                <meta name="description" content="Video chat room of multiple real users" />
            </Helmet>
            <ChatRoomHeader />
            <ChatRoomMain channelName={channelName || ''} displayName={displayName || ''} />
        </>
    );
};

export default ChatRoom;
