import { createSelector } from 'reselect';

const selectProducts = state => state.products;

export const selectProductType = createSelector(
    [selectProducts],
    products => products.type
);

export const selectProductCategory = createSelector(
    [selectProducts],
    products => products.category
);

export const selectProductBrand = createSelector(
    [selectProducts],
    products => products.brand
);

export const selectProductList = createSelector(
    [selectProducts],
    products => products.list
);