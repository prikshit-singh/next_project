import React,{useState} from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import styles from "../../styles/signup.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async() =>{

    let data = {email,password}
    const res = await axios.post('/api/login',data)
    if(res.data.CODE === 200){
      console.log(res.data.token)
      document.cookie = "token=" + res.data.token;
      // router.push('/login')
    }
    console.log(res)
  }
  return (
    <>
      <Navbar/>
      <div className={styles.signUpMainDiv}>
        <div className={styles.signupbox}>
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
