// components/Sidebar.js
import Link from 'next/link';
import styles from "@/styles/layout/Sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link href="/admin">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/users">
            Users
          </Link>
        </li>
        <li>
          <Link href="/admin/categories">
            Categories
          </Link>
        </li>
        <li>
          <Link href="/admin/products">
            Products
          </Link>
        </li>
        <li>
          <Link href="/admin/transactions">
            Transactions
          </Link>
        </li>
        <li>
          <Link href="/admin/settings">
            Settings
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
