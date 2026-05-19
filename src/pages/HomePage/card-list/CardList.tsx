import React, { useEffect } from "react";
import styles from "./CardList.module.scss";
import { fetchProducts } from "../../../store/products/products.slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduct";
import CardItem from "./card-item/CardItem";
import CardSkeleton from "../card-skeleton/CardSkeleton";
const CardList = () => {
  const category = useAppSelector((state) => state.categoriesSlice);
  const { products, isLoading } = useAppSelector(
    (state) => state.productsSlice,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts(category?.toLowerCase()));
  }, [category]);
  if (isLoading) {
    return <CardSkeleton />;
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
