import { useState } from 'react';
import styles from '@/styles/layout/Navbar.module.scss'; // Import SCSS module
import LogoutButton from '../LogoutButton';

const Navbar = ({ userName, onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  userName = userName || 'Local User';

  return (
    <nav className={styles.navbar}>
      <div className={styles.userName}>Hello, {userName}</div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.profile}>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
