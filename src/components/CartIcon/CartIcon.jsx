import React, { useState } from 'react';
import styles from './CartIcon.module.scss';

import { ReactComponent as CartSvg } from '../../assets/cart.svg';
import Cart from '../Cart/Cart';

import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import PropTypes from 'prop-types';

const CartIcon = ({ cartItems, ...otherProps }) => {

    console.log({otherProps});

    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {

        setCartOpen(!cartOpen);
    }

    const closeCart = () => {
        setCartOpen(false);
    }

    const totalCount = cartItems.reduce((accumulator, item) => {
        return accumulator + item.cartQuantity
    }, 0);

    return (
        <>
            <div className={styles['cart']} onClick={toggleCart} >
                <CartSvg style={{
                    width: '90%',
                    height: '75%',
                }}
                />
                <div className={styles['count']}>
                    <span>{totalCount}</span>
                </div>

            </div>
            {
                cartOpen
                    ? <Cart setCartOpen={setCartOpen} toggleCart={toggleCart}  closeCart={closeCart} />
                    : null
            }
        </>

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
)(CartIcon);

CartIcon.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.object),
    otherProps: PropTypes.any,
};