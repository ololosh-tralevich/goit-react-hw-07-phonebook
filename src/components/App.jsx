import { useEffect, useRef, useCallback } from 'react';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import actions from '../redux/contacts/contacts-actions';
import { getAllContacts } from '../redux/contacts/contacts-selectors';
import { getFilter } from '../redux/contacts/contacts-selectors';

import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

import styles from './app.module.css';

export const App = () => {
  const contacts = useSelector(getAllContacts, shallowEqual);
  const filter = useSelector(getFilter, shallowEqual);

  const dispatch = useDispatch();

  const firstRender = useRef(true);

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (firstRender.current && localContacts?.length) {
      for (let contact of localContacts) {
        dispatch(actions.add(contact));
      }
    }
    if (!firstRender.current && localContacts?.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    firstRender.current = false;
    //eslint-disable-next-line
  }, [contacts]);

  const filteringContacts = useCallback(ev => {
    dispatch(actions.filterContacts(ev.target.value));
    //eslint-disable-next-line
  }, []);

  const addNewContact = contactData => {
    const { name, number } = contactData;
    const clone = contacts.find(
      clone => clone.name === name || clone.number === number
    );

    if (clone) {
      return alert(`${name} is already in your contacts`);
    }

    dispatch(actions.add(contactData));
  };

  const deleteContact = id => {
    dispatch(actions.remove(id));
  };

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
