import styles from "./NavCartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import type { IProduct } from "../../../../../../types/product.type";
import { useCartStore } from "../../../../../../store/cart/cart.store";
type NavCardItemPros = { item: IProduct };
const NavCardItem = ({ item }: NavCardItemPros) => {
  const {removeFromCart} = useCartStore();
  const deleteProduct = () => {
    removeFromCart(item.id);
  };
  return (
    <div className={styles.nav_cart_item}>
      <Link to={`/product/${item.id}`}>
        {" "}
        <img src={item.image} alt="product card" />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{item.category}</h3>
        <h2>{item.title}</h2>
        <span>
          {item.price} x {item.quantity} = $ {item.total}
        </span>
      </div>
      <button onClick={deleteProduct} className={styles.nav_cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default NavCardItem;
