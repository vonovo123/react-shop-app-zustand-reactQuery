import React from "react";
import styles from "./NavCartList.module.scss";
import { useAppSelector } from "../../../../../hooks/reduct";
import NavCardItem from "./nav-cart-item/NavCardItem";
const NavCartList = () => {
  const { products } = useAppSelector((state) => state.cartSlice);
  return (
    <div className={styles.nav_cart_list}>
      {products.map((product) => (
        <NavCardItem key={product.id} item={product}></NavCardItem>
      ))}
    </div>
  );
};

export default NavCartList;
