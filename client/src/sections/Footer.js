// Styles
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles["footer"]}>
      <a href="https://andresser17.github.io" className={styles["link"]}>
        &copy; 2022 Alejandro Serrano
      </a>
    </footer>
  );
}

export default Footer;
