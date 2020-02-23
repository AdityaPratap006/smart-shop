import { SET_PRODUCT_TYPE, SET_PRODUCT_CATEGORY, SET_PRODUCT_BRAND, SET_PRODUCT_LIST } from './products.types';

export const setProductType = (productType) => {

    return {
        type: SET_PRODUCT_TYPE,
        payload: productType,
    };
}

export const setProductCategory = (productCategory) => {

    return {
        type: SET_PRODUCT_CATEGORY,
        payload: productCategory,
    };
}

export const setProductBrand = (productBrand) => {

    return {
        type: SET_PRODUCT_BRAND,
        payload: productBrand,
    };
}

export const setProductList = (productList) => {

    return {
        type: SET_PRODUCT_LIST,
        payload: productList,
    };
}