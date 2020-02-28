import React, { useState } from 'react';
import styles from './Login.module.scss';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthPageLink from '../../components/AuthPageLink/AuthPageLink';
import FormInput from '../../components/FormInput/FormInput';
import OAuthButton from '../../components/OAuthButton/OAuthButton';

import { signInWithEmailAndPassword } from '../../firebase/firebase.utils';



const Login = () => {

    // const history = useHistory();
    // const { location: { pathname } } = history;

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [processing, setProcessing] = useState(false);
    // const [errors, setErrors] = useState({});

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     if (email === '' || password === '') {

    //         setErrors({
    //             email: email === '',
    //             password: password === '',
    //         })

    //         return;
    //     }

       

    //     setProcessing(true);
    //     setErrors({});

    //     signInWithEmailAndPassword(email, password)
    //         .then(res => {
    //             console.log({ success: res });
    //             setProcessing(false);
    //         })
    //         .catch(err => {
    //             console.log({ error: err });

    //             if (err.code === 'auth/user-not-found') {
    //                 setErrors({
    //                     userNotFound: true,
    //                 })
    //             }

    //             if (err.code === 'auth/wrong-password') {
    //                 setErrors({
    //                     wrongCredentials: true,
    //                 })
    //             }

    //             if(err.code === 'auth/invalid-email') {
    //                 setErrors({
    //                    invalidEmail: true,
    //                 })
    //             }

    //             setProcessing(false);
    //         })
    // }

    return (
        <div className={styles['login-page']}>
            <div className={styles['login-form-card']}>
                {/* <div className={styles['header']}>
                    <AuthPageLink isActive={pathname === '/sign-in'} text={`SIGN IN`} to={`/sign-in`} />
                    <AuthPageLink isActive={pathname === '/sign-up'} text={`SIGN UP`} to={`/sign-up`} />
                </div> */}
                <div className={styles['body']}>
                    <p>
                        Sign in to your Account
                    </p>
                    <div className={styles['oauth-button-grp']}>

                        <OAuthButton authProvider="google" />
                        <OAuthButton authProvider="facebook" />
                    </div>
                    {/* <div className={styles['divider']}>
                        <hr />
                        OR
                        <hr />
                    </div>
                    <form className={styles['form']} onSubmit={handleSubmit}>
                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            error={errors.email}
                            value={email}
                            handleChange={(e) => {

                                setEmail(e.target.value);
                                setErrors({
                                    ...errors,
                                    email: false
                                })
                            }}
                            required
                        />
                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            error={errors.password}
                            value={password}
                            handleChange={(e) => {

                                setPassword(e.target.value);
                                setErrors({
                                    ...errors,
                                    password: false
                                })
                            }}
                            required
                        />
                        {
                            errors.userNotFound ? (
                                <div className={styles['error']}>
                                    <p>User Not Found</p>
                                </div>
                            ) : null
                        }
                        {
                            errors.wrongCredentials ? (
                                <div className={styles['error']}>
                                    <p>Wrong Credentials</p>
                                </div>
                            ) : null
                        }
                        {
                            errors.invalidEmail ? (
                                <div className={styles['error']}>
                                    <p>Invalid Email</p>
                                </div>
                            ) : null
                        }
                        {
                            !processing ? (
                                <div className={styles['submit-btn']} onClick={handleSubmit}>
                                    <span>SIGN IN</span>
                                </div>
                            ) : (
                                <div className={styles['processing']}> </div>
                            )
                        }
                    </form> */}

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
