import React from 'react';
import styles from './OAuthButton.module.scss';

import googleLogo from '../../assets/google-logo.png';
import facebookLogo from '../../assets/facebook-logo.png';

import { signInWithGoogle, signInWithFacebook } from '../../firebase/firebase.utils';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { setIsLoadingUser } from '../../redux/user/user.actions';

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


const signInMethod = ( provider, setError, history, setIsLoadingUser ) => {

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

    const history = useHistory();

    return (
        <div className={styles['oauth-btn']} onClick={() => {signInMethod(authProvider, setError, history)}}>
            {
                
                renderLogo(authProvider)
            }
            <span>sign in with {authProvider}</span>
        </div>
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    setIsLoadingUser: (flag) => dispatch(setIsLoadingUser(flag)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OAuthButton);
