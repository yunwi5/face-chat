import { faEnvelope } from '@fortawesome/pro-duotone-svg-icons';
import { faLockKeyhole } from '@fortawesome/pro-regular-svg-icons';
import Button from 'components/ui/button/Button';
import AuthInput from 'components/ui/input/AuthInput';
import React from 'react';
import { Link } from 'react-router-dom';
import { getSignUpRoute } from 'utils/routes';
import AuthLink from '../partials/AuthLink';
import RememberCheck from '../partials/RememberCheck';
import SocialLogin from '../social/SocialLogin';

const LogInForm: React.FC = () => {
    return (
        <section className="flex flex-col gap-5 py-5 max-w-[22.5rem]">
            <AuthInput
                type="email"
                name="email"
                label="email"
                id="auth-email"
                icon={faEnvelope}
                placeholder="Enter your email"
            />
            <AuthInput
                type="password"
                name="password"
                label="password"
                id="auth-password"
                icon={faLockKeyhole}
                placeholder="Enter your password"
            />
            <RememberCheck />
            <Button size="large" type="submit">
                Submit
            </Button>
            <AuthLink
                labelText={'Do not have an account?'}
                linkText="Sign Up!"
                link={getSignUpRoute()}
            />
            <SocialLogin />
        </section>
    );
};

export default LogInForm;
