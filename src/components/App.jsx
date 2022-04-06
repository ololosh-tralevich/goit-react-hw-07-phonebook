import { useEffect, useRef, useCallback } from 'react';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import actions from '../redux/contacts/contacts-actions';
import operations from '../redux/contacts/contacts-operations';
import { getContacts, getFilter } from '../redux/contacts/contacts-selectors';

import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

import styles from './app.module.css';
import { nanoid } from 'nanoid';

export const App = () => {
  const contacts = useSelector(getContacts, shallowEqual);
  const filter = useSelector(getFilter, shallowEqual);
  // console.log(filter)
  const fetchContacts = () => dispatch(operations.fetchContacts());
  const addContacts = (data) => dispatch(operations.addContacts(data))

  const dispatch = useDispatch();

  const firstRender = useRef(true);

  // useEffect(() => {
  //   const localContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (firstRender.current && localContacts?.length) {
  //     for (let contact of localContacts) {
  //       dispatch(actions.add(contact));
  //     }
  //   }
  //   if (!firstRender.current && localContacts?.length !== contacts.length) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  //   firstRender.current = false;
  //   //eslint-disable-next-line
  // }, [contacts]);

  useEffect(() => {
    fetchContacts();
    // addContacts()
  }, []);

  
  
  const addNewContact = contactData => {
    const { name, number } = contactData;
    const clone = contacts.find(
      clone => clone.name === name || clone.number === number
    );

    if (clone) {
      return alert(`${name} is already in your contacts`);
    }
    const contactObj = {
      // createdAt
      "name": name,
      "phone": number,
      "id": nanoid(),
    }
    // dispatch(actions.add(contactData));
    addContacts(contactObj)
  };

  // {
  //   "createdAt": "2022-04-05T22:16:36.866Z",
  //   "name": "Max Collier",
  //   "phone": "440-504-5940",
  //   "id": "2"
  //  }
  

  const deleteContact = id => {
    dispatch(actions.remove(id));
  };


  const filteringContacts = useCallback(ev => {
    dispatch(actions.filterContacts(ev.target.value));
    //eslint-disable-next-line
  }, []);
  
  const filteredContacts = () => {
  // console.log(contacts);
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
      );
    return filteredContacts;
    // return [];
  };
  // const filteredContacts = [];

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
