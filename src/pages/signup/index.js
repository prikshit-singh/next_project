import React from "react";
import styles from "../../styles/signup.module.css";
import { useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const router = useRouter()
  const handleSignup = async() =>{

    let data = {firstName,lastName,email,phone,password}
    const res = await axios.post('/api/signup',data)
    if(res.data.CODE === 200){
      router.push('/login')
    }
    console.log(res)
  }
  return (
    <>
      <div className={styles.signUpMainDiv}>
        <div className={styles.signupbox}>
          <h1>Sign Up</h1>
          <h4>It's free and only takes a minute</h4>
          <div className={styles.form}>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              placeholder=" "
              onChange={(e) => {
                setFirstName(e.target.value);
                console.log(e.target.value);
              }}
            />
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              placeholder=" "
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder=" "
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
             <label>Phome</label>
            <input
              type="number"
              value={phone}
              placeholder=" "
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder=" "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label>Confirm Password</label>
            <input type="password" placeholder="" required />
            <input className={styles.button} type="button" value="Submit"
              onClick={handleSignup} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
