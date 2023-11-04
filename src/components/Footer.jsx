import styles from '../styles/Footer.module.css'
import Link from 'next/link';
import logo from '../../public/Logo.jpg'
import Typography from '@mui/material/Typography';
const Footer = () => {
  return (
    <>
      {/* <div className={styles.footerMainDiv}>
          <div className={ styles.footerMinDiv}>
          <div className={styles.footerDivOne}>
             <div className={styles.logoDiv2}>
            <img style={{ height: '40px' }} src={`https://gitgurus.com/favicon.png`} alt='gitgurus.com logo' />
          </div>
            <div className={styles.notes}> We are a young company always looking for new and creative ideas to help you with our content in your everyday work.</div>
            </div>
            <div className={styles.footerDivTwo}>
            <div className={ styles.footerDivTwolink}> 
            <Link className={styles.footerLinks2} href="/">Home</Link>
      <Link className={styles.footerLinks2} href="/Blog"> Blog</Link>
      <Link className={styles.footerLinks2} href="/About us">About us</Link>
      
            </div>
            </div>


            <div className={styles.footerDivThree}>
            <h4>  Contact us </h4>
             <div className={styles.contact}> <span className={ styles. info}>phone : </span>
            <span className={ styles. info}> Email :      </span>
              <span className={ styles. info}>Skype :</span>
             </div>
            </div>
            
          </div>
          
        </div> */}
      <div className={styles.footerMainDiv2}>
        <div>
          <p className={styles.footerLinks}>copyright</p>
        </div>
        <Link className={styles.footerLinks} href="/contact">contact</Link>
        <Link className={styles.footerLinks} href="/"> Privacy</Link>
      </div>
    </>
  );
};

export default Footer;