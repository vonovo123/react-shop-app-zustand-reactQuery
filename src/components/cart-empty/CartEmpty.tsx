import { Link } from "react-router-dom";
import styles from "./CartEmpty.module.scss";

type CartEmptyPros = { title: string };
const CartEmpty = ({ title }: CartEmptyPros) => {
  return (
    <div className={styles.cart_empty}>
      <img src="img/empty-cart.png" alt="" />
      <h1>{title} 가 비어 있습니다.</h1>
      <p>{title}에 상품을 추가해주세요.</p>
      <Link to="/">쇼핑 계속하기</Link>
    </div>
  );
};

export default CartEmpty;
