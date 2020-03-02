import { SET_CURRENT_ROUTE } from './route.types';

export const setCurrentRoute = (route) => ({
    type: SET_CURRENT_ROUTE,
    payload: route,
});