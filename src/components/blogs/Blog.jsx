import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Loader from '../Loader';
import styles from '../../styles/Home.module.css'



export const getServerSideProps = async (context) => {
    try {

        const res = await axios.get(`http://localhost:3000/api/getblogs`)
        console.log('process.env.DOMAIN_NAME',res)

        if (res.data.CODE === 200) {
            return {
                props: {
                    res: res.data
                }
            };
        }

    } catch (error) {
        console.log(error)
        return {
            props: {}
        };
    }

}


function Blog(props) {
    const [blogs, setBlogs] = useState([])
    const [loader, setLoader] = useState(true)
    const router = useRouter()
    useEffect(() => {
        getBlogs()
    }, [])
    const getBlogs = async () => {
        console.log('props',props)
        // setBlogs(props.res.blog)
        setLoader(false)
        // }
    }

    const readBlog = (data) => {
        const slug1 = data.slug.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') + '-' + `${data._id}`
        router.push(`blog/${slug1.replaceAll('--', '-')}`)
    }
    return (
        <>
            {loader ? <Loader /> : null}
            <div className={styles.homeContentDiv}>
                <div className={styles.containerColumn}>
                    {/* {blogs.map((data, index) => {
                        let time = new Date(parseInt(data.date));
                        let newTimeString = time.toLocaleTimeString() + ' ' + time.toLocaleDateString()
                        return (

                            <div key={index} className={styles.cardMainDiv} >
                                <img
                                    className={styles.cardMainDivImageStyle}
                                    src={data.image}
                                    alt='image'
                                    priority={true}
                                ></img>
                                <div className={styles.cardContent}>
                                    <span>CATAGORY</span>
                                    <h3 onClick={() => {
                                        readBlog(data)
                                    }}>{data.title}</h3>
                                    <div className={styles.writerInfo}>
                                        <img
                                            className={styles.imageStyleWriter}
                                            // src={`https://images.unsplash.com/photo-1684007897270-c7f12ff4e01c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
                                            src={data.image}

                                            alt='image'
                                            priority={true}
                                        ></img>
                                        <span>By</span>
                                        <p>{data.writtenby.name} {data.writtenby.lastname}</p>
                                        <span>{newTimeString}</span>
                                    </div>
                                    <p className={styles.cardContentPara}>{data.subtitle}</p>

                                </div>


                            </div>

                        )

                    })} */}




                </div>
            </div>
        </>
    );
}




export default Blog;