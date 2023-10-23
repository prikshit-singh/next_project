import React from 'react';
import Loader from '../loader/loader.svg'
import Image from 'next/image';
import styles from '../../../styles/loader.module.css'
import { positions } from 'slate';
export default function Componentloader() {

    return (
        <>
            <div className={styles.componentloader}>
                <Image
                    src={Loader}// Relative path to the GIF image from the 'public' directory
                    alt="My GIF Image" // Alt text for accessibility
                    width={100} // Specify the width of the image
                    height={100} // Specify the height of the image
                />
                {/* <img style={{ height: '40px', width: '40px' }} src={Loader} alt='logo' /> */}
            </div>
        </>
    )
}
