import React from 'react';
import styles from './ChatMessageContainer.module.scss';

import { ReactComponent as ChatbotIcon } from '../../assets/bot-head.svg';
import { ReactComponent as UserIcon } from '../../assets/man.svg';


const ChatMessageContainer = ({children, bot}) => {
    return (
        <div className={`${styles['chat-message-container']} ${!bot ? styles['inverted'] : null}`}>
            <div className={styles['profile-icon-div']}>
                <div className={styles['icon-container']}>
                   { 
                   bot?
                    <ChatbotIcon style={{
                            width: "90%",
                            height: "90%",
                        }}/>
                    :<UserIcon  style={{
                        width: "90%",
                        height: "90%",
                    }}/>
                    }
                </div>
            </div>
            {
                children
            }
        </div>
    )
}

export default ChatMessageContainer;
