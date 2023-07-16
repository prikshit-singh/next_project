import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from '@/layouts/mainLayout'
import styles from '@/styles/Home.module.css'
import Image from 'next/image';
import axios from 'axios'
import { useRouter } from 'next/router'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [blogs, setBlogs] = useState([])
  const router = useRouter()
  useEffect(() => {
    getBlogs()
  }, [])
  const getBlogs = async () => {
    let blogs = await axios.get('http://localhost:3000/api/getblogs')
    if (blogs.status === 200) {
      setBlogs(blogs.data.blog)
    }
  }

  const readBlog = (data) => {
    router.push(`/blog/${data.title.split(' ').join('-')}-${data._id}`)
  }
  return (
    <>

      <Head>
        <title>The Code Crafters</title>
      </Head>

      {/* #f8f9fa!important */}
      <div className={styles.headerBanner}>
        <div className={styles.container}>
          <div className={styles.containerRow}>
            <span>Category</span>
            <h3>Coading</h3>
            <p>Category description here.. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam error eius quo, officiis non maxime quos reiciendis perferendis doloremque maiores!</p>
          </div>
          <div className={styles.containerRow}>

          </div>

        </div>

      </div>

      <div className={styles.homeContentDiv}>
        <div className={styles.containerColumn}>
          {blogs.map((data, index) => {
            const base64String = Buffer.from(data.image).toString('base64');
            const imageSrc = `data:image/jpeg;base64,${base64String}`;
            return (

              <div key={index} className={styles.cardMainDiv} onClick={() => {
                readBlog(data)
              }}>
                <Image
                  // className={styles.imageStyle}
                  src={imageSrc}
                  width={200}
                  alt='image'
                  priority={true}
                  height={200}
                ></Image>
                <div className={styles.cardContent}>
                  <span>CATAGORY</span>
                  <h3>{data.title}</h3>
                  <div className={styles.writerInfo}>
                    <Image
                      className={styles.imageStyleWriter}
                      // src={`https://images.unsplash.com/photo-1684007897270-c7f12ff4e01c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
                      src={imageSrc}
                      width={30}
                      alt='image'
                      priority={true}
                      height={30}></Image>
                    <span>By</span>
                    <p>Anju Malik</p>
                    <span>{data.date}</span>
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

Home.Layout = Layout
