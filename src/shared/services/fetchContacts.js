import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://624d69a6c172b69d69329be0.mockapi.io',
});

const getContacts = async () => {
  const { data } = await instance.get('/contacts');
  console.log('GET:', data);
  return data;
};

const addContact = async data => {
  console.log('ADD:', data);
  const { data: result } = await instance.post('/contacts', data);
  return result;
};

const removeContact = async contactId => {
  const { data: result } = await instance.delete(`/contacts/${contactId}`);
  console.log('REMOVE:', result);
  return result.id;
};

const services = {
  getContacts,
  addContact,
  removeContact,
};

export default services;
