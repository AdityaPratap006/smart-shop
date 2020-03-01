import React, { useState, useEffect, useRef  } from "react";
import styles from './StripeCheckoutButton.module.scss';

import StripeCheckout from "react-stripe-checkout";
import NotificationSnackbar from '../NotificationSnackbar/NotificationSnackbar';

import { connect } from 'react-redux';
import { setCartItems, clearCartItemStartAsync } from "../../redux/cart/cart.actions";
import { selectCartItems } from '../../redux/cart/cart.selectors';

import { useHistory } from 'react-router-dom';

const StripeCheckoutButton = ({ label, products, totalPrice, userId, setCartItems, clearCartItemStartAsync, cartItems }) => {

    // const productsInCart = products;
    console.log({totalPrice});

    let subscribed = useRef(true);

    useEffect(()=>{
        subscribed.current = true;
       
        return () => {
            subscribed.current = false;
        }
    },[])

    const [ isActive, setIsActive ] = useState(false); 

    const openSnackBar = () => {

        setIsActive(true);

       
            setTimeout(() => {

                if(subscribed.current){
                    setIsActive(false);
                }
                
            }, 60000);
        

    }

     
    const history = useHistory();
    const makePayment = async token => {
        const body = {
            token,
            products,
            totalPrice
        };
        const headers = {
            "Content-Type": "application/json"
        };

        return fetch(`https://smart-shop-api.herokuapp.com/${userId}/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then( res => {
                console.log({reponse: res});
                 
                setCartItems([...cartItems.filter(item => !products.includes(item))]);
                if(subscribed.current){
                    openSnackBar();
                }

               
               
                fetch(`https://smart-shop-api.herokuapp.com/${userId}/addtocart`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        cartItems: [...cartItems.filter(item => !products.includes(item))],
                    })
                })
                .then(res2 => res2.json())
                .then(data => {

                   

                    history.push('/profile');
                   
                }).catch(err => {
                    console.log({errorClearingCart: err});

                })
            })
            .catch(error => console.log({
                'Error in payment': error
            }));
    };

    

    return (

        <>
        {
            products.length
            ? (
                <StripeCheckout
                    stripeKey="pk_test_TCFZh8NDbjzvKdGUFEJSgc0K00dT8h16im"
                    token={makePayment}
                    name="SmartKart"
                    currency={'INR'}
                    description={`Your total is ₹ ${totalPrice}`}
                    amount={totalPrice * 100}
                    label={label}
                    panelLabel={'Pay Now'}
                    shippingAddress
                    billingAddress

                >
                    <div className={styles['pay-btn']}>
                        {label}
                    </div>
                </StripeCheckout>
            ):(
                <p>{`Your Cart is Empty :(`}</p>
            )
        }
            <NotificationSnackbar isActive={isActive} message={'PAYMENT SUCCESSFUL!'} type={'success'}/>
        </>

    );
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state),
})

const mapDispatchToProps =  dispatch => ({
    setCartItems: cartItems => dispatch(setCartItems(cartItems)),
   clearCartItemStartAsync: (userId, cartItems, item) => dispatch(clearCartItemStartAsync(userId, cartItems, item)) 
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StripeCheckoutButton);