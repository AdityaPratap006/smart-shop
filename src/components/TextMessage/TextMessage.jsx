import React, { useRef, useEffect } from 'react';
import styles from './TextMessage.module.scss';
// import ScrollThrough from '../ScrollThrough/ScrollThrough';

import { connect } from 'react-redux';
import { selectMessageList } from '../../redux/messages/messages.selectors';


const TextMessage = ({ text, bot }) => {

    const TextMessageRef = useRef(null);

    useEffect(() => {
    
            TextMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

    },[]);

    return (
        // <ScrollThrough freshlyAdded={index === messageList.length - 1} >
            <div ref={TextMessageRef} className={`${styles['text-message']} ${bot ? styles['bot'] : styles['user']}`}>
                <p>
                    {text}
                </p>
            </div>
        // </ScrollThrough>
    );
}

const mapStateToProps = state => ({

    messageList: selectMessageList(state),
});

export default connect(
    mapStateToProps,
)(TextMessage);
