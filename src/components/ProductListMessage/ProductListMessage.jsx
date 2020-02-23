import React, { useState, useEffect, useRef } from 'react';
import styles from './ProductListMessage.module.scss';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';


import Axios from 'axios';

import { connect } from 'react-redux';
import { addMessage, popMessage } from '../../redux/messages/messages.actions';
import { setProductList } from '../../redux/products/products.actions';
import { selectProductType, selectProductCategory, selectProductBrand, selectProductList } from '../../redux/products/products.selectors';
import IsTyping from '../IsTyping/IsTyping';

import Slider from "react-slick";



const ProductListMessage = ({ productBrand, productCategory, productType, addMessage, popMessage, setProductList, productList }) => {

    const [loading, setLoading] = useState(true);
   
    useEffect(() => {

        Axios
            .get(`https://smart-shop-api.herokuapp.com/${productType}/${productCategory}/${productBrand}/products`)
            .then(axiosRes => axiosRes.data)
            .then(apiRes => apiRes.data)
            .then(recivedData => {
                setLoading(false);
                // setProducts(recivedData);
                setProductList(recivedData);
                console.log({ products: recivedData });
            })
            .catch(err => {
                console.error({ error: err });
            })

    }, [addMessage, setProductList, productCategory, productType, productBrand]);

    const productListMessageRef = useRef(null);

    useEffect(() => {


        if (!loading) {
            productListMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

    }, [loading]);

    const sliderSettings = {
        dots: true,
          infinite: false,
          slidesToShow: (window.innerWidth< 1100) ? 1 : 2,
          slidesToScroll: 1,
          autoplay: false,
          speed: 500,
        //   autoplaySpeed: 5000,
        //   cssEase: "linear"
      };
    

    return !loading ? (
        <div ref={productListMessageRef} className={styles['container']}>
            <div className={styles['products-slider-container']}>
                <Slider {...sliderSettings}>
                    {productList.map(function (product, index) {
                        return (
                            <div key={product._id}   className={styles['product-slide']}>
                                <div className={styles['product-card']}>

                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    ) : (
            <IsTyping />
        );
}

const mapStateToProps = state => ({
    productType: selectProductType(state),
    productCategory: selectProductCategory(state),
    productBrand: selectProductBrand(state),
    productList: selectProductList(state),
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
