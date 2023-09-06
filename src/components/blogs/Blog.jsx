import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Loader from '../Loader';
import styles from '../../styles/Home.module.css'


function Blog(props) {
    const [loader, setLoader] = useState(false)
    const router = useRouter()

    const readBlog = (data) => {
        const slug1 = data.slug.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') + '-' + `${data._id}`
        router.push(`blog/${slug1.replaceAll('--', '-')}`)
    }
    return (
        <>
            {loader ? <Loader /> : null}
            <div className={styles.homeContentDiv}>
                <div className={styles.containerColumn}>
                    {props.props.map((data, index) => {
                        console.log(data)
                        {/* const htmlFile = await axios.get(data.content) */ }
                        let time = new Date(parseInt(data.date));
                        let newTimeString = time.toLocaleDateString()
                        return (
                            <>
                                <div key={index} className={styles.cardMainDiv} >
                                    <div className={styles.writerInfo}>
                                        <img src={data.writtenby.userImage} alt={`${data.writtenby.name} ${data.writtenby.lastname} ${data.title}`} />
                                        <span>{data.writtenby.name} {data.writtenby.lastname}</span>
                                        <span>{newTimeString}</span>
                                    </div>
                                    <div className={styles.blogWrittenByContainer}>
                                    </div>

                                    <div className={styles.cardContent}>
                                        <div className={styles.cardContentText}>
                                            <h3 onClick={() => {
                                                readBlog(data)
                                            }}>{data.title}</h3>

                                            <p className={styles.cardContentPara}>{data.subtitle}</p>

                                        </div>
                                        <div className={styles.cardContentImage}>
                                            <img
                                                className={styles.cardMainDivImageStyle}
                                                src={data.image}
                                                alt={data.title}
                                                priority={true}
                                            ></img>
                                        </div>

                                    </div>


                                </div>
                            </>


                        )

                    })}




                </div>
            </div>
        </>
    );
}




export default Blog;