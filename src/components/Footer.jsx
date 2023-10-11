import styles from "../styles/Footer.module.css";
import Link from "next/link";
import logo from "../../public/Logo.jpg";
const Footer = () => {
  return (
    <>
      <div className={styles.footerMainDiv}>
        <div className={styles.footerMainDiv2}>
          <div className={styles.logoDiv2}>
            <img
              style={{ height: "40px" }}
              src={`https://gitgurus.com/favicon.png`}
              alt="gitgurus.com logo"
            />
          </div>
          <div className={styles.copyright}>
            @-All Rights Reserved
            <Link className={styles.footerLinks} href="/">
              Terms
            </Link>
            <Link className={styles.footerLinks} href="/privacy">

              Privacy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
