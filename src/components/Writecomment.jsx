import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSelector } from "react-redux";
import {  toast } from 'react-toastify';
import { useSession} from "next-auth/react"
const SunEditor = dynamic(async () => await import("suneditor-react").then((a) => a), {
    ssr: false,
});
const buttonList = dynamic(async () => await import("suneditor-react").then((a) => a), {
    ssr: false,
});
const {
    align,
    font,
    fontSize,
    fontColor,
    hiliteColor,
    horizontalRule,
    image,
    template,
} = dynamic(async () => await import("suneditor/src/plugins").then((a) => a), {
    ssr: false,
});

import { Button, Comment, Form, Header,Icon } from 'semantic-ui-react'

import 'suneditor/dist/css/suneditor.min.css';
import Cookies from "js-cookie";
import styles from "../styles/Writecomment.module.css";
import { Search, Close } from "@mui/icons-material";



const Writecomment = (props) => {
    const [comments, setComments] = useState('')
    const [selectedComment, setSelectedComment] = useState(null)
    const editor = useRef(null);

    const session = useSession()


    const getSunEditorInstance = (sunEditor) => {
        console.log(1, sunEditor)
        editor.current = sunEditor;
    };
    const blogData = useSelector((state) => { return state.blogData })
    console.log(blogData)
    const initialValue = [
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ]

    useEffect(() => {
        getComments()
    }, [])

    const getComments = async (data) => {
        let slug1 = window.location.pathname.split('/').reverse()[0]
        let ID = slug1.split('-').reverse()[0]
        let comments = await axios.post('/api/blogimage/getcomments', {}, {
            headers: {
                blogId: ID,
                token:session.data.userData.token
            }
        })
        if (comments.data.CODE === 200) {
            setComments(comments.data.blog.Comments)
        }


    }
    const postComment = async () => {
        let slug1 = window.location.pathname.split('/').reverse()[0]
        let ID = slug1.split('-').reverse()[0]
        console.log(editor.current.getContents())
        const data = {
            commentText: await editor.current.getContents(),
            commentedBy: '',
            commentDate: new Date(),
        }
        let COMMENTS = await axios.post('/api/blogimage/postcomment', data, {
            headers: {
                blogId: ID,
                token:session.data.userData.token
            }
        })
        if(COMMENTS.data.CODE ===200){
             toast('Comment Posted', { hideProgressBar: false, autoClose: 1000, type: 'success' })

        }else{
            toast('Please Login First', { hideProgressBar: false, autoClose: 1000, type: 'warning' })

        }

        getComments()
    }

    const replyComment = async () => {
        let slug1 = window.location.pathname.split('/').reverse()[0]
        let ID = slug1.split('-').reverse()[0]
        const data = {
            commentText: await editor.current.getContents(),
            commentedBy: '',
            commentDate: new Date(),
        }

        let comment = await axios.post('/api/blogimage/replycomment', data, {
            headers: {
                blogId: ID,
                token:session.data.userData.token,
                commentId: selectedComment._id
            }
        })
        if(comment.data.CODE ===200){
            toast('Comment Posted', { hideProgressBar: false, autoClose: 1000, type: 'success' })

       }else{
           toast('Please Login First', { hideProgressBar: false, autoClose: 1000, type: 'warning' })

       }

        getComments()

    }


    // console.log(comments)
    return (
        <>

            <Comment.Group className={styles.commentsGroupMainDiv}>
                <Header as='h3' dividing>
                    Comments
                </Header>

                <div className={styles.commentsGroupDiv}>
                    {comments.length > 0 ?
                        comments.map((data) => {
                            console.log(data)

                            return (
                                <>
                                    <Comment>
                                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                        <Comment.Content>
                                            <Comment.Author as='a'>{data.commentedBy.name} {data.commentedBy.lastname}</Comment.Author>
                                            <Comment.Metadata>
                                                {data.commentDate}
                                            </Comment.Metadata>
                                            <Comment.Text><div dangerouslySetInnerHTML={{ __html: data.commentText }} /></Comment.Text>
                                            <Comment.Actions>
                                                <Comment.Action onClick={() => { setSelectedComment(data) }}>Reply</Comment.Action>
                                            </Comment.Actions>
                                        </Comment.Content>
                                        {data.commentreplies.length > 0 ?
                                            data.commentreplies.map((ele, INDEX) => {
                                                return (<>
                                                    <Comment.Group>
                                                        <Comment>
                                                            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                                            <Comment.Content>
                                                                <Comment.Author as='a'>{ele.commentedBy.name} {ele.commentedBy.lastname}</Comment.Author>
                                                                <Comment.Metadata>
                                                                    <div> {ele.commentDate}</div>
                                                                </Comment.Metadata>
                                                                <Comment.Text><div dangerouslySetInnerHTML={{ __html: ele.commentText }} /></Comment.Text>
                                                                <Comment.Actions>
                                                                    <Comment.Action onClick={() => { setSelectedComment(data) }}>Reply</Comment.Action>
                                                                </Comment.Actions>
                                                            </Comment.Content>
                                                        </Comment>
                                                    </Comment.Group>
                                                </>)
                                            })
                                            : null}

                                    </Comment>

                                </>
                            )
                        })

                        :
                        'No Comments'
                    }
                </div>



                {selectedComment ? 
                <>
              
                    <p>Reply To {selectedComment.commentedBy.name} <div style={{border:'2px solid red',marginLeft: '10px'}}><Icon className={styles.replyToCrossBtn}  size='large' name='close' color='red'  onClick={()=>setSelectedComment(null)}  /></div> </p>
                </>
                 : null}
                <Form reply>
                    <div>
                        <SunEditor
                            // className={styles["custom-suneditor"]}
                            getSunEditorInstance={(sunEditor) => getSunEditorInstance(sunEditor)}
                            defaultValue="<p style=`text-align: center` >WRITE YOUR COMMENT HERE....</p"
                            // width="740px"
                            height="150px"
                            style={{ border: "2px solid green", fontColor: 'black', color: 'black' }}
                            autoFocus={true}
                            setOptions={{
                                showPathLabel: false,
                                allowedTags: "style",
                                attributesWhitelist: {
                                    all: "style",
                                    input: "checked",
                                },
                                buttonList: [
                                    // Default

                                    [
                                        "bold",
                                        "underline",
                                        "italic",
                                        "strike",
                                        "subscript",
                                        "superscript",
                                    ],



                                ],

                            }}
                        />
                    </div>

                </Form>
                <Button style={{ marginTop: '10px' }} content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => {
                    if (selectedComment) {
                        replyComment()
                    } else {
                        postComment()

                    }
                    // props.setDialogue(false)
                }} />
                <Button style={{ marginTop: '10px' }} content='Cancel' labelPosition='left' icon='cancel' color="red" onClick={() => {
                    props.setDialogue(false)
                }} />
            </Comment.Group>

        </>
    )
}

export default Writecomment