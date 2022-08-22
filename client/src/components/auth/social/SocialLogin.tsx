import { FacebookIcon, GoogleIcon } from 'assets/icon-components/SocialIcons';
import AuthDivider from '../partials/AuthDivider';

const SocialLogin = () => {
    return (
        <div className="mt-5">
            <AuthDivider />
            <ul className="mt-5 flex flex-col gap-3">
                <li>
                    <GoogleLogin />
                </li>
                <li>
                    <FacebookLogin />
                </li>
            </ul>
        </div>
    );
};

const buttonClass =
    'w-full flex-center py-2 transition-all hover:shadow-sm hover:shadow-yellow-200 rounded-sm gap-3';

const GoogleLogin = () => {
    return (
        <button className={`${buttonClass} bg-gray-50 hover:bg-gray-200 text-gray-700`}>
            <GoogleIcon width="32px" />
            Continue with Google
        </button>
    );
};

export const FacebookLogin = () => {
    return (
        <button className={`${buttonClass} bg-blue-200/90 hover:bg-blue-400/90 text-gray-700`}>
            <FacebookIcon width="32px" />
            Continue with Google
        </button>
    );
};

export default SocialLogin;
