import Link from "next/link";
import { useState, useEffect } from "react";
import { getCategories, deleteCategory } from "@/pages/api/category";
import styles from "@/styles/categories/Category.module.scss";
import Layout from "@/components/admin-dashboard/Layout";

const CategoriesPage = ({ initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    // Optional: Refetch categories if needed
    // const fetchCategories = async () => {
    //   const data = await getCategories();
    //   setCategories(data);
    // };
    // fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter((category) => category.id !== id));
        alert("Category deleted successfully");
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category");
      }
    }
  };

  return (
    <Layout pageTitle="Categories">
      <div className={styles.container}>
        <h1 className={styles.header}>Categories</h1>
        <Link
          className={styles.createButton}
          href="/admin/categories/create-category"
        >
          Create Category
        </Link>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.categoryName}</td>
                <td>{category.categoryDescription}</td>
                <td>
                  <Link href={`/admin/categories/edit/${category.id}`}>
                    <button
                      className={styles.buttonEdit}
                      onClick={() => {
                        /* Implement Edit functionality here */
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className={styles.buttonDelete}
                    onClick={() => handleDelete(category.id)}
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
  const initialCategories = await getCategories();
  return {
    props: { initialCategories },
  };
}

export default CategoriesPage;
