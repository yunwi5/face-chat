import React from 'react';
import { APP_NAME } from 'constants/globals';
import { Helmet } from 'react-helmet';
import LogInForm from 'components/auth/form/LogInForm';

const Login: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Log In | {APP_NAME}</title>
                <meta name="description" content={`Log in to ${APP_NAME}`} />
            </Helmet>
            <LogInForm />
        </>
    );
};

export default Login;
