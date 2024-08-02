import { useState, useEffect } from 'react';
import { getTransactions } from '@/pages/api/transaction';
import Layout from '@/components/admin-dashboard/Layout';
import styles from '@/styles/transactions/Transaction.module.scss';
import Link from 'next/link';

const TransactionsPage = ({ initialTransactions }) => {
  const [transactions, setTransactions] = useState(initialTransactions);

  return (
    <Layout pageTitle="Transactions">
      <div className={styles.container}>
        <h1 className={styles.header}>Transactions</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Transaction Type</th>
              <th>Transaction Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.transactionDate}</td>
                <td>
                  <Link href={`/admin/transactions/${transaction.id}`}>
                    <button className={styles.buttonDetail}>View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const initialTransactions = await getTransactions();
  return {
    props: { initialTransactions },
  };
}

export default TransactionsPage;
