import React from 'react';
import styles from './Cart.module.scss';

import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CartItem from '../CartItem/CartItem';

import { ReactComponent as CloseBtnIcon } from '../../assets/times-solid.svg';

const Cart = ({ cartItems, toggleCart }) => {
    

    return (
        <div className={styles['cart']}>
            <div className={styles['close-btn']} onClick={toggleCart}>
                <CloseBtnIcon 
                    className={styles['icon']}
                />
            </div>
            <div className={styles['title']}>
                <span>YOUR CART</span>
            </div>
            <div className={styles['container']}>
                {
                    cartItems.length ?
                    cartItems.map(item => {

                        return (
                            <CartItem key={item._id} product={item}/>
                        );
                    })
                    : (
                        <div className={styles['empty']}>
                            <span>{'Your cart is empty :('} </span>
                        </div>
                    )
                }
            </div>
            <div className={styles['footer']}>
                <Link to={'/checkout'} className={styles['checkout-btn']} onClick={toggleCart}>
                    CHECKOUT
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state),
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
