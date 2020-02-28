import { SET_NAME, SET_PROFILE_PIC } from './registerUser.types';

export const setName = (name) => ({
    type: SET_NAME,
    payload: name,
});

export const setProfilePic = (url) => ({
    type: SET_PROFILE_PIC,
    payload: url,
});