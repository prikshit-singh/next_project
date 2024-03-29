import React, { useState } from "react";
import Link from "next/link";
import logo from '../../public/Logo.jpg'
import { useDispatch, useSelector } from "react-redux";
import { updateEditorContent } from "../../slices/editorSlice";
import { toggolDialogue } from "../../slices/publisherDialogueSlice";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSession, signOut } from "next-auth/react"
import {
  Icon,
  Input
} from 'semantic-ui-react'

import styles from "../styles/Navbar.module.css";
import { Search, Close } from "@mui/icons-material";
function Navbar(props) {
  const [dialogue, setDialogue] = useState(false)
  const session = useSession()
  console.log(session)

const dispatch = useDispatch()
  const handleRequest = () => {
    console.log('handleRequest')
    // dispatch(updateEditorContent(editor.current.getContents()));
    dispatch(toggolDialogue(true));
  };
  return (
    <>
      <div className={styles.navBarMainDiv}>
        <header className={styles.navBarSeconderyDiv}>
          <div className={styles.logoDiv}>
            <img style={{ height: '34px' }} src={`https://gitgurus.com/favicon.png`} alt='gitgurus.com logo' />
          </div>


          <div className={styles.Search}>

            <Input
              icon={{ name: 'search', circular: true, link: true }}
              placeholder='Search...'
            />


          </div>
          <div className={styles.navigationDiv}>
            <div className={styles.publishButton}>
            {typeof(window) != 'undefined' && window.location.href === 'http://localhost:3000/write' ?  <button
                // className={styles.publishButton}
                onClick={() => {
                  console.log('clicked')
                  handleRequest();
                }}
              >
                Publish
              </button>: null}
             
            </div>
            
            {session.data != undefined?
              <Stack direction="row" spacing={2}>
              <Avatar 
              onClick={() => {
                setDialogue(!dialogue)
                // document.getElementById("mySidenav").style.width = "250px";
              }} alt="Remy Sharp" src={session.data.userData.picture} />
            </Stack>
            :
            <Stack direction="row" spacing={2}>
              <Avatar onClick={() => {
                setDialogue(!dialogue)
                // document.getElementById("mySidenav").style.width = "250px";
              }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Stack>
            }
            

          </div>



          <div id="mySidenav" style={dialogue ? { display: 'flex', width: '250px' , zIndex:9} : { display: 'none' }} className={styles.dialogueBox}>


          {/* <Icon  
                size='big' 
                name='close' 
                
                className={styles.closebtn}
                onClick={() => { setDialogue(false) }} /> */}
            

            <Link className={styles.navLinks} href="/">Home</Link>
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
