import React, { useState } from 'react';
import styles from './CartIcon.module.scss';

import { ReactComponent as CartSvg } from '../../assets/cart.svg';
import Cart from '../Cart/Cart';

import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartIcon = ({ cartItems }) => {

    const [ cartOpen , setCartOpen ] = useState(false);

    const toggleCart = () => {

        setCartOpen(!cartOpen);
    }

    const totalCount = cartItems.reduce((accumulator, item) => {
        return accumulator + item.cartQuantity
    },0);

    return (
        <div className={styles['cart']} onMouseEnter={toggleCart} onMouseLeave={toggleCart}>
        <CartSvg style={{
                width: '90%',
                height: '75%',
            }}
        />
        <div className={styles['count']}>
            <span>{totalCount}</span>
        </div>
        {
            cartOpen
            ? <Cart setCartOpen={setCartOpen}/>
            : null
        }
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
)(CartIcon);
