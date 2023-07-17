import React from "react";
import styles from "../../styles/signup.module.css";
const Login = () => {
    const [email, setEmail] = useState(" ");
    const [pswrd, setPswrd] = useState(" ");
    
  return (
    <>
      <div className={styles.body}>
        <div className={styles.loginbox}>
          <h1>Login</h1>
          <form className={ styles.form}>
            <label>Email</label>
            <input type="email"  value={email}
              placeholder=" "
              onChange={(e) => {
                setEmail(e.target.value);
              }} />
            <label>Password</label>
            <input type="password" value={pswrd}
              placeholder=" "
              onChange={(e) => {
                setPswrd(e.target.value);
              }}/>
            <input className={styles.button} type="button" value="Submit"
            onClick={() => {
                                console.log( email, pswrd);
                            }} />
            
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
