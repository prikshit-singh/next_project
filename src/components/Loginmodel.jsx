import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import styles from "../styles/uploadpdf.module.css";
import DoneIcon from '@mui/icons-material/Done';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';

import { useSession, signOut, getSession, signIn } from "next-auth/react"

import Layout from "./authcomponents/layout";
import Login from './Login';
import { useRouter } from "next/router";
// import styles from "../styles/Navbar.module.css";
import {
  Icon,
  Input
} from 'semantic-ui-react'



const style = {
  // display:'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid transparent',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  '@media (max-width: 600px)': {
    top: '50%',
    left: '50%',
    width: '100%',
  },
};


const WhiteBorderTextField = styled(FormControl)`
    
    & label.Mui-focused {
      color: var(--primary);
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: var(--primary);
      }
    }
  `;

function Loginmodel(props) {
  const [loginDialogue, setloginDialogue] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const style1 = {
    // dispatch:'flex',
    position: 'absolute',
    width: '600',
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
      // setLoader(false)

      toast('Invald Email or Password', { hideProgressBar: false, autoClose: 2000, type: 'error' })

    }
  }

  return (
    <>
      <div>


        <Modal
          open={props.loginDialogue}
          onClose={() => { props.setloginDialogue(false) }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.signUpMainDiv}>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', }}>
                <h2 style={{
                  color: 'var(--primary)',
                }} id="parent-modal-title">Login</h2>

              </div>
              <WhiteBorderTextField fullWidth className={styles.FormControl}>
                <TextField type="text"
                  id="title"
                  name="title"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  label="Email"
                  variant="outlined"

                />
              </WhiteBorderTextField>
              <WhiteBorderTextField fullWidth className={styles.FormControl}>
                <TextField type="text"
                  id="title"
                  name="title"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  label="Password"
                  variant="outlined"

                />
              </WhiteBorderTextField>
              <WhiteBorderTextField fullWidth className={styles.FormControlBtn}>
              <Button style={{backgroundColor:'var(--primary)'}}  variant="contained" className={styles.button} type="button" onClick={() => handleLogin()}>Login</Button>
              </WhiteBorderTextField>
                <div style={{display:'flex',alignItems:'center', justifyContent:'space-between',marginTop:'10px'}}><hr style={{width:'45%'}}/>OR<hr style={{width:'45%'}}/></div>
              <Layout>
                  <Login  />
              </Layout>
              {/* </form> */}
              {/* </div> */}
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Loginmodel;