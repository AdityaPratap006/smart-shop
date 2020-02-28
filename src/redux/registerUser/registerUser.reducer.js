import { SET_NAME, SET_PROFILE_PIC } from './registerUser.types';

const INITIAL_STATE = {
    name: '',
    profilePicUrl: 'https://image.flaticon.com/icons/svg/145/145848.svg',
}

const registerUserReducer = (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_NAME:

            return {
                ...state,
                name: payload
            };

        case SET_PROFILE_PIC:

            return {
                ...state,
                profilePicUrl: payload
            };

        default:
            return state;
    }
}

export default registerUserReducer;