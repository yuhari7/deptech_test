import { useState, useEffect } from 'react';
import { createProduct } from '@/pages/api/product';
import { getCategories } from '@/pages/api/category';
import Layout from '@/components/admin-dashboard/Layout';
import styles from '@/styles/products/CreateProduct.module.scss';
import { useRouter } from 'next/router';

const CreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [stock, setStock] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productDescription || !productImage || !categoryId || !stock) {
      setError("All fields are required.");
      return;
    }

    const product = {
      productName,
      productDescription,
      productImage,
      categoryId,
      stock,
    };

    try {
      await createProduct(product);
      setSuccess('Product created successfully');
      router.push('/admin/products');
    } catch (error) {
      console.error("Error creating product:", error);
      setError('Failed to create product');
    }
  };

  return (
    <Layout pageTitle="Create Product">
      <div className={styles.container}>
        <h1 className={styles.header}>Create Product</h1>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </label>
          <label>
            Product Description:
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Product Image URL:
            <input
              type="text"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              required
            />
          </label>
          <label>
            Category:
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Stock:
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </label>
          <button type="submit" className={styles.submitButton}>Create Product</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProduct;
