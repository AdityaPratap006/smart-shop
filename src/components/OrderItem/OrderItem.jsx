import React from 'react';
import styles from './OrderItem.module.scss';

const formatDate = (dateString) => {

    const date = new Date(dateString);

    const monthMap = { 
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
    };

    const dayMap = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
    } 

    const day = dayMap[date.getDay()];
    const month = monthMap[date.getMonth()];
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const dateNum = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const year = date.getFullYear();

    return `${day} ${month},${dateNum} ${year}    ${hours}:${min}`

}


const OrderItem = ({ item }) => {
    return (
        <div className={styles['order-card']}>
            <div className={styles['title']}>
                {item.name}
            </div>

            <div className={styles['body']}>
                <div className={styles['image-div']}>
                    <img alt='product' src={item.image} />
                </div>
                <div className={styles['details']}>
                    <h5>Qty: {item.cartQuantity}</h5>
                    <h5>Amount: {`₹ ${item.cartQuantity * item.price}`}</h5>
                </div>
            </div>
            <div className={styles['footer']}>
                    Ordered on: {` ${formatDate(item.orderedAt)}`}
            </div>
        </div>
    )
}

export default OrderItem;
