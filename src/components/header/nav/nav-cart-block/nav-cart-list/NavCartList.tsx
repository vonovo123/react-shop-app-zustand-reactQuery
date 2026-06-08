import { useCartStore } from "../../../../../store/cart/cart.store";
import styles from "./NavCartList.module.scss";
import NavCardItem from "./nav-cart-item/NavCardItem";
const NavCartList = () => {
  const { products } = useCartStore();
  return (
    <div className={styles.nav_cart_list}>
      {products.map((product) => (
        <NavCardItem key={product.id} item={product}></NavCardItem>
      ))}
    </div>
  );
};

export default NavCartList;
