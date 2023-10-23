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


const style = {
  // display:'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600',
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






export default function Createcitydialogue(props) {


  const handleClose = () => props.setOpen(false);
  const [stateOption, setStateOption] = useState([]);


  const [title, setTitle] = useState('');

  const [state, setState] = useState('');



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
    }

  }


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };



  const handleSubmit = async () => {
    // Handle form submission here
    if (title == '') {
      toast('Please Enter Title', { hideProgressBar: false, autoClose: 2000, type: 'error' })
      return 0;
    }
    if (state == '') {
      toast('Please enter State', { hideProgressBar: false, autoClose: 2000, type: 'error' })
      return 0;
    }


    const data = { title, state }

    try {

      const res = await axios.post(`${apis.baseUrl}${apis.createCity}`, data, {
        headers: {
          'token': session.data ? session.data.userData.token : '',
        }
      })
      if (res.data.CODE === 200) {
        toast('City created successfully', { hideProgressBar: false, autoClose: 2000, type: 'success' })
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
            }} id="parent-modal-title">Create City</h2>
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

        </Box>
      </Modal>
    </>
  );
}