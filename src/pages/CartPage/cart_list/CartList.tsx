import styles from "./cartList.module.scss";
import { useAppSelector } from "../../../hooks/reduct";
import CartItem from "./cart_item/CartItem";
import Checkout from "../checkout/Checkout";
const CartList = () => {
  const { products } = useAppSelector((state) => state.cartSlice);
  return (
    <div className={styles.cart_list}>
      {products.map((product) => (
        <CartItem key={product.id} item={product} />
      ))}
      <Checkout></Checkout>
    </div>
  );
};

export default CartList;
