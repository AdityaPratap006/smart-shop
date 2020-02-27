import React, { useState } from 'react';
import styles from './Register.module.scss';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthPageLink from '../../components/AuthPageLink/AuthPageLink';
import FormInput from '../../components/FormInput/FormInput';
// import OAuthButton from '../../components/OAuthButton/OAuthButton';
import AvatarPicker from '../../components/AvatarPicker/AvatarPicker';

import { auth, createUserProfile } from '../../firebase/firebase.utils';

// import Axios from 'axios';

import { setCurrentUser } from '../../redux/user/user.actions';

const Register = ({ setCurrentUser }) => {

    const history = useHistory();
    const { location: { pathname } } = history;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('https://image.flaticon.com/icons/svg/145/145848.svg');
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (email === '' || password === '' || name === '') {

            setErrors({
                name: name === '',
                email: email === '',
                password: password === '',
            })

            return;
        }

        setProcessing(true);
        setErrors({});

        try {
            const { user } = await  auth.createUserWithEmailAndPassword(email, password);

            await createUserProfile(user, { name: name, profilePic: profilePic });
    
            setName('');
            setEmail('');
            setPassword('');
            setErrors({});
            setProcessing(false);

        } catch (error) {
            setProcessing(false);
            console.log({errorSigningUpUser: error})
        }     

    }

    return (
        <div className={styles['register-page']}>
            <div className={styles['register-form-card']}>
                <div className={styles['header']}>
                    <AuthPageLink isActive={pathname === '/sign-in'} text={`SIGN IN`} to={`/sign-in`} />
                    <AuthPageLink isActive={pathname === '/sign-up'} text={`SIGN UP`} to={`/sign-up`} />
                </div>
                <div className={styles['body']}>
                    <p>
                        Create your Account
                    </p>

                    <form className={styles['form']} onSubmit={handleSubmit}>
                        <FormInput
                            label="Name"
                            type="name"
                            name="name"
                            error={errors.name}
                            value={name}
                            handleChange={(e) => {

                                setName(e.target.value);
                                setErrors({
                                    ...errors,
                                    name: false
                                })
                            }}
                            required
                        />
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
                        <AvatarPicker profilePic={profilePic} setProfilePic={setProfilePic}/>
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
                                    <span>SIGN UP</span>
                                </div>
                            ) : (
                                    <div className={styles['processing']}> </div>
                                )
                        }
                    </form>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch( setCurrentUser(user) ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
