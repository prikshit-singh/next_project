import styles from "../styles/Footer.module.css";
import Link from "next/link";
import logo from "../../public/Logo.jpg";
const Footer = () => {
  return (
    <>
      <div className={styles.footerMainDiv}>
           <div className={styles.copyright}>
           copyright
            <Link className={styles.footerLinks} href="/">
              Terms
            </Link>
            <Link className={styles.footerLinks} href="/privacy">
             Privacy
            </Link>
            </div>
          </div>
        </>
  );
};

export default Footer;
