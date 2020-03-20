import React, { useEffect } from 'react';
import styles from './Developers.module.scss';

import AdityaPic from '../../assets/Aditya.jpg';
import AbhisekPic from '../../assets/Abhisek.png';
import UditPic from '../../assets/Udit.jpg';

import DeveloperCard from '../../components/DeveloperCard/DeveloperCard';

const Developers = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    },[])

    return (
        <div className={styles['developers-page']}>
            <h2>Developers</h2>
            <div className={styles['cards-container']}>
                <DeveloperCard 
                    name={'Aditya Pratap'} 
                    image={AdityaPic} 
                    linkedin={'https://www.linkedin.com/in/aditya-pratap-b9a844152/'}
                    instagram={'https://www.instagram.com/adityapratap7344/'}
                />
                <DeveloperCard 
                    name={'Abhisek Kumar'} 
                    image={AbhisekPic}
                    linkedin={'https://www.linkedin.com/in/abhisek-kumar-38148b18a'}
                    instagram={'http://www.instagram.com/avsk__23___sinha'}
                />
                <DeveloperCard
                 name={'Udit Kumar'} 
                 image={UditPic}
                 linkedin={'https://www.linkedin.com/in/uditkr27/'}
                 instagram={'https://www.instagram.com/udit_kr_/'}
                />
            </div>
        </div>
    )
}

export default Developers
