import { useRouter } from 'next/router';
import Layout from '@/components/admin-dashboard/Layout';
import { getProductById } from '@/pages/api/product';
import styles from '@/styles/products/TransactionDetail.module.scss';

const ProductDetailPage = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;

  if (!product) {
    return <p>No product data found.</p>;
  }

  return (
    <Layout pageTitle={`Product ${id} Details`}>
      <div className={styles.productDetailContainer}>
        <h1>Product Details</h1>
        <div className={styles.productHeader}>
          <h2>ID: {product.id}</h2>
          <p>Name: {product.productName}</p>
          <p>Description: {product.productDescription}</p>
          <p>Stock: {product.stock}</p>
          <p>Category ID: {product.categoryId}</p>
        </div>
        <div className={styles.productImageContainer}>
          <img
            src={product.productImage || "/default_image.png"}
            alt={product.productName}
            className={styles.productImage}
          />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  try {
    const product = await getProductById(id);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      props: {
        product: null,
      },
    };
  }
}

export default ProductDetailPage;
