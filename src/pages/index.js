import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Blog from '../components/blogs/Blog'
// import Layout from '@/layouts/mainLayout'
import styles from '../styles/Home.module.css'
import Image from 'next/image';
import images from '../../public/react.jpg'
import axios from 'axios'
import { useRouter } from 'next/router'
import Catagorybanner from '../components/catagoryPageComponents/Catagorybanner';
import { useDispatch, useSelector } from 'react-redux';
import { toggolDialogue } from '../../slices/publisherDialogueSlice'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import CategoryNav from '../components/CategoryNav'
const inter = Inter({ subsets: ['latin'] })
import Cookies from 'js-cookie';


function Home(props) {
  const [blogs, setBlogs] = useState([])
  const [loader, setLoader] = useState(true)
  const router = useRouter()
  useEffect(() => {
    getBlogs()
  }, [])
  const getBlogs = async () => {
    // let blogs = await axios.get('/api/getblogs')
    // console.log(props.res)
    // if (props.res.CODE === 200) {
    setBlogs(props.res.blog)
    setLoader(false)
    // }
  }

  const readBlog = (data) => {
    const slug1 = data.slug.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') + '-' + `${data._id}`
    router.push(`blog/${slug1.replaceAll('--', '-')}`)
  }




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

      <CategoryNav fill="green" style={{ background: 'rgb(233, 231, 231)' }} />
      <Catagorybanner />

      {/* <Blog/> */}

      <div className={styles.homeContentDiv}>
        <div className={styles.containerColumn}>
          {blogs.map((data, index) => {
            let time = new Date(parseInt(data.date));
            let newTimeString = time.toLocaleTimeString() + ' ' + time.toLocaleDateString()
            return (

              <div key={index} className={styles.cardMainDiv} >
                <img
                  className={styles.cardMainDivImageStyle}
                  src={data.image}
                  alt='image'
                  priority={true}
                ></img>
                <div className={styles.cardContent}>
                  <span>CATAGORY</span>
                  <h3 onClick={() => {
                    readBlog(data)
                  }}>{data.title}</h3>
                  <div className={styles.writerInfo}>
                    <img
                      className={styles.imageStyleWriter}
                      // src={`https://images.unsplash.com/photo-1684007897270-c7f12ff4e01c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
                      src={data.image}

                      alt='image'
                      priority={true}
                    ></img>
                    <span>By</span>
                    <p>{data.writtenby.name} {data.writtenby.lastname}</p>
                    <span>{newTimeString}</span>
                  </div>
                  <p className={styles.cardContentPara}>{data.subtitle}</p>

                </div>


              </div>

            )

          })}




        </div>
      </div>

    </>
  )
}


export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(`${process.env.DOMAIN_NAME}/api/getblogs`)
    if (res.data.CODE === 200) {
      return {
        props: {
          res: res.data
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
// Home.Layout = Layout
export default Home;