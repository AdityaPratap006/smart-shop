import React from "react";

import StripeCheckout from "react-stripe-checkout";
import { setCartItems } from "../../redux/cart/cart.actions";

import { connect } from 'react-redux';


const StripeCheckoutButton = ({ products, totalPrice, userId, setCartItems }) => {

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
                fetch(`https://smart-shop-api.herokuapp.com/${userId}/addtocart`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        cartItems: [],
                    })
                })
                .then(res2 => res2.json())
                .then(data => {
                    setCartItems([]);
                }).catch(err => {
                    console.log({errorClearingCart: err});
                })
            })
            .catch(error => console.log({
                'Error in payment': error
            }));
    };

    return (

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