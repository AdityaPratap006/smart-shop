import React, { useState } from 'react';
import styles from './Navbar.module.scss';

import { ReactComponent as BotLogo } from '../../assets/bot.svg';
// import { ReactComponent as Profile } from '../../assets/man.svg';
import CartIcon from '../CartIcon/CartIcon';
import UserProfileIcon from '../UserProfileIcon/UserProfileIcon';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

// import { useHistory } from 'react-router-dom';
import DevelopersModal from '../DevelopersModal/DevelopersModal';

const Navbar = ({ currentUser }) => {

    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    // const history = useHistory();

    return (
        <div className={styles['navbar']}>
            <div className={styles['bot-logo']} onClick={() =>{
               
               toggleModal();
                 
            }}>
                <BotLogo
                    style={{
                        width: '90%',
                        height: '90%',
                    }}
                />
            </div>
            {
                modalOpen
                ? <DevelopersModal closeModal={closeModal}/>
                : null
            }
            {
                currentUser ? (
                    <>
                        <CartIcon />
                        <UserProfileIcon profilePic={currentUser.profilePicUrl}/>
                    </>
                ): null
            }

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
