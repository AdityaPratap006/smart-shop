import React from 'react';
import styles from './GoBackButton.module.scss';

import { connect } from 'react-redux';
import { addMessage, popMessage, restartChat } from '../../redux/messages/messages.actions';


const GoBackButton = ({goBackFrom, addMessage, popMessage, restart, restartChat}) => {

    const goBack = () => {

        if(restart){
            restartChat();
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

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    addMessage: (message) => dispatch(addMessage(message)),
    popMessage: () => dispatch(popMessage()),
    restartChat: () => dispatch(restartChat()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoBackButton);
