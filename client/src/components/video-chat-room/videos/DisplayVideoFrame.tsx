import { AgoraVideoPlayer } from 'agora-rtc-react';
import { BaseImages } from 'constants/images';
import { useMemo } from 'react';
import { useRtcContext } from 'store/context/RtcContext';

interface Props {
    videoState: boolean;
}

const DisplayVideoFrame: React.FC<Props> = ({ videoState }) => {
    const { displayFrameUser, setDisplayFrameUid, uid } = useRtcContext();

    const displayVideo = useMemo(() => {
        // client is on display
        if (uid === displayFrameUser?.uid) {
            return videoState;
        }
        return true;
    }, [uid, displayFrameUser, videoState]);

    if (displayFrameUser == null) return null;

    return (
        <div id="stream__box">
            <div
                className="video__container"
                id={`user-container`}
                onClick={() => setDisplayFrameUid(null)}
            >
                {displayVideo && displayFrameUser.videoTrack ? (
                    <AgoraVideoPlayer
                        className="vid video-player"
                        id={`user-${displayFrameUser?.uid}`}
                        videoTrack={displayFrameUser.videoTrack}
                        style={{ height: '100%', width: '100%' }}
                    />
                ) : (
                    // Later this will be user's profile photo
                    <img src={BaseImages.logo} alt={`User Placeholder`} />
                )}
            </div>
        </div>
    );
};

export default DisplayVideoFrame;
