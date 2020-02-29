import React from 'react';
import styles from './CheckoutItem.module.scss';

import { connect } from 'react-redux';

import { ReactComponent as PlusIcon } from '../../assets/plus-solid.svg';
import { ReactComponent as MinusIcon } from '../../assets/minus-solid.svg';
import { ReactComponent as CrossIcon } from '../../assets/times-solid.svg';

import { addCartItem, removeCartItem, clearItemFromCart, addCartItemStartAsync, removeCartItemStartAsync, clearCartItemStartAsync } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';


const CheckoutItem = ({ item, addCartItemStartAsync, removeCartItemStartAsync, clearCartItemStartAsync, cartItems, currentUser }) => {
    return (
        <div className={styles['card']}>
            <div className={styles['remove-btn']} onClick={() => {clearCartItemStartAsync(currentUser.userid, cartItems, item)}}> 
                <CrossIcon className={styles['cross-icon']}/>
            </div>
            <div className={styles['title']}>
                <span>{item.name}</span>
            </div>
            <div className={styles['body']}>
                <div className={styles['image-div']}>
                    <img alt={'item'} src={item.image} />
                </div>
                <div className={styles['details']}>
                    <div className={styles['price']}>
                        <span>{`₹ ${item.price * item.cartQuantity}`}</span>
                    </div>
                    <div className={styles['controls']}>
                        <div className={styles['btn']} onClick={() => {
                            // removeCartItem(item);
                            removeCartItemStartAsync(currentUser.userid, cartItems, item);
                        }}>
                            <MinusIcon className={styles['icon']}/>
                        </div>
                        <div className={styles['count']}>
                            <span>
                                {item.cartQuantity}
                            </span>
                        </div>
                        <div className={styles['btn']} onClick={() => {
                            // addCartItem(item);
                            addCartItemStartAsync(currentUser.userid, cartItems, item);
                        }}>
                             <PlusIcon className={styles['icon']}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

    cartItems: selectCartItems(state),
    currentUser: selectCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
    addCartItem: item => dispatch( addCartItem(item) ),
    removeCartItem: item => dispatch(removeCartItem(item)),
    clearItemFromCart: item => dispatch(clearItemFromCart(item)),
    addCartItemStartAsync: (userId, cartItemsArray, item) => dispatch(addCartItemStartAsync(userId, cartItemsArray, item)),
    removeCartItemStartAsync: (userId, cartItemsArray, item) => dispatch(removeCartItemStartAsync(userId, cartItemsArray, item)),
    clearCartItemStartAsync: (userId, cartItemsArray, item) => dispatch(clearCartItemStartAsync(userId, cartItemsArray, item)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutItem);
