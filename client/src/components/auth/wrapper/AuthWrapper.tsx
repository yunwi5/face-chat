import ReactDOM from 'react-dom';
import React from 'react';
import AuthBackground from '../AuthBackground';
import AuthSection from '../AuthSection';

interface Props {
    children: React.ReactNode;
    title: string;
}

const AuthWrapper: React.FC<Props> = ({ children, title }) => {
    const portalElement = document.getElementById('modal') as HTMLElement;

    const component = (
        <div id="auth-portal">
            <AuthBackground />
            <AuthSection title={title}>{children}</AuthSection>
        </div>
    );

    return ReactDOM.createPortal(component, portalElement);
};

export default AuthWrapper;
