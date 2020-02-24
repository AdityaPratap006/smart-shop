import React from 'react';
import styles from './ProductModal.module.scss';

import { ReactComponent as CrossIcon } from '../../assets/times-solid.svg';

const ProductModal = ({ setModal, setModalProduct, product }) => {
    return (
        <div className={styles['modal']} >
            <div className={styles['header']}>
                <img alt={product.name} src={`https://i.imgur.com/2Dc9L9H.jpg`}/>
                <div className={styles['close-btn']} onClick={() => { setModal(false); setModalProduct({}); }}>
                    <CrossIcon style={{
                        width:'50%',
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default ProductModal;
