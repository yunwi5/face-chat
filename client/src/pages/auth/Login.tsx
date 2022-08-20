import { APP_NAME } from 'constants/globals';
import React from 'react';
import { Helmet } from 'react-helmet';

const Login: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Log In | {APP_NAME}</title>
                <meta name="description" content={`Log in to ${APP_NAME}`} />
            </Helmet>
        </>
    );
};

export default Login;
