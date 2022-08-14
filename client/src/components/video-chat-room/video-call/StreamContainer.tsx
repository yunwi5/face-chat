import React, { useEffect, useState } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import Controls from '../controls/Controls';
import Videos from '../videos/Videos';
import DisplayVideoFrame from '../videos/DisplayVideoFrame';
import { ITrackState, TrackType } from 'models/track-types';
import { useRtcContext } from 'store/context/RtcContext';

interface Props {
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const StreamsContainer: React.FC<Props> = ({ tracks }) => {
    const { ready, start, sharingScreen } = useRtcContext();

    const [trackState, setTrackState] = useState<ITrackState>({
        audio: true,
        video: true,
    });

    // toggle mic, videos.
    const handleTrackState = async (type: TrackType) => {
        if (type === 'audio') {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return { ...ps, audio: !ps.audio };
            });
        } else if (type === 'video') {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return { ...ps, video: !ps.video };
            });
        }
    };

    useEffect(() => {
        if (sharingScreen) {
            tracks[1].setEnabled(true);
            setTrackState((ps) => ({ ...ps, video: true }));
        }
    }, [sharingScreen, tracks]);

    return (
        <section id="stream__container">
            {/* Larger video frame for one focused user */}
            {start && <DisplayVideoFrame videoState={trackState.video} />}
            {/* Video frames for other users */}
            {start && <Videos videoState={trackState.video} />}
            {ready && <Controls trackState={trackState} onHandleTracks={handleTrackState} />}
        </section>
    );
};

export default StreamsContainer;
