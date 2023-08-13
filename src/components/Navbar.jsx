import React, { useState } from "react";
import Link from "next/link";

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import styles from "../styles/Navbar.module.css";
import { Search,Close } from "@mui/icons-material";
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
                setDialogue(true)
                // document.getElementById("mySidenav").style.width = "250px";
              }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Stack>

          </div>

          <div id="mySidenav" style={dialogue ? { display: 'flex', width: '250px' } : { display: 'flex', width: '0px' }} className={styles.dialogueBox}>
            <Close className={styles.closebtn} onClick={() => {
              setDialogue(false)
            }}/>
         
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
