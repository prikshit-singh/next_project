import React,{useState} from "react";
import axios from "axios";
import Loader from '@/components/Loader'

import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router'
 import Cookies from "js-cookie";
 import {  toast } from 'react-toastify';
import styles from "../../styles/signup.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loader,setLoader]=useState(false)

  const router = useRouter()
  const handleLogin = async() =>{
    setLoader(true)
    let data = {email,password}
    const res = await axios.post('/api/login',data)
    if(res.data.CODE === 200){
      Cookies.set('token',res.data.token)
      toast('Login Successful', { hideProgressBar: false, autoClose: 2000, type: 'success' })
      setLoader(false)

      router.push('/write')
    }else{
      setLoader(false)
      
      toast('Something went wrong', { hideProgressBar: false, autoClose: 2000, type: 'error' })

    }
  }
  return (
    <>
    {loader ?<Loader/> :null}
      <Navbar/>
     
      <div className={styles.signUpMainDiv}>
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
            <input className={styles.button} type="button" value="Submit"
              onClick={handleLogin} />

          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
