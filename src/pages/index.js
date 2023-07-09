import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from '@/layouts/mainLayout'
import styles from '@/styles/Home.module.css'
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const imgArr = [1, 2, 3, 4, 5, 6]
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
          {imgArr.map((data) => {
            return (

              <div key={data} className={styles.cardMainDiv}>
                <Image
                  className={styles.imageStyle}
                  // src={`https://images.unsplash.com/photo-1684007897270-c7f12ff4e01c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
                  src=''
                  width={300}
                  alt='image'
                  priority={true}
                  height={200}></Image>
                <div className={styles.cardContent}>
                  <span>CATAGORY</span>
                  <h3>Blog Heading</h3>
                  <div className={styles.writerInfo}>
                  <Image
                  className={styles.imageStyleWriter}
                  // src={`https://images.unsplash.com/photo-1684007897270-c7f12ff4e01c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
                  src=''
                  width={30}
                  alt='image'
                  priority={true}
                  height={30}></Image>
                  <span>By</span>
                  <p>Anju Malik</p>
                  <span>23-5-2023</span>
                  </div>
                  <p className={styles.cardContentPara}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>

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
