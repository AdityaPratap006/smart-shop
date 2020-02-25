import React from 'react';
import styles from './GoBackButton.module.scss';

import { connect } from 'react-redux';
import { addMessage, popMessage } from '../../redux/messages/messages.actions';


const GoBackButton = ({goBackFrom, addMessage, popMessage}) => {

    const goBack = () => {

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
            <span>{`< BACK`}</span>
        </div>
    );
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    addMessage: (message) => dispatch(addMessage(message)),
    popMessage: () => dispatch(popMessage()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoBackButton);
