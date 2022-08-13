import {
    IAgoraRTCRemoteUser,
    IAgoraRTCClient,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
    UID,
    IRemoteVideoTrack,
} from 'agora-rtc-react';
import { config, useClient, useMicrophoneAndCameraTracks } from 'config/settings';
import React, { useContext, useEffect, useMemo, useState } from 'react';

interface IRtcContext {
    start: boolean;
    inCall: boolean;
    setInCall: React.Dispatch<React.SetStateAction<boolean>>;
    ready: boolean;
    users: IAgoraRTCRemoteUser[];
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    leaveChannel: () => void;
    displayFrameUser: DisplayFrameUser | null;
    setDisplayFrameUid: React.Dispatch<React.SetStateAction<UID | null>>;
    uid: string;
    client: IAgoraRTCClient;
    // callUpdate: Function;
}

export const RtcContext = React.createContext<IRtcContext>({
    start: false,
    inCall: false,
    setInCall: () => {},
    ready: false,
    users: [],
    tracks: null,
    leaveChannel: () => {},
    displayFrameUser: null,
    setDisplayFrameUid: () => {},
    client: '' as any,
    uid: '',
});

// custom hook
export const useRtcContext = () => useContext(RtcContext);

interface Props {
    children: React.ReactNode; // 👈️ added type for children
    channelName: string;
    displayName: string;
    uid: string;
}

interface DisplayFrameUser {
    uid: UID | null;
    videoTrack?: ICameraVideoTrack | IRemoteVideoTrack | null;
}

export const RtcContextProvider: React.FC<Props> = (props) => {
    const { children, channelName, displayName, uid } = props;
    // inCall controls user entering or leaving the stream.
    const [inCall, setInCall] = useState(true);
    const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    const [start, setStart] = useState<boolean>(false);
    const client = useClient();

    const [displayFrameUid, setDisplayFrameUid] = useState<UID | null>(null);

    // ready if user microphone and cameras are ready to work.
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {
        // function to initialise the SDK
        let init = async (channelName: string) => {
            console.log('init', channelName);
            client.on('user-published', async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                console.log('subscribe success');

                if (mediaType === 'video') {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });

                    // experiment
                    user.videoTrack?.play(`user-${user.uid}`);
                }
                if (mediaType === 'audio') {
                    user.audioTrack?.play();
                }
            });

            client.on('user-unpublished', (user, type) => {
                console.log('unpublished', user, type);
                if (type === 'audio') {
                    user.audioTrack?.stop();
                }
                if (type === 'video') {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                }
            });

            client.on('user-left', (user) => {
                console.log('leaving', user);
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            // Fourth parameter is uid of the user.
            await client.join(config.appId, channelName, config.token, uid);
            if (tracks) {
                tracks[1].play(`user-${uid}`);
                await client.publish([tracks[0], tracks[1]]);
            }
            setStart(true);
        };

        if (ready && tracks) {
            console.log('init ready');
            init(channelName);
        }
    }, [channelName, client, ready, tracks, uid]);

    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        if (tracks) {
            tracks[0].close();
            tracks[1].close();
        }
        setStart(false);
        setInCall(false);
    };

    const displayFrameUser: DisplayFrameUser | null = useMemo(() => {
        // current user itself
        if (displayFrameUid === uid) {
            return {
                uid,
                videoTrack: tracks && tracks[1],
            };
        }
        return users.find((user) => user.uid === displayFrameUid) || null;
    }, [users, displayFrameUid, uid, tracks]);

    const value = {
        uid,
        start,
        inCall,
        setInCall,
        ready,
        tracks,
        users,
        leaveChannel,
        displayFrameUid,
        displayFrameUser,
        client,
        setDisplayFrameUid,
    };

    return <RtcContext.Provider value={value}>{children}</RtcContext.Provider>;
};
