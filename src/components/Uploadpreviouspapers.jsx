import React from 'react';
import { useState } from 'react';
import { Modal, Box } from '@mui/material'
import { useSession } from "next-auth/react"
import styles from "../styles/uploadpdf.module.css";
import { toast } from 'react-toastify';
import Loader from "./Loader";

import axios from 'axios';
import {
    Icon,
    Input
} from 'semantic-ui-react'

function Uploadpreviouspapers(props) {

    const [loader, setLoader] = useState(false)

    const [file, setFile] = useState(null);
    const [university, setUniversity] = useState([

        { name: 'MDU', value: 'mdu' },
        { name: 'KUK', value: 'kuk' },
        { name: 'CU', value: 'cu' },
        { name: 'PU', value: 'pu' },


    ]);
    const [selectedUniversity, setSelectedUniversity] = useState('')
    const [selectedCourse, setSelectedCourse] = useState('')
    const [course, setCourse] = useState([
        { name: 'BCA', value: 'bca' },
        { name: 'MCA', value: 'mca' },
        { name: 'BA.', value: 'ba' },
        { name: 'MA', value: 'MA' },
        { name: 'BSC', value: 'bsc' },
        { name: 'MSc', value: 'msc' },
    ]);
    const [year, setYear] = useState('');
    const [subject, setSubject] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [semester, setSemester] = useState('');
    const [college, setCollege] = useState('')
    const session = useSession()

    const style1 = {
        // dispatch:'flex',
        position: 'absolute',
        width: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        // p: 0,
    };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };
    const handleSubmit = async () => {
        // Handle form submission here
        if (selectedUniversity == '') {
            toast('Please select university', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        if (selectedCourse == '') {
            toast('Please select course', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        if (year == '') {
            toast('Please select year', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        if (state == '') {
            toast('Please enter state', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        if (semester == '') {
            toast('Please select semester', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        if (college == '') {
            toast('Please enter college', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        if (file == null) {
            toast('Please select pdf', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        setLoader(true)
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('university', selectedUniversity);
        formData.append('college', college);
        formData.append('state', state);
        formData.append('city', city);
        formData.append('course', selectedCourse);
        formData.append('year', year);
        formData.append('semester', semester);
        formData.append('token', session.data.userData.token);
        try {

            const res = await axios.post('/api/pdfupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (res.data.CODE === 200) {
                setLoader(false)

                toast('Uploaded successfully', { hideProgressBar: false, autoClose: 2000, type: 'success' })
            } else {
                setLoader(false)

                toast('Something went wrong', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            }
        } catch (error) {
            setLoader(false)

            // setSubmitting(false);
            console.error('An error occurred while uploading the file:', error);
        }
    };



    return (
        <>

            <Modal
                open={props.uploadpreviousDialog}
            >
                <Box sx={style1}>
                    {/* <div className={styles.signUpMainDiv}> */}
            {loader ? <Loader /> : null}

                    <div className={styles.modelHeader}>
                        <h1>University Previous Year Papers</h1>
                        <Icon
                            size='big'
                            name='close'
                            className={styles.closebtn}
                            onClick={() => { props.setUploadpreviousDialog(false) }} />
                    </div>


                    <div className={styles.form}>
                        <div className={styles.leftForm}>
                            <div className={styles.formFields} >
                                <label htmlFor="university">University</label>
                                <select name="university" id="university" defaultValue='Select University' onChange={(e) => {
                                    setSelectedUniversity(e.target.value)
                                }}>
                                    <option value="">Select University</option>
                                    {university ? university.map((data) => {
                                        return (
                                            <option key={data.value} value={data.value}>{data.name}</option>
                                        )
                                    }) : null}
                                </select>

                            </div>
                            <div className={styles.formFields}>
                                <label htmlFor="Course">Course</label>
                                <select name="semester" id="semester" defaultValue='Select Course' onChange={(e) => {
                                    setSelectedCourse(e.target.value)
                                }}>
                                    <option value="0">Select Course</option>
                                    {course ? course.map((data) => {
                                        return (
                                            <option key={data.value} value={data.value}>{data.name}</option>
                                        )
                                    }) : null}

                                </select>

                            </div>

                            <div className={styles.formFields}>
                                <label htmlFor="college">College</label>
                                <input type="text" placeholder=" " value={college} onChange={(e) => {
                                    setCollege(e.target.value)
                                }} />
                            </div>

                            <div className={styles.formFields}>
                                <label htmlFor="Semester">Semester</label>
                                <select name="semester" id="semester" onChange={(e) => {
                                    setSemester(e.target.value)
                                }}>
                                    <option value="">Select Semester</option>
                                    <option value="1">Semester 1</option>
                                    <option value="2">Semester 2</option>
                                    <option value="3">Semester 3</option>
                                    <option value="4">Semester 4</option>
                                    <option value="5">Semester 5</option>
                                    <option value="6">Semester 6</option>
                                    <option value="7">Semester 7</option>
                                    <option value="8">Semester 8</option>
                                </select>
                            </div>



                        </div>
                        <div className={styles.rightForm}>
                            <div className={styles.formFields}>
                                <label htmlFor="Year" >Year</label>
                                <input type="date" placeholder=" " onChange={(e) => {
                                    setYear(e.target.value)
                                }} />
                            </div>

                            <div className={styles.formFields}>
                                <label htmlFor="State">State</label>
                                <input type="text" placeholder=" " value={state} onChange={(e) => {
                                    setState(e.target.value)
                                }} />
                            </div>


                            <div className={styles.formFields}>
                                <label htmlFor="PDF">PDF</label>
                                <input type="file" accept=".pdf" onChange={handleFileChange} />
                            </div>
                            <div className={styles.formFields}>
                                <button type='button' className={styles.button} onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>


                    </div>


                </Box>
            </Modal>
        </>
    );
}

export default Uploadpreviouspapers;


