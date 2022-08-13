import React from 'react';
import { Helmet } from 'react-helmet';
import ChatRoomMain from 'components/video-chat-room/ChatRoomMain';
import { APP_NAME } from 'constants/globals';
import { useNavigate, useParams } from 'react-router-dom';

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
            <ChatRoomMain channelName={channelName || ''} displayName={displayName || ''} />
        </>
    );
};

export default ChatRoom;
