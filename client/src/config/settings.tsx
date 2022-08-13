import { ClientConfig, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

export const APP_ID = process.env.REACT_APP_AGORA_APP_ID || 'e18ed5100be94350851d487529c0bae8';
console.log('ENV APP_ID:', APP_ID);
export const token: string | null = null;

// define config for rtc engine
export const config: ClientConfig = {
    mode: 'rtc',
    codec: 'vp8', // algorithm to encode video to display
};

// const encoderConfig = {
//     width: { min: 640, ideal: 1920, max: 1920 },
//     height: { min: 480, ideal: 1080, max: 1080 },
// };

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
// {},
// { encoderConfig },

export const channelName = 'main';
