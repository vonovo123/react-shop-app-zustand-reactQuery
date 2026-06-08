import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";
import { FiLogIn, FiShoppingCart, FiUser } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "../../../hooks/auth";
import { signOut } from "firebase/auth";
import NavCartBlock from "./nav-cart-block/NavCartBlock";
import { auth } from "../../../firebase";
import { useUserStore } from "../../../store/user/user.store";
import { useCartStore } from "../../../store/cart/cart.store";
const Nav = () => {
  const { isAuth } = useAuth();
  const cartCount = useCartStore((s) => s.products.length);
  const removeUser = useUserStore((s)=>s.removeUser);
  const handleSignout = async () => {
    try {
      await signOut(auth);
      removeUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div className={styles.counter}>
            <Link to={"/cart"}>
              {" "}
              <FiShoppingCart />
            </Link>
            {(cartCount > 0  && 
            <b>{cartCount}</b> 
            )}
            {(cartCount > 0  && 
            <div className={styles.nav_hover_cart}>
              <NavCartBlock></NavCartBlock>
            </div>
            )}
            
          </div>
        </li>
        <li>
          <div className={styles.counter}>
            <Link to={"/order"}>
              {" "}
              <FiUser title="주문" />
            </Link>
          </div>
        </li>
        <li>
          {isAuth ? (
            <GoSignOut
              className={styles.nav_signout}
              title="로그아웃"
              onClick={() => {
                handleSignout();
              }}
            />
          ) : (
            <Link to={"/login"}>
              <FiLogIn title="로그인" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
