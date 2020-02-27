import React from 'react';
import styles from './Navbar.module.scss';

import { ReactComponent as BotLogo } from '../../assets/bot.svg';
import { ReactComponent as Profile } from '../../assets/man.svg';
import CartIcon from '../CartIcon/CartIcon';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { auth } from '../../firebase/firebase.utils';

const Navbar = ({ currentUser }) => {



    return (
        <div className={styles['navbar']}>
            <div className={styles['bot-logo']}>
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
                        <div className={styles['profile']} onClick={() => { console.log('sign out'); auth.signOut()}}>
                            <img alt={'profile'} src={currentUser.profilePicUrl} />
                        </div>
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
