import React from 'react';
import { APP_NAME } from 'constants/globals';
import { Helmet } from 'react-helmet';
import LogInMain from 'components/auth/LogInMain';

const Login: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Log In | {APP_NAME}</title>
                <meta name="description" content={`Log in to ${APP_NAME}`} />
            </Helmet>
            <LogInMain />
        </>
    );
};

export default Login;
