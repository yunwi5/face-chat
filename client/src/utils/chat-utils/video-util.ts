import { ILocalAudioTrack, ILocalVideoTrack } from 'agora-rtc-sdk-ng';

export type ILocalScreenTrack = ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack] | null;

export function getLocalScreenVideoTrack(localScreenTracks: ILocalScreenTrack) {
    if (localScreenTracks == null) return null;
    return Array.isArray(localScreenTracks) ? localScreenTracks[0] : localScreenTracks;
}
