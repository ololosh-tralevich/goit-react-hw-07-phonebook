import { createAction } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// console.log('re')
const filter = createAction('contacts/filter');

const fetchRequest = createAction('contacts/fetchRequest');
const fetchSuccess = createAction('contacts/fetchSuccess');
const fetchError = createAction('contacts/fetchError');

const addRequest = createAction('contacts/addRequest');
const addSuccess = createAction('contacts/addSuccess');
const addError = createAction('contacts/addError');

const removeRequest = createAction('contacts/removeRequest');
const removeSuccess = createAction('contacts/removeSuccess');
const removeError = createAction('contacts/removeError');

const actions = {
  filter,

  fetchRequest,
  fetchSuccess,
  fetchError,

  addRequest,
  addSuccess,
  addError,

  removeRequest,
  removeSuccess,
  removeError,
}

export default actions