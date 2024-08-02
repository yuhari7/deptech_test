import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styles from "@/styles/layout/Layout.module.scss";
import Head from "next/head";

const Layout = ({ children, userName, pageTitle }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle || `${pageTitle}`}</title>
        <meta name="description" content="Admin Dashboard" />
      </Head>
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar userName={userName} />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
