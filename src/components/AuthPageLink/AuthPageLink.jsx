import React from 'react';
import styles from './AuthPageLink.module.scss';

import { Link } from 'react-router-dom';

const AuthPageLink = ({ isActive, text, to }) => {

    return isActive ? (
        <Link to={to} className={styles['active-button']}>
             <span>
                {text}
             </span>
        </Link>
    ):(
        <Link to={to} className={styles['inactive-button']}>
             <span>
                {text}
             </span>
        </Link>
    );
}

export default AuthPageLink;
