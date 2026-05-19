import {
  removeFromCart,
  incrementProduct,
  decrementProduct,
} from "../../../../store/cart/cart.slice";
import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch } from "../../../../hooks/reduct";
import type { IProduct } from "../../../../store/products/products.type";
type CartItemPops = { item: IProduct };
const CartItem = ({ item }: CartItemPops) => {
  const dispatch = useAppDispatch();
  const deleteProduct = () => {
    dispatch(removeFromCart(item.id));
  };
  const increment = () => {
    dispatch(incrementProduct(item.id));
  };
  const decrement = () => {
    dispatch(decrementProduct(item.id));
  };
  return (
    <div className={styles.cart_item}>
      <Link to={`/card/${item.id}`}>
        <img src={item.image} alt={item.title} />
      </Link>
      <div className={styles.cart_description}>
        <h2>{item.category}</h2>
        <h2>{item.title}</h2>
        <span>
          {item.price} x {item.quantity} = ${item.total.toFixed(2)}
        </span>
      </div>
      <div className={styles.cart_count}>
        <div>
          <button disabled={item.quantity === 1} onClick={decrement}>
            -
          </button>
          <span>{item.quantity}</span>
          <button disabled={item.quantity === 10} onClick={increment}>
            +
          </button>
        </div>
      </div>
      <button onClick={deleteProduct} className={styles.cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default CartItem;
