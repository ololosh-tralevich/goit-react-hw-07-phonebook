import actions from './contacts-actions';
import services from '../../shared/services/fetchContacts';

const fetchContacts = () => {
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

const addContact = contactData => {
  const func = async (dispatch, getState) => {
    const { contacts } = getState();
    const { name, phone } = contactData;
    const clone = contacts.contacts.find(
      clone => clone.name === name || clone.phone === phone
    );
    if (clone) {
      return alert(`${name} is already in your contacts`);
    }

    dispatch(actions.addRequest());
    try {
      const newContact = await services.addContact(contactData);
      dispatch(actions.addSuccess(newContact));
    } catch (error) {
      dispatch(actions.addError(error));
    }
  };
  return func;
};

const removeContact = contactId => {
  const func = async dispatch => {
    dispatch(actions.removeRequest());
    try {
      await services.removeContact(contactId);
      dispatch(actions.removeSuccess(contactId));
    } catch (error) {
      dispatch(actions.removeError(error));
    }
  };
  return func;
};

const operations = {
  fetchContacts,
  addContact,
  removeContact,
};

export default operations;
