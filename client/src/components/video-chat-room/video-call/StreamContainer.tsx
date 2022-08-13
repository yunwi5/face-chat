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
    const [trackState, setTrackState] = useState<ITrackState>({
        audio: true,
        video: true,
    });

    // toggle mic, videos.
    const handleTrackState = async (type: TrackType) => {
        if (type === 'audio') {
            setTrackState((ps) => {
                return { ...ps, audio: !ps.audio };
            });
        } else if (type === 'video') {
            setTrackState((ps) => {
                return { ...ps, video: !ps.video };
            });
        }
    };

    useEffect(() => {
        const updateTracks = async () => {
            await tracks[0].setMuted(!trackState.audio);
            await tracks[1].setMuted(!trackState.video);
            console.log('New tracks state:', trackState.video);
        };
        updateTracks();
    }, [trackState, tracks]);

    return (
        <section id="stream__container">
            {/* Larger video frame for one focused user */}
            <DisplayVideoFrame videoState={trackState.video} />
            {/* Video frames for other users */}
            <Videos videoState={trackState.video} tracks={tracks} />
            <Controls trackState={trackState} onHandleTracks={handleTrackState} />
        </section>
    );
};

export default StreamsContainer;
