import React from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import { useRtcContext } from 'store/context/RtcContext';
import { BaseImages } from 'constants/images';

interface Props {
    videoState: boolean;
}

function getFrameSize(users: any[], displayFrameUser: any) {
    if (displayFrameUser != null) return '100px';
    return users.length <= 2 ? '350px' : '200px';
}

const Videos: React.FC<Props> = ({ videoState }) => {
    const { uid, users, displayFrameUser, clientVideoTrack, setDisplayFrameUid } =
        useRtcContext();

    const frameSize = getFrameSize(users, displayFrameUser);
    // If the client user is in the displayFrame, do not show it here (multiple times).
    const displayClient = uid !== displayFrameUser?.uid;

    return (
        <div id="streams__container">
            {displayClient && (
                <div
                    className="video__container"
                    id={`user-container`}
                    style={{ width: frameSize, height: frameSize }}
                    onClick={() => setDisplayFrameUid(uid)}
                >
                    {videoState && clientVideoTrack ? (
                        <AgoraVideoPlayer
                            className="vid"
                            id={`user-${uid}`}
                            videoTrack={clientVideoTrack}
                            style={{ height: '100%', width: '100%' }}
                        />
                    ) : (
                        <img src={BaseImages.logo} alt={`User Placeholder`} />
                    )}
                </div>
            )}
            {users.map((user) => {
                const displayUser = user.uid !== displayFrameUser?.uid;
                if (!displayUser) return null;

                return (
                    <div
                        key={user.uid}
                        className="video__container"
                        id={`user-container-${user.uid}`}
                        style={{ width: frameSize, height: frameSize }}
                        onClick={() => setDisplayFrameUid(user.uid)}
                    >
                        {user.videoTrack ? (
                            <AgoraVideoPlayer
                                className="vid"
                                id={`user-${user.uid}`}
                                videoTrack={user.videoTrack}
                                style={{ height: '100%', width: '100%' }}
                            />
                        ) : (
                            <img src={BaseImages.logo} alt={`User Placeholder`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Videos;
