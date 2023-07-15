import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { Search } from "@mui/icons-material";
function Navbar(props) {
  return (
    <>
      <div className={styles.navBarMainDiv}>
        <header className={styles.navBarSeconderyDiv}>
          <div className={styles.logoDiv}>
            <h1>LOGO</h1>
            <input
              className={styles.Search}
              type="search"
              placeholder="search"
            />
          </div>

          <div className={styles.navigationDiv}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/write">Write</Link>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
