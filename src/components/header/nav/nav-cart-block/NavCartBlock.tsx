import styles from "./NavCartBlock.module.scss";
import NavCartList from "./nav-cart-list/NavCartList";
import { Link } from "react-router-dom";
import { useCartStore } from "../../../../store/cart/cart.store";

const NavCartBlock = () => {
  const totalPrice = useCartStore((s) => s.totalPrice);
  const count = useCartStore((s) => s.products.length);

  return (
    <div className={styles.nav_cart_block}>
      <div className={styles.nav_cart_header}>
        <strong>장바구니</strong>
        <span>{count}개 상품</span>
      </div>
      <NavCartList />
      <div className={styles.nav_cart_footer}>
        <div className={styles.nav_cart_price}>
          <span>합계</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
        <Link className={styles.nav_cart_link} to="/cart">
          장바구니로 이동
        </Link>
      </div>
    </div>
  );
};

export default NavCartBlock;
