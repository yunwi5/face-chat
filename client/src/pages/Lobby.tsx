import React from 'react';
import { Helmet } from 'react-helmet';
import LobbyMain from 'components/lobby/LobbyMain';
import { APP_NAME } from 'constants/globals';

const Lobby = () => {
    return (
        <>
            <Helmet>
                <title>Lobby | {APP_NAME}</title>
                <meta
                    name="description"
                    content="Lobby for joining interactive video chatting room."
                />
            </Helmet>
            <LobbyMain />
        </>
    );
};

export default Lobby;
