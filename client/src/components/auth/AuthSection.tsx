import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_NAME } from 'constants/globals';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const AuthSection: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="auth-section">
            <h1 className="text-gray-50 text-3xl flex items-center">
                {APP_NAME}{' '}
                <span
                    onClick={() => navigate(-1)}
                    className="ml-[7.5rem] hover:text-yellow-100 transition-all hover:scale-x-125 origin-right cursor-pointer"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </span>
            </h1>
            {children}
        </div>
    );
};

export default AuthSection;
