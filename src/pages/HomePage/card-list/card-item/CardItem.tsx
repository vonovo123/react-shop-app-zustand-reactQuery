import React from "react";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduct";
import { addToCart } from "../../../../store/cart/cart.slice";
import type { IProduct } from "../../../../store/products/products.type";
type CardItemPors = {
  item: IProduct;
};
const CardItem = ({ item }: CardItemPors) => {
  const { products = [] } = useAppSelector((state) => state.cartSlice);
  const dispatch = useAppDispatch();
  const onClickAddCart = () => {
    dispatch(addToCart(item));
  };
  // 장바구니에 이미 담긴 상품인지 확인
  const productMatching = products.some((product) => product.id === item.id);
  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img src={item.image} alt={item.title} width={"80%"} height={"200px"} />
      </Link>
      <h5>{item.title.substring(0, 15)}...</h5>
      <div>
        <button disabled={productMatching} onClick={() => onClickAddCart()}>
          {productMatching ? "이미 담긴 상품입니다" : " 장바구니에 추가"}
        </button>
        <p>{item.price.toLocaleString()}원</p>
      </div>
    </li>
  );
};

export default CardItem;
