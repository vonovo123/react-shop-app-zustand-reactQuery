import { useEffect } from "react";
import styles from "./NavCartBlock.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduct";
import { getTotalPrice } from "../../../../store/cart/cart.slice";
import NavCartList from "./nav-cart-list/NavCartList";
import { Link } from "react-router-dom";
const NavCartBlock = () => {
  const { totalPrice, products } = useAppSelector((state) => state.cartSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [products]);
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
