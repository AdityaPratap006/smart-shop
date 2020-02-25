import React from 'react';
import styles from './ProductModal.module.scss';

import { ReactComponent as CrossIcon } from '../../assets/times-solid.svg';

const ProductModal = ({ setModal, setModalProduct, product }) => {


    return (
        <div className={styles['modal']} >
            <div className={styles['header']}>
                <img alt={product.name} src={product.image} />
                <div className={styles['close-btn']} onClick={() => { setModal(false); setModalProduct({}); }}>
                    <CrossIcon style={{
                        width: '50%',
                    }} />
                </div>
            </div>
            <div className={styles['body']}>
                <div className={styles['name-section']}>
                    <div className={styles['left']}>
                        
                        <p className={styles['name']}>{product.name}</p>
                    </div>
                    <div className={styles['right']}>
                        <p className={styles['price']}>Rs. {product.price}</p>
                    </div>
                </div>
                <div className={styles['description']}>

                </div>
            </div>
        </div>
    )
}

export default ProductModal;
