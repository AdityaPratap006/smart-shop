import React  from 'react';
import styles from './UserProfileIcon.module.scss';
// import UserProfileModal from '../UserProfileModal/UserProfileModal';
import { useHistory } from 'react-router-dom';

const UserProfileIcon = ({ profilePic }) => {

     const history = useHistory();

    return (
        <>
            <div className={styles['profile']} onClick={() => {
                 
                history.push('/profile');
                // console.log('sign out'); 
                // auth.signOut();
            }}>
                <img alt={'profile'} src={profilePic} />
            </div>


        </>
    )
}

export default UserProfileIcon;
