import React,{useState} from "react";
import Link from "next/link";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import styles from "../styles/Navbar.module.css";
import { Search } from "@mui/icons-material";
function Navbar(props) {
  const[dialogue,setDialogue]= useState(false)
  return (
    <>
      <div className={styles.navBarMainDiv}>
        <header className={styles.navBarSeconderyDiv}>
          <div className={styles.logoDiv}>
            <h1>LOGO</h1>
            <input
              className={styles.Search}
              style={{ width: "80%" }}
              type="search"
              placeholder="search"
            />
          </div>

          <div className={styles.navigationDiv}>
            <Stack direction="row" spacing={2}>
              <Avatar onClick={()=>{
                setDialogue(!dialogue)
              }} alt="Remy Sharp"  src="/static/images/avatar/1.jpg" />
            </Stack>

          </div>
        </header>
      </div>
      <div style={dialogue?{display:'flex'}:{display:'none'}} className={styles.dialogueBox}>
        <Link  className={styles.navLinks} href="/">Home</Link>
        <Link className={styles.navLinks} href="/about">About</Link>
        <Link className={styles.navLinks} href="/write">Write</Link>
        <Link className={styles.navLinks} href="/login">Login</Link>
        <Link className={styles.navLinks} href="/signup">Signup</Link>
      </div>
    </>
  );
}

export default Navbar;
