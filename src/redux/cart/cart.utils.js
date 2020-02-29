export const addItemToCart = (cartItems, newCartItem) => {

    const existingCartItem = cartItems.find(cartItem => cartItem._id === newCartItem._id);

    if(existingCartItem){
        return cartItems.map(cartItem => (
            cartItem._id === newCartItem._id
            ? ({
                ...cartItem,
                cartQuantity: cartItem.cartQuantity + 1,
            })
            : cartItem
        ))
    }

    return [...cartItems, { ...newCartItem, cartQuantity: 1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem._id === cartItemToRemove._id
    )

    if ( existingCartItem.cartQuantity === 1) {

        return cartItems.filter( cartItem => cartItem._id !== cartItemToRemove._id)
    }

    return cartItems.map(
        cartItem =>
        (cartItem._id === cartItemToRemove._id) 
        ? { ...cartItem, cartQuantity: cartItem.cartQuantity - 1}
        : cartItem
    )
}