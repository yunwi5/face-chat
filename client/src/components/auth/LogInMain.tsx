import ReactDOM from 'react-dom';
import React from 'react';
import { APP_NAME } from 'constants/globals';
import AuthSection from './AuthSection';
import AuthBackground from './AuthBackground';

const LogInMain: React.FC = () => {
    const portalElement = document.getElementById('modal') as HTMLElement;

    const component = (
        <div id="auth-portal">
            <AuthBackground />
            <AuthSection>
                <main className="py-16 px-1">
                    <h2 className="text-yellow-100 text-2xl">Log In</h2>
                    <section></section>
                </main>
            </AuthSection>
        </div>
    );

    return ReactDOM.createPortal(component, portalElement);
};

export default LogInMain;
