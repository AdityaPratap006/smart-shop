import React from 'react';
import styles from './Loader.module.scss';

import { ReactComponent as EVE } from '../../assets/bot.svg';

const Loader = () => {
    return (
        <div className={styles['loader']}>
            <EVE className={styles['eve']}/>
        </div>
    )
}

export default Loader;
