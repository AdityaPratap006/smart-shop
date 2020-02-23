import React, { useState, useEffect, useRef } from 'react';
import styles from './ProductListMessage.module.scss';


import Axios from 'axios';

import { connect } from 'react-redux';
import { addMessage, popMessage } from '../../redux/messages/messages.actions';
import { setProductList } from '../../redux/products/products.actions';
import { selectProductType, selectProductCategory, selectProductBrand } from '../../redux/products/products.selectors';
import IsTyping from '../IsTyping/IsTyping';


const ProductListMessage = ({productBrand, productCategory, productType, addMessage, popMessage, setProductList}) => {
   
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {

        Axios
            .get(`https://smart-shop-api.herokuapp.com/${productType}/${productCategory}/${productBrand}/products`)
            .then(axiosRes => axiosRes.data)
            .then(apiRes => apiRes.data)
            .then(recivedData => {
                setLoading(false);
                setProducts(recivedData);
                console.log({products: recivedData});
            })
            .catch(err => {
                console.error({ error: err });
            })

    }, [addMessage, setProductList, productCategory, productType, productBrand]);

    const productListMessageRef = useRef(null);

    useEffect(() => {

        if(!loading){
            productListMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
        }

    },[loading])

    return !loading ? (
        <div ref={ productListMessageRef } className={styles['container']}>
            
        </div>
    ) : (
        <IsTyping/>
    );
}

const mapStateToProps = state => ({
    productType: selectProductType(state),
    productCategory: selectProductCategory(state),
    productBrand: selectProductBrand(state),
});

const mapDispatchToProps = dispatch => ({
    addMessage: message => dispatch(addMessage(message)),
    popMessage: () => dispatch(popMessage()),
    setProductList: list => dispatch(setProductList(list)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductListMessage);
