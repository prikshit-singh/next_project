import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/layouts/mainLayout'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    
    <Head>
      <title>next index</title>
    </Head>
     hello next
     
    </>
  )
}

 Home.Layout = Layout
