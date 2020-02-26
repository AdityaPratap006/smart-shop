import React from 'react';
import styles from './FormInput.module.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className={styles['group']}>
            <input placeholder={label} className={styles['form-input']} onChange={handleChange} {...otherProps}/>
        </div>
    )
}

export default FormInput;
