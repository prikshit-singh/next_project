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
  const [university, setUniversity] = useState([])
  useEffect(() => {
    getAllUniversity()
  }, [])

  const getAllUniversity = async () => {
    const University = await axios.get(`${apis.baseUrl}${apis.getAllUniversity}`)
    if (University.data.CODE === 200) {

      setUniversity(University.data.result)

    }
  }

const session = useSession()

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
          <Scrollbar university={university} />
        </div>
        
      </Layout>
    </>
  )
}



export default Home;


