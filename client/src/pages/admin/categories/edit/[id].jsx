import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCategories, updateCategory } from '@/pages/api/category';
import styles from '@/styles/categories/EditCategory.module.scss';
import Layout from '@/components/admin-dashboard/Layout';

const EditCategory = ({ category }) => {
  const [categoryName, setCategoryName] = useState(category.categoryName || '');
  const [categoryDescription, setCategoryDescription] = useState(category.categoryDescription || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCategory(id, { categoryName, categoryDescription });
      setSuccess('Category updated successfully');
      // Redirect to the categories list or to the updated category page
      router.push('/admin/categories');
    } catch (error) {
      setError('Failed to update category');
    }
  };

  return (
    <Layout pageTitle="Edit Category">
      <div className={styles.container}>
        <h1 className={styles.header}>Edit Category</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          
          <label>
            Name:
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
          
          <button type="submit" className={styles.submitButton}>Update Category</button>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const categories = await getCategories();
  const category = categories.find((cat) => cat.id === parseInt(id, 10));

  return {
    props: { category },
  };
}

export default EditCategory;
