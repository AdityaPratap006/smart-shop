import React from 'react';
import styles from './Navbar.module.scss';

import { ReactComponent as BotLogo } from '../../assets/bot.svg';
// import { ReactComponent as Profile } from '../../assets/man.svg';
import CartIcon from '../CartIcon/CartIcon';
import UserProfileIcon from '../UserProfileIcon/UserProfileIcon';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { useHistory } from 'react-router-dom';

const Navbar = ({ currentUser }) => {


    const history = useHistory();

    return (
        <div className={styles['navbar']}>
            <div className={styles['bot-logo']} onClick={() =>{
                history.push('/');
            }}>
                <BotLogo
                    style={{
                        width: '90%',
                        height: '90%',
                    }}
                />
            </div>
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
