import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import logo from '../../public/Logo.jpg'
import { useDispatch, useSelector } from "react-redux";
import { updateEditorContent } from "../../slices/editorSlice";
import { toggolDialogue } from "../../slices/publisherDialogueSlice";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSession, signOut, getSession } from "next-auth/react"
import Layout from "./authcomponents/layout";
import {
  Icon,
  Input
} from 'semantic-ui-react'
import Login from "./Login";
import { toast } from 'react-toastify';
import styles from "../styles/Navbar.module.css";
import { Search, Close } from "@mui/icons-material";
import { Modal, Box } from '@mui/material'
import Loginmodel from "./Loginmodel";
import Uploadpreviouspapers from "./Uploadpreviouspapers";


function Navbar(props) {
  const [dialogue, setDialogue] = useState(false)
  const [loginDialogue, setloginDialogue] = useState(false)
  const [uploadpreviousDialog, setUploadpreviousDialog] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession()

  const divRef = useRef(null);

  // useEffect(() => {
  //   // Add a click event listener to the document
  //     document.addEventListener('click', handleClickOutside);
  //   // Cleanup: remove the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);


  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      if (dialogue) {
        // divRef.current = null
        console.log('dialogue', dialogue)

        setDialogue(false);
      }
    }
  };
  const dispatch = useDispatch()
  const handleRequest = () => {
    console.log('handleRequest')
    // dispatch(updateEditorContent(editor.current.getContents()));
    dispatch(toggolDialogue(true));
  };




  return (
    <>
    
      <Loginmodel loginDialogue={loginDialogue} setloginDialogue={setloginDialogue} />
      <Uploadpreviouspapers uploadpreviousDialog={uploadpreviousDialog} setUploadpreviousDialog={setUploadpreviousDialog} />
      {/* <div>
        <Modal
          open={loginDialogue}
        >
          <Box sx={style1}>
            <div className={styles.signUpMainDiv}>
              <Icon  
                size='big' 
                name='close' 
                
                className={styles.closebtn}
                onClick={() => { setloginDialogue(false) }} />
                <h1>Login</h1>
                <form className={styles.form}>
                  <label>Email</label>
                  <input type="email" value={email}
                    placeholder=" "
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }} />
                  <label>Password</label>
                  <input type="password" value={password}
                    placeholder=" "
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }} />

                  <button className={styles.button} type="button" onClick={() => handleLogin()}>Login</button>

                  <Layout>
                    <Login />
                  </Layout>
                </form>
            </div>
          </Box>
        </Modal>
      </div> */}
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
              {typeof (window) != 'undefined' && window.location.href === 'https://gitgurus.com/write' ? <button
                // className={styles.publishButton}
                onClick={() => {
                  console.log('clicked')
                  handleRequest();
                }}
              >
                Publish
              </button> : null}

            </div>

            {session.data != undefined ?
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



          <div id="mySidenav" ref={divRef} style={dialogue ? { display: 'flex', width: '250px', zIndex: 9 } : { display: 'none' }} className={styles.dialogueBox}>
            <Link className={styles.navLinks} href="/">Home</Link>
            <Link className={styles.navLinks} href="/write">Write</Link>
            {/* <Link className={styles.navLinks} href="/signup">Signup</Link> */}
            {session.data != undefined ?
              <p onClick={() => setUploadpreviousDialog(true)} className={styles.navLinks} style={{ margin: 0 }} >Upload Papers</p>
              :
              null
            }
            {session.data != undefined ?
              <p onClick={() => signOut('google', { callbackUrl: 'https://gitgurus.com' })} className={styles.navLinks} >Logout</p>
              :
              <p onClick={() => setloginDialogue(true)} className={styles.navLinks} >Sign In</p>
            }
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
