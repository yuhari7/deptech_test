import { useState } from 'react';
import { createCategory } from '@/pages/api/category';
import Layout from '@/components/admin-dashboard/Layout';
import styles from '@/styles/categories/CreateCategory.module.scss';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    return categoryName.trim() !== '' && categoryDescription.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Please fill in all fields.');
      return;
    }

    setError(null);
    setSuccess('');
    setIsSubmitting(true);

    try {
      const newCategory = { categoryName, categoryDescription };
      await createCategory(newCategory);
      setSuccess('Category created successfully');
      setCategoryName('');
      setCategoryDescription('');
    } catch (error) {
      setError('Failed to create category');
      console.error('Error creating category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout pageTitle="Create Category">
      <div className={styles.container}>
        <h1 className={styles.header}>Create New Category</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <label className={styles.label}>
            Category Name:
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <label className={styles.label}>
            Description:
            <textarea
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className={styles.textarea}
              required
            />
          </label>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Category'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCategory;
