import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/admin-dashboard/Layout.jsx";
import styles from "@/styles/transactions/TransactionDetail.module.scss";
import Link from "next/link";

const TransactionDetailPage = ({ transaction }) => {
  const router = useRouter();
  const { id } = router.query;

  if (!transaction) {
    return <p>No transaction data found.</p>;
  }

  return (
    <Layout pageTitle={`Transaction ${id} Details`}>
      <div className={styles.transactionDetailContainer}>
        <h1>Transaction Details</h1>
        <div className={styles.transactionHeader}>
          <h2>ID: {transaction.id}</h2>
          <p>Type: {transaction.transactionType}</p>
          <p>Date: {new Date(transaction.transactionDate).toLocaleDateString()}</p>
        </div>
        <h3>Details:</h3>
        {transaction.TransactionDetails.length > 0 ? (
          <table className={styles.transactionDetailsTable}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Stock Remaining</th>
              </tr>
            </thead>
            <tbody>
              {transaction.TransactionDetails.map((detail) => (
                <tr key={detail.id}>
                  <td>
                  <Link href={`/admin/products/${detail.productId}`}>
                    {detail.Product.productName}
                  </Link>
                    </td>
                  <td>{detail.quantity}</td>
                  <td>{detail.Product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No details available.</p>
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${id}`);
    return {
      props: {
        transaction: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    return {
      props: {
        transaction: null,
      },
    };
  }
}

export default TransactionDetailPage;
