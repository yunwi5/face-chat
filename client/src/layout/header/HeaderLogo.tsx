import { APP_NAME } from 'constants/globals';
import { BaseImages } from 'constants/images';
import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderLogo = () => {
    return (
        <NavLink to="/">
            <h3 id="logo">
                <img src={BaseImages.logo} alt={`${APP_NAME} Logo`} />
                <span>{APP_NAME}</span>
            </h3>
        </NavLink>
    );
};

export default HeaderLogo;
