import React from 'react';
import { faEnvelope, faLockKeyhole, faUser } from '@fortawesome/pro-duotone-svg-icons';
import { faLockKeyhole as faLockKeyholeRegular } from '@fortawesome/pro-regular-svg-icons';
import Button from 'components/ui/button/Button';
import AuthInput from 'components/ui/input/AuthInput';
import { getLogInRoute } from 'utils/routes';
import AuthLink from '../partials/AuthLink';
import SocialLogin from '../social/SocialLogin';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface IFormValues {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const schema = yup
    .object()
    .shape({
        email: yup.string().email().required('Email is required'),
        username: yup.string().min(3).required('Username is requied'),
        password: yup.string().min(5).max(20).required('Password is required'),
        passwordConfirm: yup
            .string()
            .min(5)
            .max(20)
            .required('Please confirm your password.')
            .oneOf([yup.ref('password')], 'Password does not match.'),
    })
    .required();

const SignUpForm: React.FC = () => {
    const methods = useForm<IFormValues>({ resolver: yupResolver(schema) });

    const submitHandler: SubmitHandler<IFormValues> = (values) => {
        console.log(values);
        // Send request to the server.
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(submitHandler)}
                className="flex flex-col gap-4 py-5"
            >
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
                    name="passwordConfirm"
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
            </form>
        </FormProvider>
    );
};

export default SignUpForm;
