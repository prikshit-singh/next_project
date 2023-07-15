import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { toggolDialogue } from '../../slices/piblisherDialogueSlice';
import myImg from "../utils/img.png";
import { AccessAlarm, ThreeDRotation, Close } from '@mui/icons-material';
import styles from "../styles/Publish.module.css";


function Publish(props) {
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [keywordText, setKeywordText] = useState("");
    const dispatch = useDispatch()
    return (
        <>
            <div className={styles.crossBtn}>
                <Close onClick={()=>{dispatch(toggolDialogue(true))}} />

            </div>
            <div className={styles.modelDiv}>
                <div className={styles.publishMainDiv}>

                    <div>
                        <h1>story preview</h1>
                        <div className={styles.imageBox}>
                            <Image
                                className={styles.imageContent}
                                src={myImg}
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
                            onClick={() => {
                                console.log(title, subTitle, keywordText);
                            }}
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