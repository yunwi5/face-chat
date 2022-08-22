import React from 'react';
import { faEnvelope, faLockKeyhole, faUser } from '@fortawesome/pro-duotone-svg-icons';
import { faLockKeyhole as faLockKeyholeRegular } from '@fortawesome/pro-regular-svg-icons';
import Button from 'components/ui/button/Button';
import AuthInput from 'components/ui/input/AuthInput';
import { getLogInRoute } from 'utils/routes';
import AuthLink from '../partials/AuthLink';
import SocialLogin from '../social/SocialLogin';

const SignUpForm: React.FC = () => {
    return (
        <section className="flex flex-col gap-4 py-5 max-w-[22.5rem]">
            <AuthInput
                type="text"
                name="username"
                label="Username"
                size="small"
                id="auth-username"
                icon={faUser}
                placeholder="Enter your user name"
            />
            <AuthInput
                type="email"
                name="email"
                label="Email"
                size="small"
                id="auth-email"
                icon={faEnvelope}
                placeholder="Enter your email"
            />
            <AuthInput
                type="password"
                name="password"
                label="Password"
                size="small"
                id="auth-password"
                icon={faLockKeyholeRegular}
                placeholder="Enter your password"
            />
            <AuthInput
                type="password"
                name="password-confirm"
                label="Confirm Password *"
                size="small"
                id="auth-password-confirm"
                icon={faLockKeyhole}
                placeholder="Confirm your password"
            />
            <Button size="large" type="submit" className="mt-2">
                Submit
            </Button>
            <AuthLink
                labelText="Already have an account?"
                linkText="Log In!"
                link={getLogInRoute()}
            />
            <SocialLogin />
        </section>
    );
};

export default SignUpForm;
