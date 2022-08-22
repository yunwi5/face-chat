import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AuthInput.module.scss';

interface Props {
    type: 'text' | 'email' | 'password';
    size?: 'small' | 'large';
    label: string;
    id: string;
    name: string;
    icon: IconDefinition;
    placeholder: string;
}

const AuthInput: React.FC<Props> = (props) => {
    const { type, label, id, name, icon, size = 'large', placeholder } = props;

    return (
        <div className={styles.section}>
            <label htmlFor={id}>{label}</label>
            <div className={`${styles.control} ${size ? styles[size] : ''}`}>
                <FontAwesomeIcon icon={icon} className={styles.icon} />
                <span className={styles.divider} />
                <input type={type} name={name} id={id} placeholder={placeholder} />
            </div>
        </div>
    );
};

export default AuthInput;
