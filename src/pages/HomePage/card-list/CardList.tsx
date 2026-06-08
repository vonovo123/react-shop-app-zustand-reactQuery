import styles from "./CardList.module.scss";
import CardItem from "./card-item/CardItem";
import { useCategoriesStore } from "../../../store/categories/categories.store";
import { useProductsQuery } from "../../../queries/products.query";
import QueryLoading from "../../../components/query/QueryLoading";
import QueryError from "../../../components/query/QueryError";
const CardList = () => {
  const {category} = useCategoriesStore();
  const categoryParam = category?.toLowerCase() ?? "";
  //react-query
  const {
    data:products = [],
    isPending,
    isError,
    error,
    refetch,
  } = useProductsQuery(categoryParam);

  if (isPending) {
    return <QueryLoading variant="list" />;
  }

  if(isError){
    return <QueryError message="상품을 불러오지 못했습니다" error={error} onRetry={()=>{
      refetch();
    }} />
  }

  return (
    <ul className={styles.card_list}>
      {products.map((product) => (
        <CardItem key={product.id} item={product}></CardItem>
      ))}
    </ul>
  );
};

export default CardList;
