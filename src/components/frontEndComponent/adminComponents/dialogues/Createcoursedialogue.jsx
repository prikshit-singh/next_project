import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { apis } from '../../../../../apis';
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
import styles from "../../../../styles/uploadpdf.module.css";
import DoneIcon from '@mui/icons-material/Done';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
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






export default function Createcoursedialogue(props) {


  const handleClose = () => props.setOpen(false);
 

  const [title, setTitle] = useState('');
  const [coursecode, setCourseCode] = useState('');
  const [duration, setDuration] = useState('');
  const [allDuration, setAllDuration] = useState([1,2,3,4]);
  const [subject, setSubject] = useState([]);
  const [Allsubject, setAllSubject] = useState([]);




  const session = useSession()

  useEffect(() => {
    getAllSubjectCreateDetails()
  }, [])


  const getAllSubjectCreateDetails = async () => {
    const subjects = await axios.get(`${apis.baseUrl}${apis.getAllSubject}`, {
      headers: {
        'token': session.data ? session.data.userData.token : '',
      }
    })
    if (subjects.data && subjects.data.CODE == 200) {
      setAllSubject(subjects.data.result)
  }

  }

  // Handle input field changes
  


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCourseCodeCodeChange = (e) => {
    setCourseCode(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handlesubjectChange = (e) => {
    setSubject(e.target.value);

  };

 const handleSubmit = async () => {
    // Handle form submission here
    if (title == '') {
        toast('Please Enter Title', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        return 0;
    }
    if (coursecode == '') {
        toast('Please select courseCode', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        return 0;
    }
    if (duration == '') {
        toast('Please enter duration', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        return 0;
    }
    if (subject == '') {
        toast('Please select subject', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        return 0;
    }
    
    const data = {title,coursecode,subject,duration}
    
    try {

        const res = await axios.post(`${apis.baseUrl}${apis.createCourse}`, data, {
          headers: {
            'token': session.data ? session.data.userData.token : '',
        }
        })
        if (res.data.CODE === 200) {
            toast('Course created successfully', { hideProgressBar: false, autoClose: 2000, type: 'success' })
        } else {
            setLoader(false)

            toast('Something went wrong', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        }
    } catch (error) {
        // setSubmitting(false);
        console.error('An error occurred while uploading the file:', error);
    }
};

  return (
    <>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', }}>
            <h2 style={{
              color: 'var(--primary)',
            }} id="parent-modal-title">Create Course</h2>
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
          

          <WhiteBorderTextField fullWidth >
            <TextField type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              label="Title"
              variant="outlined"

            />
          </WhiteBorderTextField>

          <WhiteBorderTextField fullWidth className={styles.FormControl}>
            <TextField type="text"
              id="coursecode"
              name="coursecode"
              value={coursecode}
              onChange={handleCourseCodeCodeChange}
              label="Course Code"
              variant="outlined"

            />
          </WhiteBorderTextField>



          <WhiteBorderTextField fullWidth className={styles.FormControl}>
            <InputLabel id="demo-multiple-checkbox-label">Subjects</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={subject}
              onChange={handlesubjectChange}
              input={<OutlinedInput label="subject" />}
              renderValue={(selected) =>
                selected
                  .map((id) =>
                  Allsubject.find((subject) => subject._id === id).title
                  )
                  .join(', ')
              }
            >
              {Allsubject.map((data) => (
                <MenuItem key={data._id} value={data._id}>
                  <Checkbox checked={subject.indexOf(data._id) > -1} />
                  <ListItemText primary={data.title} />
                </MenuItem>
              ))}
            </Select>
          </WhiteBorderTextField>



          <WhiteBorderTextField fullWidth className={styles.FormControl}>
            <InputLabel id="demo-simple-select-label">Duration</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Duration"
              value={duration}
              onChange={handleDurationChange}
            >
              {allDuration.map((data) => (
                <MenuItem key={data} value={data}>
                  {data}years
                </MenuItem>
              ))}

            </Select>
          </WhiteBorderTextField>
          

        </Box>
      </Modal>
    </>
  );
}