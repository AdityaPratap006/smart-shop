import React from 'react';
import styles from './Cart.module.scss';

import { connect } from 'react-redux'


const Cart = () => {
    

    return (
        <div className={styles['cart']}>

        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
