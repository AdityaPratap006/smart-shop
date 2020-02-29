import React from 'react';
import styles from './Checkout.module.scss';

import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';

const Checkout = ({ cartItems }) => {
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);
