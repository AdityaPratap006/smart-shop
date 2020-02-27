import React from 'react';
import styles from './FormInput.module.scss';

const FormInput = ({ handleChange, label, error, ...otherProps }) => {
    return (
        <div className={styles['group']}>
            <input placeholder={label} className={`${styles['form-input']} ${ error ? styles['error'] : null}`} onChange={handleChange} {...otherProps}/>
        </div>
    )
}

export default FormInput;
