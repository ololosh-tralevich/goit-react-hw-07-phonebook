import actions from './contacts-actions';
import services from '../../shared/services/fetchContacts';

const fetchContacts = () => {
    // console.log('detch')
  const func = async dispatch => {
    dispatch(actions.fetchRequest());
    try {
      const result = await services.getContacts();
      dispatch(actions.fetchSuccess(result));
    } catch (error) {
      dispatch(actions.fetchError(error));
    }
  };
  return func;
};

const addContacts = (contacts) => {
  const func = async dispatch => {
    dispatch(actions.addRequest());
    try {
      const result = await services.addContacts(contacts);
      dispatch(actions.addSuccess(result));
    } catch (error) {
      dispatch(actions.addError(error))
    }
  }
  return func;
}


const operations = {
    fetchContacts,
    addContacts
}

export default operations