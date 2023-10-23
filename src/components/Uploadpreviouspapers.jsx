import React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material'

import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useSession } from "next-auth/react"
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

import DoneIcon from '@mui/icons-material/Done';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "../styles/uploadpdf.module.css";
import { toast } from 'react-toastify';
import Loader from "./Loader";
import { apis } from '../../apis';
import PermLoader from '../components/frontEndComponent/loader/PermLoader'


import {
    Icon,
    Input
} from 'semantic-ui-react'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,

});
const style = {
    // display:'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    '@media (max-width: 600px)': {
        top: '50%',
        left: '50%',
        width: '100%',
      },
};


const WhiteBorderTextField = styled(FormControl)`
    & label.Mui-focused {
      color: var(--primary);
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: var(--primary);
      }
    }
  `;

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
                
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={()=>{props.setUploadpreviousDialog(false)}}
            >
                <Box sx={style}>
                    {/* <div className={styles.signUpMainDiv}> */}
                    {loader ? <PermLoader /> : null}


                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', }}>
                        <h2 style={{
                            color: 'var(--primary)',
                        }} id="parent-modal-title">University Previous Year Papers</h2>
                        <DoneIcon
                            onClick={handleSubmit}
                            style={{
                                border: ' 2px solid var(--primary)',
                                borderRadius: '50%',
                                fontSize: '20px',
                                fontSize: '31px',
                                fontWeight: 'bolder',
                                color: 'var(--primary)',
                                cursor: 'pointer'
                            }}

                        />
                    </div>




                    <div className={styles.form}>
                        <div className={styles.leftForm}>
                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                <InputLabel id="demo-simple-select-label">University</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="University"
                                    defaultValue='Select University'
                                    onChange={handleUniversityChange}
                                >
                                    {university.map((data) => (
                                        <MenuItem key={data._id} value={JSON.stringify(data)}>
                                            {data.title}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </WhiteBorderTextField>
                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                <InputLabel id="demo-simple-select-label">Course</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name="semester"
                                    id="semester"
                                    defaultValue='Select Course'
                                    label="Course"
                                    onChange={(e) => {
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


                                    }} disabled={isDisabledCourse}
                                >
                                    {course ? course.map((data) => (
                                        <MenuItem key={data._id} value={JSON.stringify(data)}>
                                            {data.title}
                                        </MenuItem>
                                    )) : <PermLoader />}

                                </Select>
                            </WhiteBorderTextField>
                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                <TextField type="text"
                                    id="College"
                                    name="College"
                                    value={college} onChange={(e) => {
                                        setCollege(e.target.value)
                                    }}
                                    label="College"
                                    variant="outlined"

                                />
                            </WhiteBorderTextField>


                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    name="semester"
                                    id="semester"
                                    defaultValue='Select Course'
                                    label="Semester"
                                    onChange={(e) => {
                                        setSemester(e.target.value)
                                        setSelectedSubject('Select Subject')
                                        setSelectedYear('Select Year');
                                        setisDisabledYear(true)
                                    }} disabled={isDisabledCourse}
                                >

                                    <MenuItem value={semester}>Select Semester</MenuItem>
                                    <MenuItem value="1">Semester 1</MenuItem>
                                    <MenuItem value="2">Semester 2</MenuItem>
                                    <MenuItem value="3">Semester 3</MenuItem>
                                    <MenuItem value="4">Semester 4</MenuItem>
                                    <MenuItem value="5">Semester 5</MenuItem>
                                    <MenuItem value="6">Semester 6</MenuItem>
                                    <MenuItem value="7">Semester 7</MenuItem>
                                    <MenuItem value="8">Semester 8</MenuItem>
                                </Select>
                            </WhiteBorderTextField>




                        </div>


                        <div className={styles.rightForm}>



                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                                <Select
                                    name="Subject" id="Subject" defaultValue='Select Subject' label='Subject' onChange={(e) => {
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


                                    }} disabled={isDisabledSubject} >
                                    {subject ? subject.map((data) => (
                                        <MenuItem key={data._id} value={JSON.stringify(data)}>
                                            {data.title}
                                        </MenuItem>
                                    )) : <PermLoader />}

                                </Select>
                            </WhiteBorderTextField>

                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                <Select
                                    name="year"
                                    id="year"
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                    disabled={isDisabledYear} label='Year'
                                    defaultValue='Select Year'

                                >
                                    {years ? years.map((data) => (
                                        <MenuItem key={data} value={data}>
                                            {data}
                                        </MenuItem>
                                    )) : <PermLoader />}

                                </Select>
                            </WhiteBorderTextField>
                            <WhiteBorderTextField fullWidth >
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                    {file ? 'PDF Selected' : "Select PDF"}
                                    <VisuallyHiddenInput type="file" accept=".pdf" onChange={handleFileChange} />
                                </Button>
                            </WhiteBorderTextField>

                        </div>


                    </div>


                </Box>
            </Modal>
        </>
    );
}

export default Uploadpreviouspapers;


