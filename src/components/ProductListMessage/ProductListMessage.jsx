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
import ProductCard from '../ProductCard/ProductCard';
import ProductModal from '../ProductModal/ProductModal';
import BackDrop from '../BackDrop/BackDrop';
import GoBackButton from '../GoBackButton/GoBackButton';


const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,  display: "block", background: "rgba(0,0,0,0.4)" , borderRadius: '500px'}}
        onClick={onClick}
      />
    );
  }
  
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "rgba(0,0,0,0.4)", borderRadius: '500px' }}
        onClick={onClick}
      />
    );
  }

const ProductListMessage = ({ productBrand, productCategory, productType, addMessage, popMessage, setProductList, productList }) => {

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

   
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
        dots: false,
        infinite: false,
        slidesToShow: window.innerWidth < 1100 ? 1 : 2,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,

    //   autoplaySpeed: 5000,
    //   cssEase: "linear"
    };


    
    const [modal, setModal ] = useState(false);
    const [ modalProduct, setModalProduct ] = useState({});

    const handleSearch = (text) => {

        setSearch(text.toLowerCase());
    }



    return !loading ? (
        <>
        <div ref={productListMessageRef} className={styles['container']}>
            <div className={styles['search-div']}>
                    <input
                        name="productSearch"
                        type='text'
                        className={styles['search-box']}
                        placeholder={`Search ${productCategory}...`}
                        onChange={(e) => { handleSearch(e.target.value) }}
                    />
                </div>
            <div className={styles['products-slider-container']}>
                <Slider {...sliderSettings} className={styles['slider']}>
                    {
                        productList
                        .filter(product => {
                            return (
                                product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)
                            );
                        })
                        .map(function (product, index) {
                            return (
                                <div key={product}   className={styles['product-slide']}>
                                    <div className={styles['product-card']}  >
                                        <ProductCard product={product} setModal={setModal} setModalProduct={setModalProduct}/>
                                    </div>
                                </div>
                            );
                        })
                    }
                </Slider>
            </div>
            <div className={styles['footer']}>
                <GoBackButton goBackFrom={'product'} />
                <GoBackButton restart />
            </div>
        </div>
        {
                modal ? (
                    <>
                        <ProductModal product={modalProduct} setModal={setModal} setModalProduct={setModalProduct}/>
                        <BackDrop/>
                    </>
                ) : null
        }
        </>
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
