import CheckBox from 'components/ui/input/CheckBox';
import { Theme } from 'models/ui/Theme';
import React from 'react';

const RememberCheck = () => {
    return (
        <div className="flex items-center gap-3">
            <CheckBox name="remember-me" theme={Theme.PINK} />
            <label htmlFor="remeber-me" className="text-gray-50">
                Remember Me
            </label>
        </div>
    );
};

export default RememberCheck;
