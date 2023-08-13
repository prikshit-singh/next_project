import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'
import Layout from "@/layouts/mainLayout";
import Navbar from "@/components/Navbar";
import dynamic from 'next/dynamic'


import axios from "axios";
import Loader from '@/components/Loader'

import style from "../../styles/Blog.module.css";
export default function Page() {
  const router = useRouter();
  const [content, setContent] = useState(null)
  const[comment,setComment]=useState('')
const[loader,setLoader]=useState(true)

  const [title, setTitle] = useState(null)
  useEffect(() => {
    console.log('useEffect')
    getBlogById();

  }, [router.pathname]);
  
  
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
      if (res.data.CODE === 200) {
        const htmlFile = await axios.get(res.data.blog.content)
        setTitle(res.data.blog.title)
        setContent(htmlFile.data);
        setLoader(false)
      }
    }

  };
  const likeBlog = async (data) => {
    let slug1 = window.location.pathname.split('/').reverse()[0]
    let ID = slug1.split('-').reverse()[0]
    let blogs = await axios.post('/api/blogimage/updatelikedby', {}, {
      headers: {
        blogId: ID
      }
    })
  }

  const getComments = async (data) => {
    let slug1 = window.location.pathname.split('/').reverse()[0]
    let ID = slug1.split('-').reverse()[0]
    let comments = await axios.post('/api/blogimage/getcomments', {}, {
      headers: {
        blogId: ID
      }
    })
    console.log(comments)
  }
  
  const postComment = async () => {
    let slug1 = window.location.pathname.split('/').reverse()[0]
    let ID = slug1.split('-').reverse()[0]
    const data ={ 
      commentText: comment,
      commentedBy: '',
      commentDate: new Date(),
  }
    let blogs = await axios.post('/api/blogimage/postcomment', data, {
      headers: {
        blogId: ID
      }
    })

    console.log(blogs)
  }
 
  return (
    <>
    {loader ?<Loader/> :null}
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

      <p onClick={() => likeBlog()}>Like</p>

      <input type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}} width={200} />
      <p onClick={() => postComment()}>Comment</p>
      <p onClick={() => getComments()}>getComment</p>


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
