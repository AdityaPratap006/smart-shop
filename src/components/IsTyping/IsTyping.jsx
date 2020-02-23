import React, { useRef, useEffect } from 'react';
import styles from './IsTyping.module.scss';

const renderCircles = () => {
    return [...new Array(4)].map((x, index) => {
        return <div key={index} className={styles['circle']}></div>
    })
}

const IsTyping = () => {

    const elem = useRef(null);

    useEffect(() => {

       

            elem.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });

        

    }, []);

    return (
        <div ref={elem} className={styles['loader']}>
            <div className={styles['container']}>
                {
                    renderCircles()
                }
            </div>
        </div>
    )
}

export default IsTyping;
