import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import ChatContainer from '../../components/ChatContainer/ChatContainer';

import { connect } from 'react-redux';
import { setCurrentRoute } from '../../redux/route/route.actions';


const Home = ({ setCurrentRoute }) => {

    useEffect(() => {
        setCurrentRoute('/home');
    },[])

    return (
        <div className={styles['home']}>
            <ChatContainer/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => ({

    setCurrentRoute: route => dispatch(setCurrentRoute(route)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
