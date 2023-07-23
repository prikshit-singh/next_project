import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { toggolDialogue } from '../../slices/piblisherDialogueSlice';
import Files from 'react-files'
import myImg from "../utils/img.png";
import { AccessAlarm, ThreeDRotation, Close } from '@mui/icons-material';
import styles from "../styles/Publish.module.css";
import axios from 'axios';
import dynamic from "next/dynamic";
// const Files = dynamic(() => import("react-files").then((a) => a), {
//     ssr: false,
//   });
console.log('Files', Files)

function Publish(props) {
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [keywordText, setKeywordText] = useState("");
    const [imageSrc, setImageSrc] = useState('')
    const [fileSrc, setFileSrc] = useState('')
    const editorContent = useSelector((state) => state.editorSlice.content)
    console.log('content', editorContent)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setImageSrc(URL.createObjectURL(e.target.files[0]))
        setFileSrc(e.target.files[0])
    }
 
    const handlePublish = async () => {
        const cookieValue =await document.cookie
        .split('; ')
        .find(row => row.startsWith('token'))
        .split('=')[1];
        const formData = new FormData();
        formData.append('image', fileSrc);
        formData.append('title', title);
        formData.append('slug', title);
        formData.append('subtitle', subTitle);
        formData.append('keywords', keywordText);
        formData.append('content', editorContent);
        formData.append('date', Date.now());
        formData.append('token', cookieValue);
            const res = await axios.post('/api/blogimage',formData , {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })

    }




    return (
        <>
            <div className={styles.crossBtn}>
                <Close onClick={() => { dispatch(toggolDialogue(true)) }} />

            </div>
            <div className={styles.modelDiv}>
                <div className={styles.publishMainDiv}>

                    <div>
                        <h1>story preview</h1>
                        <div className={styles.imageBox}>
                            <input accept="image/*" type="file" id="files" onChange={handleChange} />
                            {/* <img id="image" src={imageSrc} /> */}
                            <Image
                                className={styles.imageContent}
                                width={200}
                                height={200}
                                src={imageSrc}
                                alt="this is image"
                            />
                        </div>
                        <div>
                            <input
                                className={styles.title}
                                type="text"
                                value={title}
                                placeholder="Write A Title"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                            <input
                                className={styles.title}
                                type="text"
                                value={subTitle}
                                placeholder="Write A Title"
                                onChange={(e) => {
                                    setSubTitle(e.target.value);
                                }}
                            />
                            <p className={styles.note1}>
                                <span className={styles.note}> Note : </span> changes here will
                                affect how your story appears in public places
                            </p>
                        </div>
                    </div>

                    <div>
                        <h1> Publishing to : </h1>
                        <p>
                            <span>
                                Add or change topics (upto to 5) so readers know what is your
                                story about
                            </span>
                        </p>
                        <textarea
                            className={styles.textarea}
                            placeholder=" Add a topic ..."
                            value={keywordText}
                            onChange={(event) => {
                                setKeywordText(event.target.value);
                            }}
                        />
                        <div className={styles.link}>
                            <Link href="/learn">learn more</Link>
                            <span> about what happens to your post when you publish </span>
                        </div>
                        <button
                            className={styles.button}
                            onClick={handlePublish}
                        >

                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Publish;