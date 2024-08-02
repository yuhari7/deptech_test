import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import styles from '@/styles/layout/SearchableList.module.scss';

const SearchableList = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    // Filter items based on search term
    const results = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchTerm, items]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Navbar userName="Admin User" />
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <ul className={styles.itemList}>
          {filteredItems.map(item => (
            <li key={item.id} className={styles.item}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchableList;
