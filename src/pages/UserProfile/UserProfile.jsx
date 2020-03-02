import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.scss';

import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import Loader from '../Loader/Loader';

import { auth } from '../../firebase/firebase.utils';
import OrderItem from '../../components/OrderItem/OrderItem';
import Axios from 'axios';
import { setCurrentRoute } from '../../redux/route/route.actions';

const UserProfile = ({ currentUser, setCurrentRoute }) => {

    const [ state, setState ] = useState({
        products: [],
        loading: true,
    });

    useEffect(() => {

        setCurrentRoute('/profile');

        let subscribed = true;

        Axios
        .get(`https://smart-shop-api.herokuapp.com/${currentUser.userid}/orders`)
        .then(res => res.data)
        .then(result => result.data)
        .then(userOrders => {
           
            if(subscribed){
                setState({
                    products: [...userOrders],
                    loading: false,
                })
            }
        })
        .catch(err => {
            if(subscribed){
                setState({
                    products: [],
                    loading: false,
                })
            }
            console.log({errorLoadingOrders: err});
        })

        return () => {
            subscribed = false;
        }
    }, []);

    return currentUser ? (
        <div className={styles['profile-page']}>
            <div className={styles['card']}>
                <div className={styles['pic-container']}>
                    <div className={styles['profile-pic']}>
                        <img src={currentUser.profilePicUrl} alt={currentUser.name} />
                    </div>
                </div>
                <div className={styles['content']}>
                    <span className={styles['name']}>{currentUser.name}</span>
                    <span className={styles['email']}>{currentUser.email}</span>
                    <div className={styles['logout-btn']} onClick={() => {
                        auth.signOut();
                    }}>
                        logout
                    </div>
                </div>
            </div>
            <div className={styles['orders-container']}>
                <div className={styles['title']}>
                    Your Orders
                </div>
                <div className={styles['order-list']}>
                    {
                        state.loading ? (
                            <div className={styles['loading']}>

                            </div>
                        ): (
                            state.products.length ? (
                                state.products.map(item => (
                                     <OrderItem key={`${item.orderedAt} ${item._id}`} item={item}/>
                                 ))
                             ): (
                                 <p> Your Orders will appear here </p>
                             )
                        )
                    }
                </div>
            </div>
        </div>
    ) : (
            <Loader />
        )
}

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
    setCurrentRoute: route => dispatch(setCurrentRoute(route)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile);
