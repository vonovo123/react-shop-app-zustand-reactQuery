import styles from "./nav.module.scss";
import { Link } from "react-router-dom";
import { FiLogIn, FiShoppingCart, FiUser } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "../../../hooks/auth";
import { signOut } from "firebase/auth";
import { removeUser } from "../../../store/user/user.slice";
import { removeUserId } from "../../../store/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduct";
import NavCartBlock from "./nav-cart-block/NavCartBlock";
import { auth } from "../../../firebase";
const Nav = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const handleSignout = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      dispatch(removeUserId());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const { products } = useAppSelector((state) => state.cartSlice);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div className={styles.counter}>
            <Link to={"/cart"}>
              {" "}
              <FiShoppingCart />
            </Link>
            {products.length > 0 && <b>{products.length}</b>}
            {products.length > 0 && (
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
                console.log(handleSignout());
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
