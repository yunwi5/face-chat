import { Theme } from 'models/ui/Theme';
import React from 'react';
import classes from './Button.module.scss';

interface Props {
    type: 'button' | 'submit';
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    className?: string;
    theme?: Theme;
    onClick?: () => void;
}

const Button: React.FC<Props> = (props) => {
    const { type, theme = Theme.PINK, className, onClick, children, size = 'medium' } = props;

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${classes.btn} ${classes[`btn-${theme}`]} ${classes[`btn-${size}`]} ${
                className || ''
            }`}
        >
            {children}
        </button>
    );
};

export default Button;
