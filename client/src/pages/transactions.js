import { useState, useEffect } from "react";
import { getTransactions, createTransaction } from "./api/transaction";
import { getProducts, getProductById, updateProduct } from "./api/product";
import styles from "@/styles/transactions/CreateTransaction.module.scss";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("StockIn");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString()
  );
  const [details, setDetails] = useState([
    { productId: "", quantity: "", productName: "" },
  ]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
    fetchProducts();
  }, []);

  const handleAddDetail = () => {
    setDetails([...details, { productId: "", quantity: "", productName: "" }]);
  };

  const handleDetailChange = async (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;

    if (field === "productId") {
      try {
        const product = await getProductById(value);
        updatedDetails[index].productName = product ? product.productName : "";
      } catch (error) {
        console.error("Error fetching product:", error);
        updatedDetails[index].productName = "";
      }
    }

    setDetails(updatedDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate stock levels for 'Sell' transactions
    if (transactionType === "StockOut") {
      let isStockSufficient = true;

      for (const detail of details) {
        const product = products.find((p) => p.id === Number(detail.productId));
        if (product && product.stock < detail.quantity) {
          isStockSufficient = false;
          break;
        }
      }

      if (!isStockSufficient) {
        setError("Insufficient stock for one or more products.");
        return; // Exit the function to prevent transaction creation
      }
    }

    const transactionData = {
      transactionType,
      transactionDate,
      details: details.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
    };

    try {
      // Create the transaction
      await createTransaction(transactionData);
      alert("Transaction created successfully!");

      // Update the stock levels
      for (const detail of details) {
        const product = products.find((p) => p.id === Number(detail.productId));
        if (product) {
          const newStock =
            transactionType === "StockIn"
              ? product.stock + Number(detail.quantity)
              : product.stock - Number(detail.quantity);

          // Update the product stock
          await updateProduct(product.id, { stock: newStock });
        }
      }

      // Reset the form
      setTransactionType("StockIn");
      setTransactionDate(new Date().toISOString());
      setDetails([{ productId: "", quantity: "", productName: "" }]);
      setError(""); // Clear any previous errors

      // Fetch updated transactions
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error creating transaction:", error);
      // setError("Error creating transaction. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Transaction Management</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="transactionType">Transaction Type</label>
          <select
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="StockIn">Purchase</option>
            <option value="StockOut">Sell</option>
          </select>
        </div>
        <div>
          <label htmlFor="transactionDate">Transaction Date</label>
          <input
            id="transactionDate"
            type="datetime-local"
            value={new Date(transactionDate).toISOString().slice(0, 16)}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
        </div>
        {details.map((detail, index) => (
          <div key={index}>
            <h3>Detail {index + 1}</h3>
            <div>
              <label htmlFor={`productId-${index}`}>Product</label>
              <select
                id={`productId-${index}`}
                value={detail.productId}
                onChange={(e) =>
                  handleDetailChange(index, "productId", e.target.value)
                }
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`quantity-${index}`}>Quantity</label>
              <input
                id={`quantity-${index}`}
                type="number"
                value={detail.quantity}
                onChange={(e) =>
                  handleDetailChange(index, "quantity", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddDetail}>
          Add Detail
        </button>
        <button type="submit">Create Transaction</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default TransactionPage;
