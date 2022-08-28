import React from 'react';
import { faEnvelope } from '@fortawesome/pro-duotone-svg-icons';
import { faLockKeyhole } from '@fortawesome/pro-regular-svg-icons';
import Button from 'components/ui/button/Button';
import AuthInput from 'components/ui/input/AuthInput';
import { getSignUpRoute } from 'utils/routes';
import AuthLink from '../partials/AuthLink';
import RememberCheck from '../partials/RememberCheck';
import SocialLogin from '../social/SocialLogin';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface IFormValues {
    email: string;
    password: string;
}

const schema = yup
    .object()
    .shape({
        email: yup.string().email().required('Email is required'),
        password: yup.string().min(5).max(20).required('Password is required'),
    })
    .required();

const LogInForm: React.FC = () => {
    const methods = useForm<IFormValues>({ resolver: yupResolver(schema) });

    const handleSubmit: SubmitHandler<IFormValues> = (values) => {
        console.log(values);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4 py-5"
            >
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
            </form>
        </FormProvider>
    );
};

export default LogInForm;
