import React from 'react';
import styles from './ChatMessageContainer.module.scss';

import { ReactComponent as ChatbotIcon } from '../../assets/bot-head.svg';
// import { ReactComponent as UserIcon } from '../../assets/man.svg';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';


const ChatMessageContainer = ({children, bot, currentUser}) => {
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
                    :<img alt="user" src={currentUser.profilePicUrl}/>
                    }
                </div>
            </div>
            {
                children
            }
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
})

export default connect(
    mapStateToProps,
    null
)(ChatMessageContainer);
