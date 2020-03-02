import React, { useRef, useEffect } from 'react';
import styles from './Cart.module.scss';

import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CartItem from '../CartItem/CartItem';

import { ReactComponent as CloseBtnIcon } from '../../assets/times-solid.svg';

const useOutsideAlerter = (ref, action) => {
    
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        action();
      }
    }
  
    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
  

const Cart = ({ cartItems, toggleCart, closeCart }) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, closeCart);

    return (
        <div ref={wrapperRef} className={styles['cart']}>
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
                            <CartItem key={item._id} item={item}/>
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
