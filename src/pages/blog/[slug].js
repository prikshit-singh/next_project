import React from 'react';
import { useEffect, useState, useReducer } from "react";
import { updateBlogData } from '../../../slices/blog/blog';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Head from 'next/head'
import Layout from "@/layouts/mainLayout";
import Navbar from "@/components/Navbar";
import dynamic from 'next/dynamic'
import { ThumbUp } from '@mui/icons-material';
import imag from '../../../public/react.jpg'
import { UilThumbsUp, UilComments, UilShare, UilBookmarkFull } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';
import { Button, Icon, Label, Header, Segment, Item } from 'semantic-ui-react'
import axios from "axios";
import Cookies from "js-cookie";

import Loader from '@/components/Loader'
import Writecomment from "@/components/Writecomment";
import CategoryNav from '@/components/CategoryNav';
import { Modal, Box } from '@mui/material'
import style from "../../styles/Blog.module.css";
export const getServerSideProps = async (context) => {
  try {
    const { slug } = context.params
    const ID = await slug.split('-').reverse()[0]
    const res = await axios.get(`${process.env.DOMAIN_NAME}/api/getblogs/getblogbyid/${ID}`)
    const htmlFile = await axios.get(res.data.blog.content)
    return {
      props: {
        res: res.data,
        htmlFile: htmlFile.data
      }
    };
  } catch (error) {
    console.log(error)
    return {
      props: { res: false }
    };
  }

}

function Page(props) {
  const router = useRouter();
  const [content, setContent] = useState(null)
  const [loader, setLoader] = useState(true)
  const [likedBy, setLikedBy] = useState()
  const [commentedBy, setCommentedBy] = useState()
  const [title, setTitle] = useState(null)
  const [dialogue, setDialogue] = useState(false)
  const [writerData, setwriterData] = useState(false)
  const userId = Cookies.get('userId')
  // const userData = useSelector(state => state.userData.user)

  const dispatch = useDispatch()
  useEffect(() => {
    if (props.res) {
      getBlogById();
    }
    // 

  }, [router.pathname]);

  const paragraph = <img src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
  const getBlogById = async () => {
    let slug1 = window.location.pathname.split('/').reverse()[0]
    let ID = slug1.split('-').reverse()[0]
    if (ID) {
      if (props.res.CODE === 200) {
        dispatch(updateBlogData([props.res.blog]))
        setwriterData(props.res.blog.writtenby)
        setTitle(props.res.blog.title)
        setContent(props.htmlFile);
        setLikedBy(props.res.blog.LikedBy)
        setCommentedBy(props.res.blog.Comments)
        setLoader(false)
      }
    }

  };
  const likeBlog = async (data) => {

    let slug1 = window.location.pathname.split('/').reverse()[0]
    let ID = slug1.split('-').reverse()[0]
    let blogs = await axios.post('/api/blogimage/updatelikedby', {}, {
      headers: {
        blogId: ID,
        token: await Cookies.get('token')
      }
    })

    if (blogs.data.CODE === 200) {
      setLikedBy(blogs.data.blog.LikedBy)
    } else {
      toast('Please Login First', { hideProgressBar: false, autoClose: 2000, type: 'warning' })
      // router.push('/login')
    }
  }
  if (likedBy) {
    console.log('userId', userId)
    console.log(likedBy, likedBy.includes(userId))
  }



  return (
    <>
      {loader ? <Loader /> : null}
      <Head>
        <title>{title}</title>
        <meta
          key="og:title"
          name="og:title"
          content={title}
        />

        <meta data-rh="true" name="description" content={title}></meta>
        <meta data-rh="true" property="og:description" content={title}></meta>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta property="title" content={title}/>
        <meta name="keywords" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:images" content="https://gitgurus.com/nLogo.png" />
        <meta property="og:url" content="https://gitgurus.com/" />
        <meta property="og:site_name" content="gitgurus" />
        <meta property="og:type" content="Website" />
      </Head>

      <Navbar />
      <CategoryNav />

      <div>
        <Modal
          open={dialogue}
        >
          <Box sx={style.toggolDialogueMainContainer} className={style.toggolDialogueMainContainer}>
            {props.res ? <Writecomment setDialogue={setDialogue} blog={props.res.blog} /> : null}

          </Box>
        </Modal>
      </div>


      <div className={style.uderMetaData}>
        <Item.Group divided className={style.uderMetaDataItems}>
          <Item>
            <Item.Description className={style.uderMetaDataItemDescription} >{paragraph}</Item.Description>

            <Item.Content className={style.uderMetaDataName}>
              <Item.Header as='a'>{writerData ? `${writerData.name} ${writerData.lastname}` : ''}</Item.Header>
              <Item.Meta>
                <span className='cinema'>{writerData ? `${writerData.profession}` : ''}</span>
              </Item.Meta>

            </Item.Content>
          </Item>


        </Item.Group>
      </div>


      <div className={style.likeCommentMainDiv}>
        <div className={style.likeComment}>
          <div className={style.likeCommentSubDiv}>
            <div >

              <Icon className={style.likeCommentSubDivIcons} size='big' name='heart' color={likedBy && likedBy.includes(userId) ? 'red' : 'grey'} onClick={() => likeBlog()} />
              <Label className={style.likeCommentSubDivIcons} as='a' basic color='white' pointing='left' onClick={() => likeBlog()}>
                {likedBy ? likedBy.length : 0}
              </Label>

            </div>

            <div >

              <Icon className={style.likeCommentSubDivIcons} size='big' name='comments' color='grey' onClick={() => { setDialogue(true) }} />

              <Label className={style.likeCommentSubDivIcons} as='a' basic pointing='left' onClick={() => { setDialogue(true) }} >
                {commentedBy ? commentedBy.length : 0}
              </Label>

            </div>
          </div>

          <div className={style.likeCommentSubDiv}>
            <Icon className={style.likeCommentSubDivIcons} size='big' name='share square' color='grey' />
            <Icon className={style.likeCommentSubDivIcons} size='big' name=' bookmark' color='grey' />
            <Icon className={style.likeCommentSubDivIcons} size='big' name='file audio' color='grey' />
          </div>
        </div>
      </div>


      <div className={style.blogContainerMainDiv}  >
        <div className={style.blogContainerContentDiv} dangerouslySetInnerHTML={{ __html: content }} />
      </div >
    </>
  );
}



Page.Layout = Layout;
export default Page
