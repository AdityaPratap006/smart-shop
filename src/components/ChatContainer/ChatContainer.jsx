import React from 'react'
import styles from './ChatContainer.module.scss';
import ChatMessageContainer from '../ChatMessageContainer/ChatMessageContainer';
import TextMessage from '../TextMessage/TextMessage';

const ChatContainer = () => {
    return (
        <div className={styles['chat-container']}>
            <div className={styles['chat-container-inner']}>
                <ChatMessageContainer bot>
                    <TextMessage text={'Hello Sir!'} bot/>
                </ChatMessageContainer>
                <ChatMessageContainer bot>
                    <TextMessage text={'How Can I help you?'} bot/>
                </ChatMessageContainer>
                <ChatMessageContainer>
                    <TextMessage text={'Electronics'} />
                </ChatMessageContainer>
            </div>
        </div>
    )
}

export default ChatContainer;
