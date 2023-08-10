import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'
import Layout from "@/layouts/mainLayout";
import Navbar from "@/components/Navbar";
import dynamic from 'next/dynamic'
const SyntaxHighlighter = dynamic(async () => await import("react-syntax-highlighter").then((a) => a), {
  ssr: false,
});
const { dark } = dynamic(async () => await import('react-syntax-highlighter/dist/esm/styles/prism').then((a) => a), {
  ssr: false,
});
const { vs } = dynamic(async () => await import('react-syntax-highlighter/dist/esm/styles/prism').then((a) => a), {
  ssr: false,
});

import axios from "axios";

import style from "../../styles/Blog.module.css";
export default function Page() {
  const router = useRouter();
  const [content, setContent] = useState(null)
  const [title, setTitle] = useState(null)
  useEffect(() => {
    console.log('useEffect')
    getBlogById();
    addLineNumbersToPres()

  }, [router.pathname]);
  function addLineNumbersToPres() {
    const pres = document.querySelectorAll('pre')
    pres.forEach((pre) => {
      const lineNumberWrapper = document.createElement('span')
      lineNumberWrapper.classList.add('pre-line-numbers')
  
      const preLines = pre.textContent.split('\\n').length
      for (let i = 0; i < preLines - 1; i++) {
        const span = document.createElement('span')
        span.appendChild(document.createTextNode(i))
        lineNumberWrapper.appendChild(span)
      }
  
      pre.insertBefore(lineNumberWrapper, pre.firstChild)
    })
  }
  
  const getBlogById = async () => {
    console.log('id');
    // let slug = await router.query.slug;
    let slug1 = window.location.pathname.split('/').reverse()[0]
    let ID = slug1.split('-').reverse()[0]
    console.log('slug', ID)
    if (ID) {
      // let queryLength = slug.split("-").length;
      // let id = await slug.split("-")[queryLength - 1];
      // console.log('id',id);
      const res = await axios.post(`/api/getblogs/getblogbyid`, { id: ID });
      console.log(1)
      if (res.status === 200) {
        const htmlFile = await axios.get(res.data.blog.content)
        setTitle(res.data.blog.title)
        setContent(htmlFile.data);
      }
    }

  };
 
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          key="og:title"
          name="og:title"
          content={title}
        />
      
          <meta data-rh="true" name="description" content={title}></meta>
          <meta data-rh="true" property="og:description" content={title}></meta>
      </Head>
      <Navbar />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
        {/* <SyntaxHighlighter language="jsx" style={vs}>
   {preContent}
      </SyntaxHighlighter> */}
        <div className={style.blogDiv} style={{ width: '50%' }} dangerouslySetInnerHTML={{ __html: content }} />
      </div >
    </>
  );
}
Page.Layout = Layout;
