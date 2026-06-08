import styles from "./CountProducts.module.scss";
import { useProductsQuery } from "../../../queries/products.query";
import { useCategoriesStore } from "../../../store/categories/categories.store";
const CountProducts = () => {
  const {category} = useCategoriesStore();
  const categoryParam = category?.toLowerCase() ?? "";
  //const { products, isLoading } = useProductsStore();
  const {data:products = [], isPending} = useProductsQuery(categoryParam);
  return (
    <div className={styles.count_products}>
      {!isPending && <p>Showing : {products.length} items</p>}
    </div>
  );
};

export default CountProducts;
