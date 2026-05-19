import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduct";
import { getTotalPrice, postOrder } from "../../../store/cart/cart.slice";
import styles from "./checkout.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
const Checkout = () => {
  const cart = useAppSelector((state) => state.cartSlice);
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const sendOrder = () => {
    dispatch(postOrder(cart));
  };
  useEffect(() => {
    dispatch(getTotalPrice());
  }, [cart, dispatch]);

  return (
    <div className={styles.checkout}>
      <div>
        <p>
          {""}
          <span>합계</span> ${cart.totalPrice.toFixed(2)}
        </p>
        {isAuth ? (
          <button
            className={styles.checkout_button}
            onClick={() => sendOrder()}
          >
            결제하기
          </button>
        ) : (
          <Link className={styles.checkout_button} to={"/login"}>
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Checkout;
