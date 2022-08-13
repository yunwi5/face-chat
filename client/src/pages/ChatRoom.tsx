import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { APP_NAME } from 'constants/globals';
import ChatRoomMain from 'components/video-chat-room/ChatRoomMain';
import ChatRoomHeader from 'components/video-chat-room/layout/ChatRoomHeader';
import { RtcContextProvider } from 'store/context/RtcContext';
// import { v4 as uuidv4 } from 'uuid';

// Returns uid from the sessionStorage.
// Or, generate new uid if there is none.
function getUid() {
    let uid = sessionStorage.getItem('uid');
    if (!uid) {
        // uid = uuidv4();
        uid = String(Math.floor(Math.random() * 10000));
        sessionStorage.setItem('uid', uid);
    }
    return uid;
}

const ChatRoom = () => {
    const navigate = useNavigate();
    const channelName = useParams().id;

    // session name will change to real authentication later on.
    const displayName = sessionStorage.getItem('userName');
    const uid = getUid();

    // if user has no required props, redirect to the lobby page.
    if (channelName == null || displayName == null) {
        navigate('/lobby');
    }

    const props = {
        uid,
        channelName: channelName || '',
        displayName: displayName || '',
    };

    return (
        <>
            <Helmet>
                <title>Video Chat Room | {APP_NAME}</title>
                <meta name="description" content="Video chat room of multiple real users" />
            </Helmet>
            <RtcContextProvider {...props}>
                <ChatRoomHeader />
                <ChatRoomMain />
            </RtcContextProvider>
        </>
    );
};

export default ChatRoom;
