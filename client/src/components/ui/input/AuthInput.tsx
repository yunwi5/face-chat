import React, { useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AuthInput.module.scss';
import { faEye, faEyeSlash } from '@fortawesome/pro-regular-svg-icons';
import { useFormContext } from 'react-hook-form';

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
    let { type, label, id, name, icon, size = 'large', placeholder } = props;

    const {
        register,
        formState: { errors },
    } = useFormContext();

    const [passwordVisible, setPasswordVisible] = useState(false);

    let adjustedType = type;
    if (type === 'password') {
        adjustedType = passwordVisible ? 'text' : 'password';
    }

    return (
        <div className={styles.section}>
            <label htmlFor={id}>{label}</label>
            <div className={`${styles.control} ${size ? styles[size] : ''}`}>
                <FontAwesomeIcon icon={icon} className={styles.icon} />
                <span className={styles.divider} />
                <input
                    {...register(name)}
                    type={adjustedType}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                />
                {type === 'password' && (
                    <FontAwesomeIcon
                        onClick={() => setPasswordVisible((ps) => !ps)}
                        icon={passwordVisible ? faEyeSlash : faEye}
                        className={styles.visibility}
                    />
                )}
            </div>
            {errors[name]?.message && (
                <p className="text-rose-300">{(errors[name]?.message as any) ?? ''}</p>
            )}
        </div>
    );
};

export default AuthInput;
