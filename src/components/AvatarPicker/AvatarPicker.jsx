import React from 'react';
import styles from './AvatarPicker.module.scss';

const avatarsArray = [
    {
        url: `https://image.flaticon.com/icons/svg/145/145848.svg`
    },
    {
        url: `https://image.flaticon.com/icons/svg/145/145847.svg`
    },
    {
        url: `https://image.flaticon.com/icons/svg/145/145842.svg`
    },
    {
        url: `https://image.flaticon.com/icons/svg/145/145850.svg`
    }
]

const AvatarPicker = ({ profilePic, setProfilePic }) => {
    return (
        <div className={styles['avatar-picker']}>
            <div className={styles['title']}>
                Choose Profile Icon
            </div>
            <div className={styles['avatar-container']}>
                {
                    avatarsArray.map(avatar => {
                        return (
                            <div
                                key={avatar.url}
                                className={`${styles['avatar']} ${(profilePic === avatar.url) ? styles['active'] : null}`}
                                onClick={() => { setProfilePic(avatar.url) }}
                            >
                                <img alt="avatar" src={avatar.url} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default AvatarPicker;
