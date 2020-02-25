import React from 'react';
import styles from './ProductCard.module.scss';

import { connect } from 'react-redux';

// import { ReactComponent as InfoIcon } from '../../assets/info-solid.svg';


const ProductCard = ({product, setModal, setModalProduct }) => {

    

    return (
        <>
        <div className={styles['card']}>
            <img alt={product.name} src={product.image} className={styles['product-image']}/>
            <div className={styles['title']}>
                <span className={styles['name']}> {`${product.name}`} </span>
                <span className={styles['price']}> {`Rs. ${product.price}`} </span>
            </div>
            <div className={styles['footer']}>
                <div className={styles['see-details-btn']} onClick={() => { setModal(true); setModalProduct(product); }}>
                    {/* <InfoIcon style={{
                        height: '70%',
                    }}/> */}
                    DETAILS
                </div>
            </div>
           
        </div>
        
        </>
    );
}

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCard);
