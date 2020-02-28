import { createSelector } from 'reselect';

const selectRegisterUser = state => state.registerUser;

export const selectRegisterUserName = createSelector(
    [selectRegisterUser],
    registerUser => registerUser.name
);

export const selectRegisterUserProfilePic = createSelector(
    [selectRegisterUser],
    registerUser => registerUser.profilePicUrl
);