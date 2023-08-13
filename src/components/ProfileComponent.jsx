import styles from '../styles/Profile.module.css'
import Link from "next/link";
const ProfileComponent = () => {
    return (
        <div>
        <div className={styles.profileMainDiv}>
        <div className={styles.profileMinDiv}>
        <div className={ styles.divOne}>
                        <h1>Anju Malik</h1>
                        <div className={styles.linkBox}>
                        <p className={styles.profileLinks} >Home</p>
                        <p className={styles.profileLinks} >Lists</p>
                        <p className={styles.profileLinks} >About</p>
                        </div>
                        </div>
        <div className={styles.divTwo}>
            <h2> div 2</h2>
        </div>
        </div>
        </div>
          
        </div>
    );
};

export default ProfileComponent;