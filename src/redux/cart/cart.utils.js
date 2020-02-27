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