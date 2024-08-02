// pages/products/index.js
import { useState } from "react";
import { getProducts } from "@/pages/api/product";
import { getCategories } from "@/pages/api/category";
import Image from "next/image";
import Layout from "@/components/admin-dashboard/Layout";
import styles from "@/styles/products/Product.module.scss";
import Link from "next/link";
import axios from "axios";

const ProductsPage = ({ initialProducts, categories }) => {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
        );
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "/default_image.png"; // Default image if no imagePath provided
    return imagePath.startsWith("http") ? imagePath : `/${imagePath}`;
  };

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.categoryName : "Unknown";
  };

  return (
    <Layout pageTitle="Products">
      <div className={styles.container}>
        <h1 className={styles.header}>Products</h1>
        <Link href="/admin/products/create" className={styles.createButton}>
          Create Product
        </Link>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Product Image</th>
              <th>Stock</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.productDescription}</td>
                <td>
                  <Image
                    width={100}
                    height={100}
                    src={getImageSrc(product.productImage)}
                    alt={product.productName}
                    className={styles.productImage}
                  />
                </td>
                <td>{product.stock}</td>
                <td>{getCategoryName(product.categoryId)}</td>
                <td>
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <button className={styles.buttonEdit}>Edit</button>
                  </Link>
                  <button
                    className={styles.buttonDelete}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
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
  // Fetch products and categories
  const [initialProducts, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return {
    props: { initialProducts, categories },
  };
}

export default ProductsPage;
