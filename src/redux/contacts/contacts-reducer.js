import { createReducer } from '@reduxjs/toolkit';
import actions from './contacts-actions';

export const contactsReducer = createReducer([], {
  [actions.add]: (state, { payload }) => {
    state.push(payload);
  },

  [actions.remove]: (state, { payload }) => {
    return state.filter(item => item.id !== payload);
  },
});

export const filterReducer = createReducer('', {
  [actions.filterContacts]: (state, { payload }) => {
    return (state = payload);
  },
});
