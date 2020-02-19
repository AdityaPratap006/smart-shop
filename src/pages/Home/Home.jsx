import React from 'react';
import styles from './Home.module.scss';
import ChatContainer from '../../components/ChatContainer/ChatContainer';

const Home = () => {
    return (
        <div className={styles['home']}>
            <ChatContainer/>
        </div>
    )
}

export default Home;
