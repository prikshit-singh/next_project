
"use client"
import React, { useState } from "react";
import axios from "axios";
import Loader from '../../components/Loader'
import Layout from "../../components/authcomponents/layout";
// import Navbar from "../../components/Navbar";
import { useRouter } from 'next/router'
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { updateUserData } from "../../../slices/user/user";
import { useDispatch } from "react-redux";
import { signIn, useSession, getSession } from "next-auth/react";
import Login from '../../components/Login'

import styles from "../../styles/signup.module.css";



const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogin = async () => {
    setLoader(true)
    const status = await signIn('credentials', { redirect: false, callbackUrl: '/', username: email, password })
    if (status.status === 200) {

      toast('Login Successful', { hideProgressBar: false, autoClose: 2000, type: 'success' })
      setLoader(false)
      router.push('/')
    } else {
      setLoader(false)

      toast('Invald Email or Password', { hideProgressBar: false, autoClose: 2000, type: 'error' })

    }
  }
  return (
    <>
      {loader ? <Loader /> : null}









      
      {/* <Navbar /> */}

      {/* <div className={styles.signUpMainDiv}>
        <div className={styles.loginbox}>
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
      </div> */}





    </>
  );
};
export default Loginpage;
// Login.Layout = Layout


// export const getServerSideProps = async (context) => {
//   try {
//     const session = await getSession(context)

//     return {
//       props: {}
//     };
//   } catch (error) {
//     console.log(error)
//     return {
//       props: {}
//     };
//   }

// }

