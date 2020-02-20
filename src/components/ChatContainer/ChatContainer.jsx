import React, { useEffect } from 'react'
import styles from './ChatContainer.module.scss';

import ChatMessageContainer from '../ChatMessageContainer/ChatMessageContainer';
import TextMessage from '../TextMessage/TextMessage';

import { connect } from 'react-redux';
import { addMessage } from '../../redux/messages/messages.actions';
import { selectMessageList } from '../../redux/messages/messages.selectors';


const renderMessages = (messageList) => {

    const renderChatMessageContent = (message) => {
        switch (message.type) {
            case 'text':
                
                return <TextMessage text={message.content} bot={message.bot}/>;

            default:
                return null;
        }
    }

    return messageList.map((message, index) => {

        
        return (
            <ChatMessageContainer key={index} bot={message.bot}>
                {
                   renderChatMessageContent(message)
                }
            </ChatMessageContainer>
        );
    })
}

const ChatContainer = ({ messageList, addMessage }) => {

    useEffect(() => {
        setTimeout(() => {

            addMessage({
                type: 'text',
                bot: true,
                content: `Hello Sir!` 
            });

        }, 200);

        setTimeout(() => {

            addMessage({
                type: 'text',
                bot: true,
                content: ` I'm EVE, your shopping assistant`
            });

        },400);

        setTimeout(() => {

            

        },600);

    }, [addMessage]);

    return (
        <div className={styles['chat-container']}>
            <div className={styles['chat-container-inner']}>
                {/* <ChatMessageContainer bot>
                    <TextMessage text={'Hello Sir!'} bot />
                </ChatMessageContainer>
                <ChatMessageContainer bot>
                    <TextMessage text={'How Can I help you?'} bot />
                </ChatMessageContainer>
                <ChatMessageContainer>
                    <TextMessage text={'Electronics'} />
                </ChatMessageContainer> */}
                {
                    renderMessages(messageList)
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    messageList: selectMessageList(state),

});

const mapDispatchToProps = dispatch => ({
    addMessage: message => dispatch(addMessage(message)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatContainer);
