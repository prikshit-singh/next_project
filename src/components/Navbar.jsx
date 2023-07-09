import React from 'react';
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
function Navbar(props) {
  return (
    <>
      <div className={styles.navBarMainDiv} >
        
          <header className={styles.navBarSeconderyDiv}>
          <div className={styles.logoDiv}>
              <h1>LOGO</h1>
          </div>
          <div className={styles.navigationDiv}>
          <Link href='/'>
              Home
            </Link>
            <Link href='/about'>
              About
            </Link>
            <Link href='/write'>
              Write
            </Link>
            </div>
            
          </header>

      
      </div>
    </>
  );
}

export default Navbar;