import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getProductById } from "@/pages/api/product";
import { getCategories } from "@/pages/api/category";
import { updateProduct } from "@/pages/api/product";
import Layout from "@/components/admin-dashboard/Layout";
import styles from "@/styles/products/EditProduct.module.scss";

const EditProductPage = ({ product, categories }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    stock: "",
    categoryId: "",
    productImage: "", // Change to string to handle URL input
  });
  const [imagePreview, setImagePreview] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        productDescription: product.productDescription,
        stock: product.stock,
        categoryId: product.categoryId,
        productImage: product.productImage || "", // Initialize with URL if available
      });
      setImagePreview(product.productImage || "/default_image.png");
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "productImage") {
      // Basic URL validation
      const isValidUrl = value.match(/\.(jpeg|jpg|gif|png)$/) !== null;
      if (isValidUrl || value === "") {
        setImagePreview(value || "/default_image.png");
      } else {
        setImagePreview("/default_image.png");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = await updateProduct(router.query.id, formData);
      console.log("Product updated:", updatedProduct);
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Layout pageTitle="Edit Product">
      <div className={styles.container}>
        <h1 className={styles.header}>Edit Product</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />

          <label htmlFor="productDescription">Description</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <label htmlFor="categoryId">Category</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <label htmlFor="productImage">Product Image URL</label>
          <input
            type="text"
            id="productImage"
            name="productImage"
            value={formData.productImage}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.imagePreview}
          />

          <button type="submit" className={styles.submitButton}>Update Product</button>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const [product, categories] = await Promise.all([
    getProductById(params.id),
    getCategories(),
  ]);

  return {
    props: { product, categories },
  };
}

export default EditProductPage;
