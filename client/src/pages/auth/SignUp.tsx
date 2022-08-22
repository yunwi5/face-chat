import React from 'react';
import { APP_NAME } from 'constants/globals';
import { Helmet } from 'react-helmet';
import SignUpForm from 'components/auth/form/SignUpForm';

const SignUp: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Sign Up | {APP_NAME}</title>
                <meta
                    name="description"
                    content={`Sin up for ${APP_NAME} and become a community member!`}
                />
            </Helmet>
            <SignUpForm />
        </>
    );
};

export default SignUp;
