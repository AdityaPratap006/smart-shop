import React, { useEffect, useRef } from 'react'
import styles from './ChatContainer.module.scss';

import ChatMessageContainer from '../ChatMessageContainer/ChatMessageContainer';
import TextMessage from '../TextMessage/TextMessage';

import { connect } from 'react-redux';
import { addMessage, clearChat } from '../../redux/messages/messages.actions';
import { selectMessageList } from '../../redux/messages/messages.selectors';
// import Axios from 'axios';
import ProductTypesMessage from '../ProductTypesMessage/ProductTypesMessage';
import ProductCategoryMessage from '../ProductCategoryMessage/ProductCategoryMessage';
import ProductBrandMessage from '../ProductBrandMessage/ProductBrandMessage';
import ProductListMessage from '../ProductListMessage/ProductListMessage';
// import IsTyping from '../IsTyping/IsTyping';
// import ScrollThrough from '../ScrollThrough/ScrollThrough';

const renderMessages = (messageList) => {

    const renderChatMessageContent = (message) => {
        switch (message.type) {
            case 'text':

                return <TextMessage text={message.content} bot={message.bot} />;

            case 'typeList':

                return <ProductTypesMessage />;

            case 'categoryList':

                return <ProductCategoryMessage />;

            case 'brandList':

                return <ProductBrandMessage />;

            case 'productList':
                return <ProductListMessage />;

            default:
                return null;
        }
    }

    return messageList.map((message, index) => {


        return (
            <ChatMessageContainer key={index} bot={message.bot}  >

                {
                    renderChatMessageContent(message)
                }
            </ChatMessageContainer>
        );
    })
}

const ChatContainer = ({ messageList, addMessage, clearChat }) => {

    useEffect(() => {
        // console.log('loading messages');

        clearChat();
     
        setTimeout(() => {
            addMessage({
                type: 'text',
                bot: true,
                content: `Hello Sir!`,
    
            });
        },120);

        setTimeout(()=>{
            addMessage({
                type: 'text',
                bot: true,
                content: ` I'm EVE, your personal shopping assistant!`,
    
            });
        },400);
        
        setTimeout(() => {
            addMessage({
                type: 'text',
                bot: true,
                content: ` What would you like to purchase today?`,
    
            });
        },800);
        
        setTimeout(()=> {
            addMessage({
                type: 'typeList',
                bot: true,
    
            });
        },1200)

    }, [addMessage, clearChat]);

    const lastEl = useRef(null);

    // const scrollToBottom = () => {
    //     // console.log(lastEl);

    //     lastEl.current.scrollIntoView({
    //         behavior: 'smooth',
    //         // block: 'start',
    //       });
    // }

    // useEffect(() => {

    //     // scrollToBottom();

    // },[messageList]);

    const chatContainerRef = useRef(null);

    // useEffect(() => {

    //     console.log({chatContainerRef});

    //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;

    // }, [messageList]);

    return (
        <div ref={chatContainerRef} className={styles['chat-container']}>
            <div className={styles['chat-container-inner']}>

                {
                    renderMessages(messageList, addMessage, lastEl)
                }
            </div>
            <div style={{ width: '0px', height: '0px' }}
                ref={lastEl}>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    messageList: selectMessageList(state),

});

const mapDispatchToProps = dispatch => ({
    addMessage: message => dispatch(addMessage(message)),
    clearChat: () => dispatch(clearChat()),
   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatContainer);
