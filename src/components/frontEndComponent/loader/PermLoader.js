import React from 'react';
import Loader from '../loader/loader.jpg'
import Image from 'next/image';
import { positions } from 'slate';
export default function PermLoader() {

    return (
        <>
            <div style={{position:'absolute',left:'40%',top:'25%'}} className='permloading'>
                <Image
                    src={Loader}// Relative path to the GIF image from the 'public' directory
                    alt="My GIF Image" // Alt text for accessibility
                    width={400} // Specify the width of the image
                    height={400} // Specify the height of the image
                />
                {/* <img style={{ height: '40px', width: '40px' }} src={Loader} alt='logo' /> */}
            </div>
        </>
    )
}
