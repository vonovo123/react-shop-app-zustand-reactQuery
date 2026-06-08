import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
import type { IProduct } from "../../../../types/product.type";
import { useCartStore } from "../../../../store/cart/cart.store";
import { useShallow } from "zustand/shallow";
type CardItemPors = {
  item: IProduct;
};
const CardItem = ({ item }: CardItemPors) => {
  const productMatching =
   useCartStore(useShallow((s) => s.products.some((p) => p.id === item.id)));

  const onClickAddCart = () => {
    useCartStore.getState().addToCart(item);
  };
  // 장바구니에 이미 담긴 상품인지 확인
  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img src={item.image} alt={item.title} width={"80%"} height={"200px"} />
      </Link>
      <h5>{item.title.substring(0, 15)}...</h5>
      <div>
        <button disabled={productMatching?true:false} onClick={() => onClickAddCart()}>
          {productMatching ? "이미 담긴 상품입니다" : " 장바구니에 추가"}
        </button>
        <p>{item.price.toLocaleString()}원</p>
      </div>
    </li>
  );
};

export default CardItem;
