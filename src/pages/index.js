import Head from 'next/head'
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
      <div className='loginDIv'>


        <div className="container is-widescreen is-fluid">
        <div className='inputDiv'>
        <input className="input is-primary" type="email" placeholder="Primary input" />
        </div>
        <div className='inputDiv'>
        <input className="input" type="password" placeholder="input" />
        </div>
        <div className='inputDiv'>
        <input class="button" type="button" value="Submit input" />
        </div>
        </div>
      </div>
    </>
  )
}

Home.Layout = Layout
