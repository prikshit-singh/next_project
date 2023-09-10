import React, { useState } from 'react';
import { Modal, Box } from '@mui/material'
import { useSession, signOut, getSession,signIn } from "next-auth/react"
import { toast } from 'react-toastify';
import Layout from "./authcomponents/layout";
import Login from './Login';
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import {
    Icon,
    Input
  } from 'semantic-ui-react'

function Loginmodel(props) {
    const [loginDialogue, setloginDialogue] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    console.log(process.env)
    const style1 = {
        // dispatch:'flex',
        position: 'absolute',
        // width: '30%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        // p: 0,
      };

    const handleLogin = async () => {
        const status = await signIn('credentials', { redirect: false, callbackUrl: '/', username: email, password })
        if (status.status === 200) {
    
          toast('Login Successful', { hideProgressBar: false, autoClose: 2000, type: 'success' })
          // setLoader(false)
          router.push('/')
        } else {
          setLoader(false)
    
          toast('Invald Email or Password', { hideProgressBar: false, autoClose: 2000, type: 'error' })
    
        }
      }

      console.log(props.loginDialogue)
    return (
        <>
        <div>
        <Modal
          open={props.loginDialogue}
        >
          <Box sx={style1}>
            <div className={styles.signUpMainDiv}>
              <Icon  
                size='big' 
                name='close' 
                
                className={styles.closebtn}
                onClick={() => { props.setloginDialogue(false) }} />
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
              {/* </div> */}
            </div>
          </Box>
        </Modal>
      </div>   
        </>
    );
}

export default Loginmodel;