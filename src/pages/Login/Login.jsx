import React, { useState } from 'react';
import styles from './Login.module.scss';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthPageLink from '../../components/AuthPageLink/AuthPageLink';
import FormInput from '../../components/FormInput/FormInput';
import OAuthButton from '../../components/OAuthButton/OAuthButton';


const Login = () => {

    const history = useHistory();
    const { location: { pathname }} = history;

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <div className={styles['login-page']}>
            <div className={styles['login-form-card']}>
                <div className={styles['header']}>
                    <AuthPageLink isActive={pathname === '/sign-in'} text={`SIGN IN`} to={`/sign-in`}/>
                    <AuthPageLink  isActive={pathname === '/sign-up'} text={`SIGN UP`} to={`/sign-up`}/>
                </div>
                <div className={styles['body']}>
                    <div className={styles['oauth-button-grp']}>
                        <OAuthButton authProvider="google"/>
                        <OAuthButton authProvider="facebook"/>
                    </div>
                    <div className={styles['divider']}>
                        <hr/>
                        OR
                        <hr/>
                    </div>
                    <form className={styles['form']}>
                            <FormInput 
                                label="Email"
                                type="email"
                                name="email"
                                required
                                value={email}
                                handleChange={(e) => { setEmail(e.target.value) }}
                            />
                    </form>
                    <form className={styles['form']}>
                            <FormInput 
                                label="Password"
                                type="password"
                                name="password"
                                required
                                value={password}
                                handleChange={(e) => { setPassword(e.target.value) }}
                            />
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
