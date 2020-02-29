import React from 'react';
import styles from './ProductModal.module.scss';

import { ReactComponent as CrossIcon } from '../../assets/times-solid.svg';

import { connect } from 'react-redux';
import { addCartItem, addCartItemStartAsync } from '../../redux/cart/cart.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartItems } from '../../redux/cart/cart.selectors'; 


const renderDescription = (description) => {

    const keyArray = Object.keys(description);

    return (
        <ul>
            {
                keyArray.map((key, index) => {
                    const descKey = description[key].key;
                    const descValue = description[key].value;
                   
                    return (
                        <li key={key}>
                            <span className={styles['key']}> {descKey} </span>
                            <span className={styles['value']}> {descValue} </span>
                        </li>
                    );
                })
            }
        </ul>
    );
}

const ProductModal = ({ setModal, setModalProduct, product, addCartItem, cartItems, currentUser, addCartItemStartAsync }) => {

   


    return (
        <div className={styles['modal']} >
            <div className={styles['header']}>
                <img alt={product.name} src={product.image} />
                <div className={styles['close-btn']} onClick={() => { setModal(false); setModalProduct({}); }}>
                    <CrossIcon style={{
                        width: '50%',
                    }} />
                </div>
            </div>
            <div className={styles['body']}>
                <div className={styles['name-section']}>
                    <div className={styles['left']}>

                        <p className={styles['name']}>{product.name}</p>
                    </div>
                    <div className={styles['right']}>
                        <p className={styles['price']}>&#8377; {product.price}</p>
                    </div>
                </div>
                <div className={styles['description']}>
                    <span>Features:</span>

                    {
                        renderDescription(JSON.parse(product.description))
                    }

                </div>
            </div>
            <div className={styles['footer']}>
               {
                   product.count > 0 
                   ? (
                    <div className={styles['add-cart-btn']} onClick={() => {
                        addCartItemStartAsync(currentUser.userid, cartItems, product);
                        setModal(false);
                    }}>
                        ADD TO CART
                    </div>
                   ): (
                       <div className={styles['not-available']}>
                         {`OUT OF STOCK :(`}
                       </div>
                   )
               }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser : selectCurrentUser(state),
    cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({
    addCartItem: product => dispatch(addCartItem(product)),
    addCartItemStartAsync: (userId, cartItemsArray, item) => dispatch(addCartItemStartAsync(userId, cartItemsArray, item)),
});
 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductModal);
