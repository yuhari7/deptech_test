// pages/index.js
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  const router = useRouter();

  const handleCreateTransaction = (productId) => {
    router.push(`/transactions?productId=${productId}`);
  };

  return (
    <>
      <Head>
        <title>Product Showcase</title>
        <meta name="description" content="Showcase of available products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>Available Products</h1>
        <div className={styles.grid}>
          {products.length ? (
            products.map((product) => (
              <div key={product.id} className={styles.card}>
                <Image
                  src={product.productImage || "/default-product.png"}
                  alt={product.productName}
                  width={300}
                  height={300}
                  className={styles.productImage}
                  priority
                />
                <h2 className={styles.productName}>{product.productName}</h2>
                <p className={styles.productDescription}>
                  {product.productDescription}
                </p>
                <div className={styles.productDetails}>
                  <p className={styles.productStock}>Stock: {product.stock}</p>
                  <p className={styles.productCategory}>
                    Category ID: {product.categoryId}
                  </p>
                  <button
                    className={styles.createTransactionButton}
                    onClick={() => handleCreateTransaction(product.id)}
                  >
                    Create Transaction
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noProducts}>No products available.</p>
          )}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const productsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
    );
    const products = await productsResponse.json();
    return {
      props: { products },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: { products: [] },
    };
  }
}
