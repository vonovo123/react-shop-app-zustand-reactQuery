import { BsGithub } from "react-icons/bs";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.contact}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
