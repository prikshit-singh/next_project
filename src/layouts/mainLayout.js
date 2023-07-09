import Navbar from '../components/Navbar'
import styles from '../styles/Layout.module.css'
import Footer from '@/components/Footer'
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
     <main className={styles.mainLayout}>{children}</main>
     {/* <Footer /> */}
     </>
  )
}