import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/admin-dashboard/Layout";
import styles from "@/styles/users/Dashboard.module.scss";
import Cookies from "js-cookie";

const AdminsPage = ({
  admins,
  transactionCount,
  productCount,
  userCount,
  newestTransactions,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout pageTitle="Admin Dashboard">
      <div className={styles.dashboardContainer}>
        <h1 className={styles.header}>Admin Dashboard</h1>

        <div className={styles.statsContainer}>
          <div className={styles.statsCard}>
            <h2>Number of Users</h2>
            <p>{userCount}</p>
          </div>
          <div className={styles.statsCard}>
            <h2>Number of Transactions</h2>
            <p>{transactionCount}</p>
          </div>
          <div className={styles.statsCard}>
            <h2>Number of Products</h2>
            <p>{productCount}</p>
          </div>
        </div>

        <div className={styles.transactionsList}>
          <h2>Newest Transactions</h2>
          {newestTransactions.length > 0 ? (
            <table className={styles.transactionsTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {newestTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.transactionType}</td>
                    <td>
                      {new Date(
                        transaction.transactionDate
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <a href={`/admin/transactions/${transaction.id}`}>
                        <button className={styles.detailsLink}>
                          View Details
                        </button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token || ""; // Adjust if you're storing the token in cookies

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admins`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    return {
      props: {
        admins: data.admins || [], // Ensure admins is an array
        transactionCount: data.transactionCount || 0,
        productCount: data.productCount || 0,
        userCount: data.userCount || 0,
        newestTransactions: data.newestTransactions || [], // Ensure newestTransactions is an array
      },
    };
  } catch (error) {
    return {
      props: {
        admins: [],
        transactionCount: 0,
        productCount: 0,
        userCount: 0,
        newestTransactions: [],
      },
    };
  }
}

export default AdminsPage;
