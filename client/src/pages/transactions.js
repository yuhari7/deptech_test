import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getProducts } from "@/pages/api/product"; // Make sure this function is defined correctly
import { createTransaction } from "@/pages/api/transaction";
import Layout from "@/components/admin-dashboard/Layout";
import styles from "@/styles/transactions/CreateTransaction.module.scss";

const CreateTransaction = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [transactionType, setTransactionType] = useState("Purchase");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString()
  );
  const [adminId, setAdminId] = useState(1); // Adjust based on your logic
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    const [productId, field] = name.split(":");

    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleAddProduct = (productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: { productId, quantity: "" },
    }));
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => {
      const { [productId]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productsArray = Object.values(selectedProducts).map((item) => ({
        productId: item.productId,
        quantity: parseInt(item.quantity, 10),
      }));

      const response = await createTransaction({
        transactionType,
        transactionDate,
        adminId,
        details: productsArray,
      });

      setSuccess("Transaction created successfully");
      router.push("/transactions");
    } catch (error) {
      console.error("Failed to create transaction:", error);
      setError("Failed to create transaction");
    }
  };

  return (
    <Layout pageTitle="Create Transaction">
      <div className={styles.createTransactionContainer}>
        <h1>Create Transaction</h1>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form className={styles.createTransactionForm} onSubmit={handleSubmit}>
          <label htmlFor="transactionType">Transaction Type:</label>
          <select
            id="transactionType"
            name="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="Purchase">Purchase</option>
            <option value="Sale">Sale</option>
          </select>
          <label htmlFor="transactionDate">Transaction Date:</label>
          <input
            type="datetime-local"
            id="transactionDate"
            name="transactionDate"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
          {/* <label htmlFor="adminId">Admin ID:</label>
          <input
            type="number"
            id="adminId"
            name="adminId"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          /> */}
          <label>Products:</label>
          {products.length ? (
            products.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <p>{product.productName}</p>
                <button
                  type="button"
                  onClick={() => handleAddProduct(product.id)}
                >
                  Add
                </button>
                {selectedProducts[product.id] && (
                  <input
                    type="number"
                    name={`${product.id}:quantity`}
                    value={selectedProducts[product.id].quantity}
                    onChange={handleProductChange}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
          <button type="submit">Create Transaction</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTransaction;
