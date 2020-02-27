import React from 'react';
import styles from './CartItem.module.scss';

const CartItem = ({ product: { _id, name, price, brand, image, cartQuantity } }) => {
    return (
        <div className={styles['cart-item']}>
            <img alt={'item'} src={image} />
            <div className={styles['item-details']}>
                <span className={styles['name']}>{name}</span>
                <span className={styles['price']}>{cartQuantity} X &#8377; {price}</span>
            </div>
        </div>
    )
}

export default CartItem;
