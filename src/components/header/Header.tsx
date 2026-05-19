import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import Nav from "./nav/Nav";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.header_wrapper}>
          <div className={styles.header_logo}>
            <Link to={"/"}>Shop</Link>
          </div>
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Header;
