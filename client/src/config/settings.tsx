import { ClientConfig, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

// Currently in the testing mode. Need APP_ID + TOKEN auth in the later version
// To generate a token, we need appId, appCertificate, channelName, uid and (role, privilegeExpiredTs)
// Need to create a server to generate the token for the client.
const appId = process.env.REACT_APP_AGORA_APP_ID || '';
console.log('ENV APP_ID:', appId);
const token: string | null = null;

export const config = { appId, token };

// define config for rtc engine
export const clientConfig: ClientConfig = {
    mode: 'rtc',
    codec: 'vp8', // algorithm to encode video to display
};

const encoderConfig = {
    width: { min: 640, ideal: 1920, max: 1920 },
    height: { min: 480, ideal: 1080, max: 1080 },
};

export const useClient = createClient(clientConfig);
// Cannot use cameras on multiple browsers. Should stick to one browser when testing.
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks(
    {},
    { encoderConfig },
);

export const channelName = 'main';
