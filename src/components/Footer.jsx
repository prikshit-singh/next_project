import styles from '../styles/Footer.module.css'
import Link from 'next/link';
import logo from '../../public/Logo.jpg'
import Typography from '@mui/material/Typography';
const Footer = () => {
  const year= new Date().getFullYear();
  return (
    <>
    
      <div className={styles.footerMainDiv2}>
        <div>
          <p className={styles.footerLinks}>copyright © {year}</p>
        </div>
        <Link className={styles.footerLinks} href="/contact">contact</Link>
        <Link className={styles.footerLinks} href="/"> Privacy</Link>
      </div>
    </>
  );
};

export default Footer;