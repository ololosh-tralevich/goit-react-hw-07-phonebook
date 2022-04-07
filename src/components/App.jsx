import { useEffect, useCallback } from 'react';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import operations from '../redux/contacts/contacts-operations';
import filterAction from '../redux/contacts/contacts-actions';
import { getContacts, getFilter } from '../redux/contacts/contacts-selectors';

import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

import styles from './app.module.css';

export const App = () => {
  const contacts = useSelector(getContacts, shallowEqual);
  const filter = useSelector(getFilter, shallowEqual);

  const dispatch = useDispatch();
  const fetchContacts = () => dispatch(operations.fetchContacts());
  const addContact = data => dispatch(operations.addContact(data));
  const removeContact = contactId =>
    dispatch(operations.removeContact(contactId));

  useEffect(() => {
    fetchContacts();
    //eslint-disable-next-line
  }, []);

  const addNewContact = contactData => {
    addContact(contactData);
  };

  const deleteContact = id => {
    removeContact(id);
  };

  const filteringContacts = useCallback(ev => {
    dispatch(filterAction(ev.target.value));
    // eslint-disable-next-line
  }, []);

  const filteredContacts = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return filteredContacts;
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contactContainer}>
        <ContactForm onSubmit={addNewContact} />
      </div>

      <div className={styles.listContainer}>
        <h2>Contacts</h2>
        <Filter filteringContacts={filteringContacts} filter={filter} />
        <ContactList
          deleteContactBtn={deleteContact}
          filteredContacts={filteredContacts()}
        />
      </div>
    </div>
  );
};
