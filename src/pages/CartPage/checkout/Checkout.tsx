import styles from "./Checkout.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { useCartStore } from "../../../store/cart/cart.store";
import { usePostOrderMutation } from "../../../queries/orders.query";
import QueryError from "../../../components/query/QueryError";
const Checkout = () => {
  const  { totalPrice, products } = useCartStore();
  const { isAuth, id } = useAuth();
  const { mutate: postOrder,isPending,isError,error,reset } = usePostOrderMutation();

  
  const handleCheckout = () => { postOrder({ products, totalPrice, userId: id }); };
  return (
    <div className={styles.checkout}>
      <div className={styles.checkout_panel}>
        <div className={styles.checkout_total}>
          <span>합계</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
        {isError && (
          <QueryError
            message="주문 실패"
            error={error}
            onRetry={() => {
              reset();
              handleCheckout();
            }}
          />
        )}
        {isAuth ? (
          <button
            className={styles.checkout_button}
            onClick={handleCheckout}
            disabled={isPending}
          >
            {isPending ? "결제중..." : "결제하기"}
          </button>
        ) : (
          <Link className={styles.checkout_button} to={"/login"}>
            로그인 후 결제
          </Link>
        )}
      </div>
    </div>
  );
};

export default Checkout;
