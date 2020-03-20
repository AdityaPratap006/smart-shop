import React from 'react';
import styles from './DeveloperCard.module.scss';

import { ReactComponent as LinkedinLogo } from '../../assets/linkedin-logo.svg';
import { ReactComponent as InstagramLogo } from '../../assets/Instagram-logo.svg';


const DeveloperCard = ({name, image, instagram, linkedin}) => {
    return (
        <div className={styles['card']}>
            <div className={styles['header']}>
                <img alt={name} src={image} />
            </div> 
            <div className={styles['body']}>
                 <span className={styles['name']}>
                    {name}
                 </span>
                 <span className={styles['designation']}>
                    Bachelor's in Computer Science and Engineering
                 </span>
                 <span className={styles['college']}>
                    National Institute of Technology, Jamshedpur
                 </span>
                  
            </div>
            <div className={styles['footer']}>
                <a href={linkedin}>
                    <LinkedinLogo className={'logo'}/>  
                </a>
                <a href={instagram}>
                    <InstagramLogo className={'logo'}/>
                </a>
            </div>
        </div>
    )
}

export default DeveloperCard;
