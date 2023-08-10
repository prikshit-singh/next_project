import React, { useState } from "react";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Search from '@mui/icons-material/Search';
import styles from "../styles/Navbar.module.css";
import { Search } from "@mui/icons-material";
function Navbar(props) {
  const [dialogue, setDialogue] = useState(false)
  return (
    <>
      <div className={styles.navBarMainDiv}>
        <header className={styles.navBarSeconderyDiv}>
          <div className={styles.logoDiv}>
            <h1>LOGO</h1>
          </div>


          <div className={styles.Search}>

            <input
              name="search"
              type="text"
              placeholder="search"
            />


          </div>
          <div className={styles.navigationDiv}>
            <Stack direction="row" spacing={2}>
              <Avatar onClick={() => {
                setDialogue(!dialogue)
              }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Stack>

          </div>

          <div style={dialogue ? { display: 'flex' } : { display: 'none' }} className={styles.dialogueBox}>
            <Link className={styles.navLinks} href="/">Home</Link>
            <Link className={styles.navLinks} href="/about">About</Link>
            <Link className={styles.navLinks} href="/write">Write</Link>
            <Link className={styles.navLinks} href="/login">Login</Link>
            <Link className={styles.navLinks} href="/signup">Signup</Link>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
