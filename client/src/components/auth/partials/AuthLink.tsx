import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    labelText: string;
    linkText: string;
    link: string;
}

const AuthLink: React.FC<Props> = ({ labelText, linkText, link }) => {
    return (
        <p className="flex items-center gap-3">
            {labelText}{' '}
            <Link className="text-yellow-200 link-underline" to={link}>
                {linkText}
            </Link>
        </p>
    );
};

export default AuthLink;
