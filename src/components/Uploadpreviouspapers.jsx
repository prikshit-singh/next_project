import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Box } from '@mui/material'
import { useSession } from "next-auth/react"
import styles from "../styles/uploadpdf.module.css";
import { toast } from 'react-toastify';
import Loader from "./Loader";
import { apis } from '../../apis';



import axios from 'axios';
import {
    Icon,
    Input
} from 'semantic-ui-react'

function Uploadpreviouspapers(props) {

    const [loader, setLoader] = useState(false)
    const [isDisabledCourse, setIsDisabledCourse] = useState(true);
    const [isDisabledSemester, setisDisabledSemester] = useState(true);
    const [isDisabledSubject, setisDisabledSubject] = useState(true);
    const [isDisabledYear, setisDisabledYear] = useState(true);
    const [file, setFile] = useState(null);


    const [university, setUniversity] = useState([]);
    const [course, setCourse] = useState([]);
    const [subject, setSubject] = useState([]);

    const [selectedUniversity, setSelectedUniversity] = useState('')
    const [selectedCourse, setSelectedCourse] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')

    const [semester, setSemester] = useState('Select Semester');
    const [college, setCollege] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const session = useSession()
    const years = [];
    const currentYear = new Date().getFullYear();

    // Create a list of years (adjust the range as needed)
    for (let year = currentYear; year >= currentYear - 50; year--) {
        years.push(year);
    }

    useEffect(() => {
        getQuestionPaperUploadDetails()
    }, [])

    const getQuestionPaperUploadDetails = async () => {
        const menus = await axios.get(`${apis.baseUrl}${apis.getquestionpaperdetails}`, {
            headers: {
                'token': session.data ? session.data.userData.token : '',
            }
        })
        if (menus.data && menus.data.CODE == 200) {
            setUniversity(menus.data.result)
        }
    }

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
        if (selectedCourse == 'Select Course') {
            toast('Please select course', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        if (semester == 'Select Semester') {
            toast('Please select semester', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }

        if (selectedSubject == 'Select Subject') {
            toast('Please enter subject', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        if (selectedYear == '') {
            toast('Please select year', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        if (file == null) {
            toast('Please select pdf', { hideProgressBar: false, autoClose: 2000, type: 'error' })
            return 0;
        }
        console.log(selectedUniversity, selectedCourse, selectedYear, semester, college, selectedSubject, file)

        setLoader(true)
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('university', selectedUniversity);
        formData.append('college', college);
        formData.append('course', selectedCourse);
        formData.append('year', selectedYear);
        formData.append('semester', semester);
        formData.append('token', session.data.userData.token);
        formData.append('subject', selectedSubject);
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
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };
    const handleUniversityChange = (e) => {
        if (e.target.value) {
            const dataValue = JSON.parse(e.target.value)
            setSelectedUniversity(dataValue.universitycode)
            setCourse(dataValue.course)
            setSelectedCourse('Select Course')
            setIsDisabledCourse(false)
            setisDisabledSemester(true)
            setisDisabledSubject(true)
            setSemester('Select Semester')
            setSelectedSubject('Select Subject')
            setSelectedYear('Select Year');
            setSelectedYear('Select Year');
            setisDisabledYear(true)
            setSubject([])

        } else {
            setSelectedCourse('Select Course')
            setSelectedUniversity('')
            setCourse([])
            setSubject([])
            setIsDisabledCourse(true)
            setisDisabledSemester(true)
            setisDisabledSubject(true)
            setSemester('Select Semester')
            setSelectedSubject('Select Subject')
            setSelectedYear('Select Year');
            setisDisabledYear(true)
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
                                <select name="university" id="university" defaultValue='Select University' onChange={handleUniversityChange}>
                                    <option value="">Select University</option>
                                    {university ? university.map((data) => {
                                        return (
                                            <option key={data._id} value={JSON.stringify(data)}>{data.title}</option>
                                        )
                                    }) : null}
                                </select>

                            </div>
                            <div className={styles.formFields}>
                                <label htmlFor="Course">Course</label>
                                <select name="semester" id="semester" defaultValue='Select Course' onChange={(e) => {
                                    if (e.target.value !== 'Select Course') {

                                        const dataValue = JSON.parse(e.target.value)
                                        setisDisabledSemester(false)
                                        setSelectedCourse(dataValue.coursecode)
                                        setSubject(dataValue.subject)
                                        setisDisabledSubject(false)
                                        setSelectedSubject('Select Subject')
                                        setSelectedYear('Select Year');
                                        setisDisabledYear(true)

                                    } else {
                                        setisDisabledSemester(true)
                                        setSelectedCourse(e.target.value)
                                        setSubject([])
                                        setisDisabledSubject(true)
                                        setSelectedSubject('Select Subject')
                                        setSelectedYear('Select Year');
                                        setisDisabledYear(true)
                                    }


                                }} disabled={isDisabledCourse}>
                                    <option value={selectedCourse}>Select Course</option>
                                    {course ? course.map((data) => {
                                        return (
                                            <option key={data._id} value={JSON.stringify(data)}>{data.title}</option>
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
                                    setSelectedSubject('Select Subject')
                                    setSelectedYear('Select Year');
                                    setisDisabledYear(true)
                                }} disabled={isDisabledSemester}>
                                    <option value={semester}>Select Semester</option>
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
                                <label htmlFor="Subject">Subject</label>
                                <select name="Subject" id="Subject" defaultValue='Select Subject' onChange={(e) => {
                                    if (e.target.value !== 'Select Subject') {
                                        const dataValue = JSON.parse(e.target.value)
                                        setSelectedSubject(dataValue.title)
                                        setSelectedYear('Select Year');
                                        setisDisabledYear(false)
                                    } else {
                                        setSelectedSubject(e.target.value)
                                        setSelectedYear('Select Year');
                                        setisDisabledYear(true)
                                    }


                                }} disabled={isDisabledSubject}>
                                    <option value="Select Subject">Select Subject</option>
                                    {subject ? subject.map((data) => {
                                        return (
                                            <option key={data._id} value={JSON.stringify(data)}>{data.title}</option>
                                        )
                                    }) : null}

                                </select>

                            </div>
                            <div className={styles.formFields}>
                                <label htmlFor="Year">Year</label>
                                <select
                                    name="year"
                                    id="year"
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                    disabled={isDisabledYear}
                                >
                                    <option value="">Select Year</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
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


