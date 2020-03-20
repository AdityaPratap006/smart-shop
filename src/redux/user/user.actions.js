import { SET_CURRENT_USER, SET_IS_LOADING_USER } from './user.types';

export const setCurrentUser = (user) => {
    return ({
        type: SET_CURRENT_USER,
        payload: user,
    });
}

export const setIsLoadingUser = (flag) => {
    return ({
        type: SET_IS_LOADING_USER,
        payload: flag,
    });
}