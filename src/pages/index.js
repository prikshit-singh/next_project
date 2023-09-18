import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Blog from '../components/blogs/Blog'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import CategoryNav from '../components/CategoryNav'
import axios from 'axios'

function Home(props) {
  const [blogs, setBlogs] = useState([])
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    if(props.res){
      getBlogs()
    }
  }, [])
  const getBlogs = async () => {
    
    setBlogs(props.res.blog)
    setLoader(false)
    // }
  }
   console.log('index',props)
 

  return (
    <>
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
      <Navbar />
      <CategoryNav style={{ background: 'rgb(233, 231, 231)' }} />

      <div className={styles.homeComponentLayout}>
        <div className={styles.homeRightContainer}>
          <Blog props={blogs} />


        </div>
        <div className={styles.homeLeftContainer}>
          Trending
        </div>
      </div>

      {/* <CategoryNav fill="green" style={{ background: 'rgb(233, 231, 231)' }} />
      <Catagorybanner /> */}


       <Footer/>

    </>
  )
}


export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(`${process.env.DOMAIN_NAME}/api/getblogs`)
    const res1 = await axios.get(`${process.env.DOMAIN_NAME}/api/pdfupload/getpreviousyearpaper`)
    if (res.data.CODE === 200) {
      return {
        props: {
          res: res.data,
          res1: res1.data,
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