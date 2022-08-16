import React from 'react';
import { useRtcContext } from 'store/context/RtcContext';
import StreamContainer from './StreamContainer';

// Currently redundant component
const VideoCall = () => {
    const { tracks } = useRtcContext();

    return <>{tracks && <StreamContainer tracks={tracks} />}</>;
};

export default VideoCall;
