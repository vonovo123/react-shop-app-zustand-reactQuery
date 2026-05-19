import styles from "./CountProducts.module.scss";
import { useAppSelector } from "../../../hooks/reduct";
const CountProducts = () => {
  const { products, isLoading } = useAppSelector(
    (state) => state.productsSlice,
  );
  return (
    <div className={styles.count_products}>
      {!isLoading && <p>Showing : {products.length} items</p>}
    </div>
  );
};

export default CountProducts;
