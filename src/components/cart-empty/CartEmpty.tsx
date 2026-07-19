import { Link } from "react-router-dom";
import styles from "./CartEmpty.module.scss";

type CartEmptyPros = { title: string };
const CartEmpty = ({ title }: CartEmptyPros) => {
  return (
    <div className={styles.cart_empty}>
      <div className={styles.cart_empty_card}>
        <img src="img/empty-cart.png" alt="" />
        <h2>{title}에 담긴 항목이 없습니다</h2>
        <p>원하는 상품을 담아 쇼핑을 이어가 보세요.</p>
        <Link to="/">쇼핑 계속하기</Link>
      </div>
    </div>
  );
};

export default CartEmpty;
