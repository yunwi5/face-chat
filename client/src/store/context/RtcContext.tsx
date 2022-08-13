import React, { useContext, useState } from 'react';

interface IRtcContext {
    start: boolean;
    inCall: boolean;
    setInCall: Function;
}

export const RtcContext = React.createContext<IRtcContext>({
    start: false,
    inCall: false,
    setInCall: () => {},
});

// custom hook
export const useRtcContext = () => useContext(RtcContext);

interface Props {
    children: React.ReactNode; // 👈️ added type for children
}

export const RtcContextProvider: React.FC<Props> = (props) => {
    const [inCall, setInCall] = useState(false);

    const value = {
        start: false,
        inCall,
        setInCall: () => {},
    };

    return <RtcContext.Provider value={value}>{props.children}</RtcContext.Provider>;
};
