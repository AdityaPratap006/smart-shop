import { SET_CURRENT_USER, SET_IS_LOADING_USER } from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    loadingUser: true,
};

const userReducer = (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
                loadingUser: false,
            };
        
        case SET_IS_LOADING_USER:
            return {
                ...state,
                loadingUser: payload,
            }

        default:
            return state;
    }

}

export default userReducer;