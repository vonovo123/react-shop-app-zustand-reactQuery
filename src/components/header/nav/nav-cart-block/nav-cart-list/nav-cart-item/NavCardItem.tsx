import styles from "./NavCartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import type { IProduct } from "../../../../../../types/product.type";
import { useCartStore } from "../../../../../../store/cart/cart.store";

type NavCardItemPros = { item: IProduct };

const NavCardItem = ({ item }: NavCardItemPros) => {
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const deleteProduct = () => {
    removeFromCart(item.id);
  };

  return (
    <div className={styles.nav_cart_item}>
      <Link to={`/product/${item.id}`} className={styles.nav_cart_thumb}>
        <img src={item.image} alt={item.title} />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{item.category}</h3>
        <h2>{item.title}</h2>
        <span>
          ${item.price} × {item.quantity} = ${item.total.toFixed(2)}
        </span>
      </div>
      <button
        type="button"
        onClick={deleteProduct}
        className={styles.nav_cart_delete}
        aria-label="장바구니에서 삭제"
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default NavCardItem;
