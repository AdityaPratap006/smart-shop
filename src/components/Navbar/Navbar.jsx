import React from 'react';
import styles from './Navbar.module.scss';

import { ReactComponent as BotLogo } from '../../assets/bot.svg';
import { ReactComponent as Profile } from '../../assets/man.svg';
import CartIcon from '../CartIcon/CartIcon';




const Navbar = () => {

   

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
            <CartIcon/>
            <div className={styles['profile']}>
                <Profile style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
        </div>
    )
}

export default Navbar;
