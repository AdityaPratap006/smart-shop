import React from 'react';
import styles from './GoBackButton.module.scss';

import { connect } from 'react-redux';
import { addMessage, popMessage, restartChat, clearChat } from '../../redux/messages/messages.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';


const GoBackButton = ({goBackFrom, addMessage, popMessage, restart, currentUser, clearChat}) => {

    const goBack = () => {

        if(restart){
            clearChat();
     
            setTimeout(() => {
                addMessage({
                    type: 'text',
                    bot: true,
                    content: `Hello ${currentUser.name.split(' ')[0]}!`,
        
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
            },1200);

            return;
        }

        popMessage();
        popMessage();
        popMessage();

        if(goBackFrom === 'brand'){
            addMessage({
                type: 'categoryList',
                bot: true,
            });
        } else if(goBackFrom === 'category'){
            addMessage({
                type: 'typeList',
                bot: true,   
            });
        }else if(goBackFrom === 'product'){
            addMessage({
                type: 'brandList',
                bot: true,   
            });
        }

    }

    return (
        <div className={styles['button']} onClick={goBack}>
            <span>{restart?<span>&#8635; RESTART</span>:`< BACK`}</span>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
    addMessage: (message) => dispatch(addMessage(message)),
    popMessage: () => dispatch(popMessage()),
    restartChat: () => dispatch(restartChat()),
    clearChat: () => dispatch(clearChat()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoBackButton);
