import React from 'react';
import styles from './OAuthButton.module.scss';

import googleLogo from '../../assets/google-logo.png';
import facebookLogo from '../../assets/facebook-logo.png';

import { signInWithGoogle, signInWithFacebook } from '../../firebase/firebase.utils';

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


const signInMethod = ( provider, setError ) => {

    switch (provider) {
        case 'google':
            signInWithGoogle()
            .then(user => {
                console.log('google', user);
                setError({});
            })
            .catch(err => {
                console.log({error: err});
                 
            });

            break;
            
        case 'facebook':
            signInWithFacebook()
            .then(user => {
                console.log('facebook', user);
                setError({});
            })
            .catch(err => {
                console.log({error: err});
                if(err.code === 'auth/account-exists-with-different-credential'){
                    setError({
                        accountExists: true,
                    })
                }
            });

            break;

        default:
             break;
    }

    return null;
}

const OAuthButton = ({ authProvider, setError }) => {

    

    return (
        <div className={styles['oauth-btn']} onClick={() => {signInMethod(authProvider, setError)}}>
            {
                renderLogo(authProvider)
            }
            <span>sign in with {authProvider}</span>
        </div>
    )
}

export default OAuthButton;
