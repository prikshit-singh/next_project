import Navbar from '../components/Navbar'
import styles from '../styles/Layout.module.css'
// import Footer from '@/components/Footer'
// import Authprovider from '@/components/Authprovider/Authprovider'
export default function Layout({ children }) {
  return (
    <>
     <main className={styles.mainLayout}>{children}</main>
     
     
     </>
  )
}