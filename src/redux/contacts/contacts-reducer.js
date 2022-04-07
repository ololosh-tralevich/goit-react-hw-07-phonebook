import { createReducer, combineReducers } from '@reduxjs/toolkit';
import operations from './contacts-operations';
import filterAction from './contacts-actions';

const filter = createReducer('', {
  [filterAction]: (state, { payload }) => {
    return (state = payload);
  },
});

const contacts = createReducer([], {
  [operations.fetchContacts.fulfilled]: (_, { payload }) => [...payload],
  [operations.addContact.fulfilled]: (state, { payload }) => [
    ...state,
    payload,
  ],
  [operations.removeContact.fulfilled]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const loading = createReducer(false, {
  [operations.fetchContacts.pending]: () => true,
  [operations.fetchContacts.fulfilled]: () => false,
  [operations.fetchContacts.rejected]: () => false,

  [operations.addContact.pending]: () => true,
  [operations.addContact.fulfilled]: () => false,
  [operations.addContact.rejected]: () => false,

  [operations.removeContact.pending]: () => true,
  [operations.removeContact.fulfilled]: () => false,
  [operations.removeContact.rejected]: () => false,
});

const error = createReducer(null, {
  [operations.fetchContacts.rejected]: (_, { payload }) => payload,
  [operations.addContact.rejected]: (_, { payload }) => payload,
  [operations.removeContact.rejected]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  filter,
  contacts,
  loading,
  error,
});

export default contactsReducer;
