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






export default function Createuniversitydialogue(props) {


  const handleClose = () => props.setOpen(false);
  const [stateOption, setStateOption] = useState([]);
  const [cityOption, setCityOption] = useState([]);
  const [courseOption, setCourseOption] = useState([]);

  const [title, setTitle] = useState('');
  const [universityCode, setUniversityCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [course, setCourse] = useState([]);

  const [file, setFile] = useState(null);


  const session = useSession()

  useEffect(() => {
    getUniversityCreateDetails()
  }, [])


  const getUniversityCreateDetails = async () => {
    const menus = await axios.get(`${apis.baseUrl}${apis.getUniversityCreateDetails}`, {
      headers: {
        'token': session.data ? session.data.userData.token : '',
      }
    })
    if (menus.data.CODE === 200) {
      setStateOption(menus.data.result.StateData)
      setCityOption(menus.data.result.CityData)
      setCourseOption(menus.data.result.CourseData)
    }

  }

  // Handle input field changes
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
};


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUniversityCodeChange = (e) => {
    setUniversityCode(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleCourseChange = (e) => {
    setCourse(e.target.value);

  };

 const handleSubmit = async () => {
    // Handle form submission here
    console.log(title, universityCode, state, city, course, file)
    if (title == '') {
        toast('Please Enter Title', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        return 0;
    }
    if (universityCode == '') {
        toast('Please select course', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        return 0;
    }
    if (state == '') {
        toast('Please enter subject', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        return 0;
    }
    if (city == '') {
        toast('Please select year', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        return 0;
    }
    if (course == '') {
      toast('Please select year', { hideProgressBar: false, autoClose: 2000, type: 'error' })
      return 0;
  }
    if (file == null) {
        toast('Select University Logo', { hideProgressBar: false, autoClose: 2000, type: 'error' })
        return 0;
    }
    console.log(title, universityCode, state, city, course, file)

    const formData = new FormData();
    formData.append('title', title);
    formData.append('universitycode', universityCode);
    formData.append('course', course);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('universitylogo', file);

    formData.append('token', session.data.userData.token);
    try {

        const res = await axios.post(`${apis.baseUrl}${apis.createUniversity}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        if (res.data.CODE === 200) {
            toast('Uploaded successfully', { hideProgressBar: false, autoClose: 2000, type: 'success' })
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
            }} id="parent-modal-title">Create University</h2>
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
              id="universitycode"
              name="universitycode"
              value={universityCode}
              onChange={handleUniversityCodeChange}
              label="University Code"
              variant="outlined"

            />
          </WhiteBorderTextField>



          <WhiteBorderTextField fullWidth className={styles.FormControl}>
            <InputLabel id="demo-multiple-checkbox-label">Course</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={course}
              onChange={handleCourseChange}
              input={<OutlinedInput label="Course" />}
              renderValue={(selected) =>
                selected
                  .map((id) =>
                    courseOption.find((course) => course._id === id).title
                  )
                  .join(', ')
              }
            >
              {courseOption.map((data) => (
                <MenuItem key={data._id} value={data._id}>
                  <Checkbox checked={course.indexOf(data._id) > -1} />
                  <ListItemText primary={data.title} />
                </MenuItem>
              ))}
            </Select>
          </WhiteBorderTextField>


          <WhiteBorderTextField fullWidth style={{marginTop:'20px !important'}} className={styles.FormControl}>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="City"
              value={city}
              onChange={handleCityChange}
            >
              {cityOption.map((data) => (
                <MenuItem key={data._id} value={data._id}>
                  {data.title}
                </MenuItem>
              ))}

            </Select>
          </WhiteBorderTextField>





          <WhiteBorderTextField fullWidth className={styles.FormControl}>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="State"
              value={state}
              onChange={handleStateChange}
            >
              {stateOption.map((data) => (
                <MenuItem key={data._id} value={data._id}>
                  {data.title}
                </MenuItem>
              ))}

            </Select>
          </WhiteBorderTextField>
          <WhiteBorderTextField fullWidth >
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            {file?'Image Selected':"Select University Logo"}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </WhiteBorderTextField>

        </Box>
      </Modal>
    </>
  );
}