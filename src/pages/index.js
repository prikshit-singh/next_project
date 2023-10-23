import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Loader from '../components/Loader'
import { apis } from '../../apis'
import axios from 'axios'
import Scrollbar from '../components/frontEndComponent/FrontPageComponent/Scrollbar'
import Layout from '../layouts/Layout'
import Searchquestionpaper from '../components/multiLeveldropdown/Searchquestionpaper'
import { useSession } from 'next-auth/react'
function Home(props) {
  const [loader, setLoader] = useState(false)
const session = useSession()
console.log(session)

  return (
    <>
      <Layout>
        {loader ? <Loader /> : null}

        <Head>
          <title>GitGurus</title>
          <meta
            key="og:title"
            name="og:title"
            content="gitgurus.com"
          />

          <meta data-rh="true" name="description" content="gitgurus.com"></meta>
          <meta data-rh="true" property="og:description" content="gitgurus.com"></meta>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <meta property="title" content="gitgurus.com" />
          <meta name="keywords" content="blog, study material, data structure, JavaScript, Design, Web Development, React.js" />
          <meta property="og:title" content="gitgurus.com" />
          {/* <meta property="og:images" content={props.res.blog.image}/> */}
          <meta property="og:url" content="www.gitgurus.com" />
          <meta property="og:site_name" content="gitgurus" />
          <meta property="og:type" content="Website" />
        </Head>
        <img
          src="/banner.jpg"
          layout="responsive"
          // width={200}
          // height={100}
          className={styles.banner}
          alt="Picture of the author"
        />
        <Searchquestionpaper/>
        <div className={styles.scrollBarDiv}>
          <Scrollbar university={props.University} />
        </div>
        
      </Layout>
    </>
  )
}


export const getServerSideProps = async (context) => {
  try {
    // const res = await axios.get(`${apis.baseUrl}getblogs`)
    // const res1 = await axios.get(`${apis.baseUrl}pdfupload/getpreviousyearpaper`)
    // const menus = await axios.get(`${apis.baseUrl}settings/menusettings/getmenus`)
    const University = await axios.get(`${apis.baseUrl}${apis.getAllUniversity}`)
    if (University.data.CODE === 200) {
      return {
        props: {
          // res: res.data,
          // res1: res1.data,
          // menus: menus.data,
          University: University.data.result

        }
      };
    }

  } catch (error) {
    console.log(error)
    return {
      props: {}
    };
  }

}
export default Home;


{/* <div className={styles.homeComponentLayout}>
        <div className={styles.homeRightContainer}>
          <Blog props={blogs} />


        </div>
        <div className={styles.homeLeftContainer}>
          Trending
        </div>
      </div> */}

{/* <CategoryNav fill="green" style={{ background: 'rgb(233, 231, 231)' }} />
      <Catagorybanner /> */}
