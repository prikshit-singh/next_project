import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'
import Layout from "@/layouts/mainLayout";
import Navbar from "@/components/Navbar";
import axios from "axios";
export default function Page() {
  const router = useRouter();
  const [content, setContent] = useState(null)
  const [title, setTitle] = useState(null)
  useEffect(() => {
    console.log('useEffect')
    getBlogById();
  }, [router.pathname]);


  const getBlogById = async () => {
    console.log('id');
    // let slug = await router.query.slug;
    let slug1 =window.location.pathname.split('/').reverse()[0]
    let ID =slug1.split('-').reverse()[0]
    console.log('slug',ID)
    if (ID) {
      // let queryLength = slug.split("-").length;
      // let id = await slug.split("-")[queryLength - 1];
      // console.log('id',id);
      const res = await axios.post(`/api/getblogs/getblogbyid`, { id:ID });
      console.log(1)
      if(res.status===200){
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
    <Navbar/>
   
    <div style={{ display: 'flex',alignItems:'center',justifyContent:'center',marginTop:'100px'  }}>
      <div style={{ width:'50%' }} dangerouslySetInnerHTML={{ __html: content }} />
    </div >
    </>
  );
}
Page.Layout = Layout;
