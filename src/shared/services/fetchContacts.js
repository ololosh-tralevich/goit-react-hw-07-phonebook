import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://624d69a6c172b69d69329be0.mockapi.io',
});

const getContacts = async () => {
    const { data } = await instance.get('/contacts');
    console.log('GET:', data)
  return data;
};

const addContacts = async (data) => {
  const {data: result} = await instance.post('/contacts', data);
  console.log('ADD:', result)
  return result;
}



const services = {
    getContacts,
    addContacts,
}

export default services;