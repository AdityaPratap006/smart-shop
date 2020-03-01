import React from 'react';
import styles from './Checkout.module.scss';

import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import StripeCheckoutButton from '../../components/StripeCheckoutButton/StripeCheckoutButton';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Checkout = ({ cartItems, currentUser }) => {

    const getTotalPrice = cartItems.reduce((acc, item) => acc + (item.cartQuantity * item.price), 0);


    return (
        <div className={styles['checkout-page']}>
            <div className={styles['title']}>
                <h3>CHECKOUT</h3>
            </div>

            <div className={styles['container']}>
                {
                    cartItems.map(item => <CheckoutItem key={item._id} item={item} />)
                }
            </div>
            <div className={styles['total-price']}>
                {`TOTAL: ₹ ${getTotalPrice}`}
            </div>
            <div className={styles['alert']}>
                Please use the dummy credit card given below for making payments
            </div>
            <div className={styles['credit-card']}>
                <div className={styles['number']}>
                    4242 4242 4242 4242
                </div>
                <div className={styles['expiry']}>
                    Exp:  01/30
                </div>
                <div className={styles['cvv']}>
                    CVV: 123
                </div>
            </div>
            <div className={styles['stripe-btn-div']}>
                <StripeCheckoutButton
                    userId={currentUser.userid}
                    products={cartItems}
                    totalPrice={getTotalPrice}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state),
    currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);
