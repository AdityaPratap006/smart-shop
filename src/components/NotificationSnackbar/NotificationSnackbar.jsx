import React from 'react';
import styles from './NotificationSnackbar.module.scss';


const NotificationSnackbar = ({ message , type, isActive}) => {

    return (
        <div className={`${styles['snackbar']} ${isActive ? styles['active'] : null}`}>
            <p style={{
                color: type === 'error' ? 'red' : 'green',
                fontSize: '1.2rem',
            }}>
                { message }
            </p>
        </div>
    )
}

export default NotificationSnackbar;
