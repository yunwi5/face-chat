import React from 'react';

const AuthDivider: React.FC = () => {
    return (
        <div className="flex items-center gap-2">
            <span className="inline-block flex-1 h-[2px] bg-gray-50/80"></span>
            <span className="rounded-full flex-center border-2 border-gray-50/90 w-[2.5rem] h-[2.5rem]">
                OR
            </span>
            <span className="inline-block flex-1 h-[2px] bg-gray-50/80"></span>
        </div>
    );
};

export default AuthDivider;
