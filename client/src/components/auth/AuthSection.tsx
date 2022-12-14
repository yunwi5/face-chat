import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_NAME } from 'constants/globals';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
    title: string;
}

const AuthSection: React.FC<Props> = ({ title, children }) => {
    const navigate = useNavigate();

    return (
        <div className="auth-section">
            <div className="auth-section__inner max-w-[92vw] sm:max-w-[24rem]">
                <h1 className="text-gray-50 pb-8 text-3xl flex items-center">
                    <Link className="hover:text-yellow-200" to="/">
                        {APP_NAME}
                    </Link>
                    <span
                        onClick={() => navigate(-1)}
                        className="back-icon ml-[8.5rem] hover:text-yellow-100 transition-all hover:scale-x-125 origin-right cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </span>
                </h1>
                <main className="py-1 px-1 max-h-[80vh] overflow-y-scroll hide-scrollbar">
                    <h2 className="text-yellow-100 text-2xl">{title}</h2>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthSection;
