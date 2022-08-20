import { BaseImages } from 'constants/images';
import React from 'react';

const AuthBackground = () => {
    return (
        <div className="image-container">
            <img
                className="background-image"
                src={BaseImages.UserGroupChat}
                alt="User group chat"
            />
        </div>
    );
};

export default AuthBackground;
