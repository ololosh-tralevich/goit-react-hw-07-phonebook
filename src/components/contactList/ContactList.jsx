import { useSelector, shallowEqual } from 'react-redux';

import PropTypes from 'prop-types';

import styles from './contactList.module.css';
import { getLoading, getError } from 'redux/contacts/contacts-selectors';

const ContactList = ({ filteredContacts, deleteContactBtn }) => {
  const loading = useSelector(getLoading, shallowEqual);
  const error = useSelector(getError, shallowEqual)

  const partOfCode = filteredContacts.map(contact => {
    return (
      <li className={styles.listItem} key={contact.id}>
        <button
          className={styles.removeContactBtn}
          onClick={() => deleteContactBtn(contact.id)}
          id={contact.id}
        >
          Delete
        </button>
        <span className={styles.listDash}>&#8212;</span>
        <p>
          {contact.name}: {contact.phone}
        </p>
      </li>
    );
  });

  return (
    <div className={styles.mainContainer}>
      {!loading || <div className={styles.ldsDualRing}></div>}
      {!error || <h2>Something went wrong...</h2>}
      <ul>{partOfCode}</ul>
    </div>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  deleteContactBtn: PropTypes.func.isRequired,
};
