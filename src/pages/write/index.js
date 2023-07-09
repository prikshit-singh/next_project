import React, { useState, useEffect, useRef } from 'react';
import { Html, Body, Main, NextScript } from 'next/document';
import Head from 'next/head'
import CustomEditor from '@/components/Editor';
import axios from 'axios';
import Layout from '@/layouts/mainLayout'
import styles from '../../styles/Write.module.css'
import 'suneditor/dist/css/suneditor.min.css';

export default function Write() {
    

    return (
        <>
            <div className={styles.editorScreen}>

            <div className={styles.EditorMainDiv}>
                <CustomEditor />
                </div>
            </div>
        </>
    );
}

Write.Layout = Layout

//  index;