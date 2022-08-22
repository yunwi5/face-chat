import AuthWrapper from 'components/auth/wrapper/AuthWrapper';
import { Outlet, useLocation } from 'react-router-dom';
import { getLogInRoute } from 'utils/routes';

const Auth = () => {
    const location = useLocation();
    const title = location.pathname === getLogInRoute() ? 'Log In' : 'Sign Up ';

    return (
        <AuthWrapper title={title}>
            <Outlet />
        </AuthWrapper>
    );
};

export default Auth;
