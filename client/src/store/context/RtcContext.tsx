import {
    IAgoraRTCRemoteUser,
    IAgoraRTCClient,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
    UID,
} from 'agora-rtc-react';
import AgoraRTC, { IRemoteVideoTrack, ILocalVideoTrack } from 'agora-rtc-sdk-ng';
import { config, encoderConfig } from 'config/settings';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getLocalScreenVideoTrack, ILocalScreenTrack } from 'utils/chat-utils/video-util';
import { useRtmContext } from './RtmContext';

interface IRtcContext {
    start: boolean;
    users: IAgoraRTCRemoteUser[];
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    leaveChannel: () => void;
    displayFrameUser: DisplayFrameUser | null;
    setDisplayFrameUid: React.Dispatch<React.SetStateAction<UID | null>>;
    uid: string;
    client: IAgoraRTCClient | null;
    // callUpdate: Function;
    toggleScreen: () => void;
    localScreenTracks: ILocalScreenTrack;
    clientVideoTrack: ILocalVideoTrack | null;
    sharingScreen: boolean;
}

export const RtcContext = React.createContext<IRtcContext>({
    start: false,
    users: [],
    tracks: null,
    leaveChannel: () => {},
    displayFrameUser: null,
    setDisplayFrameUid: () => {},
    client: null as any,
    uid: '',
    toggleScreen: () => {},
    localScreenTracks: null,
    sharingScreen: false,
    clientVideoTrack: null,
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
    videoTrack?: ICameraVideoTrack | IRemoteVideoTrack | ILocalVideoTrack | null;
}

export const RtcContextProvider: React.FC<Props> = (props) => {
    const { children, channelName, displayName, uid } = props;
    const { isLoading: isRtmLoading } = useRtmContext();

    // inCall controls user entering or leaving the stream.
    const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    const [start, setStart] = useState<boolean>(false);
    // const client = useClient();
    const [client, setClient] = useState<IAgoraRTCClient | null>(null);

    const [displayFrameUid, setDisplayFrameUid] = useState<UID | null>(null);

    const [sharingScreen, setSharingScreen] = useState(false);
    const [localScreenTracks, setLocalScreenTracks] = useState<ILocalScreenTrack>(null);

    const [tracks, setTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(
        null,
    );

    useEffect(() => {
        // function to initialise the SDK
        let init = async (name: string) => {
            console.log('init', name);
            // Do not log in to Rtm and Rtc at the same time.
            if (isRtmLoading) return;

            // Agora RTC SDK
            const newClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
            await newClient.join(config.appId, name, config.token, uid);

            newClient.on('user-published', async (user, mediaType) => {
                await newClient.subscribe(user, mediaType);
                console.log('subscribe success');
                if (mediaType === 'video') {
                    user?.videoTrack?.play(`user-${user.uid}`);
                }
                if (mediaType === 'audio') {
                    user.audioTrack?.play();
                }
                setUsers((prevUsers) => {
                    console.log(
                        'found:',
                        prevUsers.find((pu) => pu.uid === user.uid),
                    );
                    const foundIndex = prevUsers.findIndex((pu) => pu.uid === user.uid);
                    if (foundIndex >= 0) {
                        prevUsers[foundIndex] = user;
                        return [...prevUsers];
                    }
                    return [...prevUsers, user];
                });
            });

            newClient.on('user-unpublished', (user, type) => {
                console.log('User Unpublished!', user, type);
                if (type === 'audio') {
                    user.audioTrack?.stop();
                }
                if (type === 'video') {
                    user.videoTrack?.stop();
                }
                // setUsers((prevUsers) => [...prevUsers]);
            });

            newClient.on('user-left', (user) => {
                console.log('leaving', user);
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            const tracks = await AgoraRTC.createMicrophoneAndCameraTracks(
                {},
                { encoderConfig },
            );

            // tracks[1].play(`user-${uid}`);
            await newClient.publish([tracks[0], tracks[1]]);

            setClient(newClient);
            setTracks(tracks);
            setStart(true);
        };

        init(channelName);
    }, [channelName, uid, isRtmLoading]);

    const leaveChannel = async () => {
        if (!client) return;
        await client.leave();
        client.removeAllListeners();
        if (tracks) {
            tracks[0].close();
            tracks[1].close();
        }
        setStart(false);
    };

    // Screen sharing functionality
    const toggleScreen = async () => {
        if (!client) return;
        console.log('Toggle Screen!');
        if (!sharingScreen) {
            setSharingScreen(true);
            setDisplayFrameUid(uid);
            if (tracks) await client.unpublish(tracks[1]);

            const localScreenTracks = await AgoraRTC.createScreenVideoTrack(undefined as any);
            setLocalScreenTracks(localScreenTracks);

            if (Array.isArray(localScreenTracks)) {
                // ILocalVideoTrack is the first element
                localScreenTracks[0].play(`user-${uid}`);
                await client.publish([localScreenTracks[0]]);
            } else {
                localScreenTracks.play(`user-${uid}`);
                await client.publish([localScreenTracks]);
            }
            console.log('localScreenTracks:', localScreenTracks);
        } else {
            setSharingScreen(false);
            setDisplayFrameUid(null);
            if (localScreenTracks == null) return;

            if (Array.isArray(localScreenTracks)) {
                // ILocalVideoTrack is the first element
                await client.unpublish([localScreenTracks[0]]);
            } else {
                await client.unpublish([localScreenTracks]);
            }
            switchToCamera();
        }
    };

    // Called when switching from screen sharing back to normal mode
    const switchToCamera = async () => {
        if (tracks == null || client == null) return;
        tracks[1].play(`user-${uid}`);
        await client.publish([tracks[1]]);
    };

    // Video track of the client either null, screenTrack, or videoTrack
    const currentClientVideoTrack: ILocalVideoTrack | null = useMemo(() => {
        if (sharingScreen && localScreenTracks != null)
            return getLocalScreenVideoTrack(localScreenTracks);
        return tracks && tracks[1];
    }, [sharingScreen, localScreenTracks, tracks]);

    const displayFrameUser: DisplayFrameUser | null = useMemo(() => {
        // Client user is in the display frame.
        if (displayFrameUid === uid) {
            return {
                uid,
                videoTrack: currentClientVideoTrack,
            };
        }
        // One of the remote users are in the display frame.
        return users.find((user) => user.uid === displayFrameUid) || null;
    }, [users, displayFrameUid, uid, currentClientVideoTrack]);

    const value = {
        uid,
        start,
        ready: true,
        tracks,
        users,
        leaveChannel,
        displayFrameUid,
        displayFrameUser,
        client,
        setDisplayFrameUid,
        toggleScreen,
        sharingScreen,
        localScreenTracks,
        clientVideoTrack: currentClientVideoTrack,
    };

    return <RtcContext.Provider value={value}>{children}</RtcContext.Provider>;
};
