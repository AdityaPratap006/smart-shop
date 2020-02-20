import { createSelector } from 'reselect';

const selectMessages = state => state.messages;

export const selectMessageList = createSelector(
    [selectMessages],
    messages => messages.messageList
)