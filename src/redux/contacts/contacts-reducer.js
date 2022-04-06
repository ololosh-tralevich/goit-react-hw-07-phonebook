import { createReducer, combineReducers } from '@reduxjs/toolkit';
import actions from './contacts-actions';

const filter = createReducer('', {
  [actions.filter]: (state, { payload }) => {
    return (state = payload);
  },
});

const contacts = createReducer([], {
  [actions.fetchSuccess]: (_, { payload }) => [...payload],
  [actions.addSuccess]: (state, { payload }) => [...state, payload],
  [actions.removeSuccess]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const loading = createReducer(false, {
  [actions.fetchRequest]: () => true,
  [actions.fetchSuccess]: () => false,
  [actions.fetchError]: () => false,

  [actions.addRequest]: () => true,
  [actions.addSuccess]: () => false,
  [actions.addError]: () => false,

  [actions.removeRequest]: () => true,
  [actions.removeSuccess]: () => false,
  [actions.removeError]: () => false,
});

const error = createReducer(null, {
  [actions.fetchError]: (_, { payload }) => payload,
  [actions.addError]: (_, { payload }) => payload,
  [actions.removeError]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  filter,
  contacts,
  loading,
  error,
});

export default contactsReducer;
