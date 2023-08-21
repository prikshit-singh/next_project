import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import dynamic from "next/dynamic";
import { useSelector } from 'react-redux';
import CustomEditor from '@/components/Editor';
import Publish from '@/components/Publish';
import axios from 'axios';
import withAuth from '@/components/Auth';
import Layout from '@/layouts/mainLayout'
import styles from '../../styles/Write.module.css'
import 'suneditor/dist/css/suneditor.min.css';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader'

function Write() {
    const [loader, setLoader] = useState(true)
    const openDialogue = useSelector(state => state.publisherDialogueSlice.state)
    return (
        <>
            <Navbar />
           
                <div className={styles.editorScreen}>
                    <div className={styles.EditorMainDiv}>
                        <CustomEditor />
                    </div>
                </div>
                
        </>
    );
}

export default withAuth(Write)
//  index;
// Write.Layout = Layout
