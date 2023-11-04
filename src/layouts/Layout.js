import Navbar from '../components/frontEndComponent/navabrs/Navbar'
import styles from '../styles/Layout.module.css'
import Footer from '../components/Footer'
// import Authprovider from '@/components/Authprovider/Authprovider'
export default function Layout({ children }) {
  return (
    <>
     <div className={`contentBody`}>
     <Navbar/>
     <main >{children}</main>
     </div>
     <Footer/>
     </>
  )
}