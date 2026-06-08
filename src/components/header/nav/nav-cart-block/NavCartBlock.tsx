import styles from "./NavCartBlock.module.scss";
import NavCartList from "./nav-cart-list/NavCartList";
import { Link } from "react-router-dom";
import { useCartStore } from "../../../../store/cart/cart.store";
const NavCartBlock = () => {

  const { totalPrice} = useCartStore();
  return (
    <div>
      <NavCartList></NavCartList>
      <div className={styles.nav_cart_price}>
        {" "}
        합계: $ {totalPrice.toFixed(2)}
      </div>
      <div className={styles.nav_car_link}>
        <Link to="cart">장바구니로 이동</Link>
      </div>
    </div>
  );
};

export default NavCartBlock;
