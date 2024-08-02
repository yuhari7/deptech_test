import { useState } from 'react';
import styles from '@/styles/layout/Navbar.module.scss'; // Import SCSS module
import LogoutButton from '../LogoutButton';

const Navbar = ({ userName }) => {
    
  userName = "Admin User"; // Replace with actual user name if dynamic
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Implement search functionality here if needed
  };

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
        {/* <img src="/profile-icon.png" alt="Profile" className={styles.profileIcon} /> */}
        {/* Optionally, you can add a dropdown menu or other profile-related functionality */}
      </div>
    </nav>
  );
};

export default Navbar;
