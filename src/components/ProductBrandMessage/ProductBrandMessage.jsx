import React, { useState, useEffect, useRef } from 'react';
import styles from './ProductBrandMessage.module.scss';

import Axios from 'axios';

import { connect } from 'react-redux';
import { addMessage, popMessage } from '../../redux/messages/messages.actions';
import { setProductBrand } from '../../redux/products/products.actions';
import { selectProductType, selectProductCategory } from '../../redux/products/products.selectors';


import IsTyping from '../IsTyping/IsTyping';

const ProductBrandMessage = ({ addMessage, setProductBrand, popMessage, productType, productCategory }) => {

    const [loading, setLoading] = useState(true);
    const [brandList, setBrandList] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {

        Axios
            .get(`https://smart-shop-api.herokuapp.com/${productType}/${productCategory}/brands`)
            .then(axiosRes => axiosRes.data)
            .then(apiRes => apiRes.data)
            .then(recivedData => {
                setLoading(false);
                setBrandList(recivedData);
                console.log({ brands: recivedData });
            })
            .catch(err => {
                console.error({ error: err });
            })

    }, [addMessage, setProductBrand, productCategory, productType]);



    const productBrandMessageRef = useRef(null);

    useEffect(() => {



        if (!loading) {
            productBrandMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }


    }, [loading]);


    const setBrandAndAddProductListMessage = (brandString) => {

        setProductBrand(brandString.toLowerCase());

        popMessage();

        addMessage({
            type: 'text',
            bot: false,
            content: brandString.toUpperCase(),

        });

        setTimeout(() => {

            addMessage({
                type: 'text',
                bot: true,
                content: `With so many great products to choose from, you'll be spoiled for choice ;)`,

            });

        }, 200)

        setTimeout(() => {

            addMessage({
                type: 'productList',
                bot: true,

            });

        }, 250);


    }


    const renderBrandList = (brandArray) => {

        return brandArray.map(brand => {
            return (
                <div key={brand} className={styles['brand']} onClick={() => { setBrandAndAddProductListMessage(brand) }}>
                    <span>{brand}</span>
                </div>
            );
        })
    }

    const handleSearch = (text) => {

        setSearch(text.toLowerCase());
    }

    return !loading ? (
        <div ref={productBrandMessageRef} className={styles['container']}>
            <div className={styles['search-div']}>
                <input
                    name="brandSearch"
                    type='text'
                    className={styles['search-box']}
                    placeholder='Search Brands...'
                    onChange={(e) => { handleSearch(e.target.value) }}
                />
            </div>
            <div className={styles['brand-container']}>
                {
                    renderBrandList(brandList.filter(brand => (brand.toLowerCase().includes(search))))
                }
            </div>
        </div>
    ) : (
            <IsTyping />
        );
}


const mapStateToProps = state => ({
    productType: selectProductType(state),
    productCategory: selectProductCategory(state),
});

const mapDispatchToProps = dispatch => ({
    addMessage: message => dispatch(addMessage(message)),
    popMessage: () => dispatch(popMessage()),
    setProductBrand: brand => dispatch(setProductBrand(brand)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductBrandMessage);

