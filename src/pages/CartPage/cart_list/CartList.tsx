import styles from "./CartList.module.scss";
import CartItem from "./cart_item/CartItem";
import Checkout from "../checkout/Checkout";
import { useCartStore } from "../../../store/cart/cart.store";
const CartList = () => {
  const { products } = useCartStore()
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
