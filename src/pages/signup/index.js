import React from "react";
import styles from "../../styles/signup.module.css";
import {  Visibility,VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pswrd, setPswrd] = useState("");
  const [showPassword,setShowPassword] = useState(false)
  return (
    <>
      <div className={styles.body}>
        <div className={styles.signupbox}>
          <h1>Sign Up</h1>
          <h4>It's free and only takes a minute</h4>
          <form action="" className={styles.form}>
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
            <label>phone number</label>
            <input
              id="telNo"
              name="telNo"
              type="tel"
              size="20"
              minlength="9"
              maxlength="10"
            />
            
              <label>Password</label>
              <div >
              <input
                type={showPassword?'text':"password"}
                value={pswrd}
                placeholder=" "
                onChange={(e) => {
                  setPswrd(e.target.value);
                }}
              />
              {showPassword?<Visibility onClick={()=>{setShowPassword(!showPassword)}} className={styles.password}/> :<VisibilityOff onClick={()=>{setShowPassword(!showPassword)}} className={styles.password}/>}
              
            </div>

            <label>Confirm Password</label>
            <input type="password" placeholder="" required />

            <input
              className={styles.button}
              type="button"
              value="Submit"
              onClick={() => {
                console.log(firstName, lastName, email, pswrd);
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
