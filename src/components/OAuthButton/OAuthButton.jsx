import React from 'react';
import styles from './OAuthButton.module.scss';

import googleLogo from '../../assets/google-logo.png';
import facebookLogo from '../../assets/facebook-logo.png';

const renderLogo = (provider) => {
        
    switch (provider) {
        case 'google':
            return (
                <img src={googleLogo} alt={`${provider} icon`}/>
            );
        case 'facebook':
            return (
                <img  src={facebookLogo} alt={`${provider} icon`}/>
            );
        default:
            return null;
    }
}

const OAuthButton = ({ authProvider, }) => {

    

    return (
        <div className={styles['oauth-btn']}>
            {
                renderLogo(authProvider)
            }
            <span>sign in with {authProvider}</span>
        </div>
    )
}

export default OAuthButton;
