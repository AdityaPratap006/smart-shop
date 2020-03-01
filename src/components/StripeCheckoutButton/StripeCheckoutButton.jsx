import React, { useState, useEffect, useRef  } from "react";

import StripeCheckout from "react-stripe-checkout";
import NotificationSnackbar from '../NotificationSnackbar/NotificationSnackbar';

import { connect } from 'react-redux';
import { setCartItems } from "../../redux/cart/cart.actions";




const StripeCheckoutButton = ({ products, totalPrice, userId, setCartItems }) => {

    // const productsInCart = products;

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
            .then(res => {
                console.log({reponse: res});
                setCartItems([]);
                
                if(subscribed.current){
                    openSnackBar();
                }
               
                fetch(`https://smart-shop-api.herokuapp.com/${userId}/addtocart`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        cartItems: [],
                    })
                })
                .then(res2 => res2.json())
                .then(data => {
                   
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
                    label={'Proceed to Pay'}
                    panelLabel={'Pay Now'}
                    shippingAddress
                    billingAddress

                />
            ):(
                <p>{`Your Cart is Empty :(`}</p>
            )
        }
            <NotificationSnackbar isActive={isActive} message={'PAYMENT SUCCESSFUL!'} type={'success'}/>
        </>

    );
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps =  dispatch => ({
    setCartItems: cartItems => dispatch(setCartItems(cartItems)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StripeCheckoutButton);