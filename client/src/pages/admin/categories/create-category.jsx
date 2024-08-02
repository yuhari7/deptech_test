import { useState } from 'react';
import { createCategory } from '@/pages/api/category'; // Import the create function
import Layout from '@/components/admin-dashboard/Layout';
import styles from '@/styles/categories/CreateCategory.module.scss';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newCategory = { categoryName, categoryDescription };
      await createCategory(newCategory);
      setSuccess('Category created successfully');
      // Optionally, you can reset the form here
      setCategoryName('');
      setCategoryDescription('');
    } catch (error) {
      setError('Failed to create category');
      console.error('Error creating category:', error);
    }
  };

  return (
    <Layout pageTitle="Create Category">
      <div className={styles.container}>
        <h1 className={styles.header}>Create New Category</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          
          <label>
            Category Name:
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </label>
          
          <label>
            Description:
            <textarea
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              required
            />
          </label>
          
          <button type="submit" className={styles.submitButton}>Create Category</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCategory;
