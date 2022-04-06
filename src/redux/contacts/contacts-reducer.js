import { createReducer, combineReducers } from '@reduxjs/toolkit';
import actions from './contacts-actions';

const filter = createReducer('', {
  [actions.filterContacts]: (state, { payload }) => {
    return (state = payload);
  },
});
// console.log('re')
// export const contactsReducer = createReducer([], {
//   [actions.add]: (state, { payload }) => {
//     // console.log(initialState.contacts)
//     state.push(payload);
//   },

//   [actions.remove]: (state, { payload }) => {
//     return state.filter(item => item.id !== payload);
//   },
// });

const contacts = createReducer([], {
  [actions.fetchSuccess]: (_, { payload }) => [...payload],
  [actions.addSuccess]: (state, { payload }) => state.push(payload),
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
  contacts,
  loading,
  error,
  filter,
})

export default contactsReducer;