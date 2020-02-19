import React from 'react';
import styles from './TextMessage.module.scss';

const TextMessage = ({text, bot}) => {
    return (
        <div className={`${styles['text-message']} ${bot ? styles['bot'] : styles['user']}`}>
            <p>
                {text}
            </p>  
        </div>
    )
}

export default TextMessage;
