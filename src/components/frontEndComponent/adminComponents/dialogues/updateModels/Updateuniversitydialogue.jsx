import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { apis } from '../../../../../../apis';
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
import styles from "../../../../../styles/uploadpdf.module.css";
import DoneIcon from '@mui/icons-material/Done';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { lighten, darken } from '@mui/system';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


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
  maxHeight:700,
  overflow:'auto',
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

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
  maxHeight: '200px'
});





export default function Updateuniversitydialogue(props) {


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

  useEffect(() => {
    if (props.data !== null) {
      setTitle(props.data.title)
      setUniversityCode(props.data.universitycode)
      setState(props.data.state)

      setCourse(props.data.course)
      setCity(props.data.city)
    }
  }, [props.data])

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

  const handleStateChange = (e, selected) => {
    setState(selected);
  };

  const handleCityChange = (e, selected) => {
    setCity(selected);
  };
  const handleCourseChange = (e, selected) => {
    setCourse(selected);

  };

  const handleSubmit = async () => {
    // Handle form submission here
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
    if (course.length <= 0) {
      toast('Please select year', { hideProgressBar: false, autoClose: 2000, type: 'error' })
      return 0;
    }
    const newCourse = course.map(data => data._id)
    const data = { ID: props.data._id, title, universitycode: universityCode, course: newCourse, state: state._id, city: city._id }
    console.log('ddd', data)

    try {

      const res = await axios.post(`${apis.baseUrl}${apis.updateUniversity}`, data, {
        headers: {
          'token': session.data ? session.data.userData.token : '',
        }
      })
      if (res.data.CODE === 200) {
        props.getAllUniversity()

        toast('Uploaded successfully', { hideProgressBar: false, autoClose: 2000, type: 'success' })
        handleClose()
      } else {
        setLoader(false)

        toast('Something went wrong', { hideProgressBar: false, autoClose: 2000, type: 'error' })
      }
    } catch (error) {
      // setSubmitting(false);
      console.error('An error occurred while uploading the file:', error);
    }
  };
  console.log('state', course)
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
            }} id="parent-modal-title">Update University</h2>
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



            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={courseOption}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              value={course}
              renderOption={(props, option, { selected }) => (
                <li key={option._id} {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 0 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              // style={{ maxHeight: '58px', overflowY: 'auto' }} // Set max height for the options
              onChange={handleCourseChange}
              renderInput={(params) => (
                <TextField {...params} label="Courses" placeholder="Courses" />
              )}
            />
          </WhiteBorderTextField>
          <WhiteBorderTextField fullWidth style={{ marginTop: '20px !important' }} className={styles.FormControl}>
            <Autocomplete
              id="grouped-demo"
              options={cityOption.sort((a, b) => -b.title.localeCompare(a.title))}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField  {...params} label="Select City" />}
              onChange={handleCityChange}
              value={city}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader >{params.group}</GroupHeader>
                  <GroupItems >{params.children}</GroupItems>
                </li>
              )}
            />
          </WhiteBorderTextField>
          <WhiteBorderTextField fullWidth style={{ marginTop: '20px !important' }} className={styles.FormControl}>
            <Autocomplete
              id="grouped-demo"
              options={stateOption.sort((a, b) => -b.title.localeCompare(a.title))}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField  {...params} label="Select State" />}
              onChange={handleStateChange}
              value={state}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
            />
          </WhiteBorderTextField>

          {/* <WhiteBorderTextField fullWidth style={{ marginTop: '20px !important' }} className={styles.FormControl}>
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
          </WhiteBorderTextField> */}
          <WhiteBorderTextField fullWidth className={styles.FormControlBtn}>
            <Button  style={{backgroundColor:'var(--primary)'}} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              {file ? 'Image Selected' : "Select University Logo"}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </WhiteBorderTextField>

        </Box>
      </Modal>
    </>
  );
}