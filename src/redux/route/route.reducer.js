import { SET_CURRENT_ROUTE } from './route.types';

const INITIAL_STATE = {
    currentRoute: '/home',
}

const routeReducer = (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_CURRENT_ROUTE:
            return {
                ...state,
                currentRoute: payload,
            };
    
        default:
            return state;
    }
}

export default routeReducer;