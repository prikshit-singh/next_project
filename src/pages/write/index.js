import React, { useState, useEffect, useRef } from 'react';

import CustomEditor from '../../components/Editor';
import {withAuth} from '../../components/Auth';
import styles from '../../styles/Write.module.css'
import Layout from '../../layouts/Layout';
import 'suneditor/dist/css/suneditor.min.css';
import Navbar from '../../components/frontEndComponent/navabrs/Navbar';
import Footer from '../../components/Footer';
function Write() {
    return (
        <>
           <Layout> 
           <div className={styles.editorScreen}>
                    <div className={styles.EditorMainDiv}>
                        <CustomEditor />
                    </div>
                </div>
        </Layout>
                
        </>
    );
}

export default withAuth(Write)
//  index;
// Write.Layout = Layout
