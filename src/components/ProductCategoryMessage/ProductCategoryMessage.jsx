import React, { useState, useEffect, useRef } from 'react';
import styles from './ProductCategoryMessage.module.scss';

import Axios from 'axios';

import { connect } from 'react-redux';
import { addMessage, popMessage } from '../../redux/messages/messages.actions';
import { setProductCategory } from '../../redux/products/products.actions';
// import { selectMessageList } from '../../redux/messages/messages.selectors';
import { selectProductType } from '../../redux/products/products.selectors';
 
import IsTyping from '../IsTyping/IsTyping';
import GoBackButton from '../GoBackButton/GoBackButton';


const ProductCategoryMessage = ({ addMessage, popMessage, productType, setProductCategory }) => {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {

        Axios
            .get(`https://smart-shop-api.herokuapp.com/${productType}/category`)
            .then(axiosRes => axiosRes.data)
            .then(apiRes => apiRes.data)
            .then(recivedData => {
                console.log(`${productType}: `, recivedData);
                setLoading(false);
                setCategoryList(recivedData);

            })
            .catch(err => {
                console.error({ error: err });
            })

    }, [addMessage, productType]);


    const productCategoryMessageRef = useRef(null);

    useEffect(() => {

        

        if(!loading){
            productCategoryMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
        }
       

    }, [loading]);

    const setCategoryAndAddBrandsMessage = (categoryString) => {

        setProductCategory(categoryString.toLowerCase());

        popMessage();

        addMessage({
            type: 'text',
            bot: false,
            content: categoryString.toUpperCase(),
             
        });

        setTimeout(() => {

            addMessage({
                type: 'text',
                bot: true,
                content:  'What brand do you prefer?',
                 
            });
    
        }, 200)

        setTimeout(()=>{

            addMessage({
                type: 'brandList',
                bot: true,
                
            });

        }, 250);

    }


    const renderCategoryList = (categoryArray) => {

        return categoryArray.map(category => {
            return (
                <div key={category} className={styles['category']} onClick={() => { setCategoryAndAddBrandsMessage(category)}}>
                    <span>{category}</span>
                </div>
            );
        })
    }

    const handleSearch = (text) => {

        setSearch(text.toLowerCase());
    }


    return !loading ? (
        <div ref={productCategoryMessageRef} className={styles['container']}>
             <div className={styles['search-div']}>
                <input
                    name="categorySearch"
                    type='text'
                    className={styles['search-box']}
                    placeholder='Search Categories...'
                    onChange={(e) => { handleSearch(e.target.value) }}
                />
            </div>
            <div className={styles['category-container']}>
                {
                    renderCategoryList(categoryList.filter(category => category.toLowerCase().includes(search)))
                }
            </div>
            <div className={styles['footer']}>
                <GoBackButton goBackFrom={'category'} />
                <GoBackButton restart />
            </div>
        </div>
    ) : (
        <IsTyping/>
    );
}

const mapStateToProps = state => ({
    productType: selectProductType(state),
});

const mapDispatchToProps = dispatch => ({
    addMessage: message => dispatch(addMessage(message)),
    popMessage: () => dispatch(popMessage()),
    setProductCategory: (category) => dispatch(setProductCategory(category)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCategoryMessage);
