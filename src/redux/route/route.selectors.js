import { createSelector } from 'reselect';

const selectRoute = state => state.route;

export const selectCurrentRoute = createSelector(
    [selectRoute],
    route => route.currentRoute
);
