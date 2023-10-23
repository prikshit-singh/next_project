'use client'
import React from 'react'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import styles from '../styles/contact.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
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


const WhiteBorderTextField = styled(FormControl)`& label.Mui-focused {
    color: var(--primary);
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color:var(--primary);
    }
  }`


export default function Contact() {
    return (
        <div className={styles.marginTop}>
            <div  className='col-lg-12 contact-wrap-backg'>
                <div className='row m-auto'>
                    <div className='col-lg-4 address-section-left'>
                        <div className={styles.leftsecmui}>
                            <div className='address-section-left-inner'>
                            <img className={styles.contactLogo} src='/gitgurusLogo.jpg' alt='gitgurusLogo' />
                                <h3>Address</h3>
                                <h4>Company Address</h4>
                                <p> Shanti Nagar, Kurukshetra</p>
                                <p>Haryana 136119</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8 contact-form-section-right'>
                        <div className={styles.contacformmui}>
                            <div className="contact-form-wrapper">
                                <div className={styles.contactformhead} >
                                    <h4 className="title">Contact Us</h4>

                                </div>
                                <div className='row'>
                                    <div className='col-md-6 mb-4'>
                                        <div className="form-inner">

                                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                                <TextField type="text"
                                                    id="universitycode"
                                                    name="First Name"
                                                    label="First Name"
                                                    variant="outlined"

                                                />
                                            </WhiteBorderTextField>


                                        </div>
                                    </div>
                                    <div className='col-md-6 mb-4'>
                                        <div className="form-inner">

                                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                                <TextField type="text"
                                                    id="universitycode"
                                                    name="universitycode"
                                                    label="Last Name"
                                                    variant="outlined"

                                                />
                                            </WhiteBorderTextField>

                                        </div>

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 mb-4'>
                                        <div className="form-inner">

                                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                                <TextField type="text"
                                                    id="universitycode"
                                                    name="universitycode"
                                                    label="Email Address"
                                                    variant="outlined"

                                                />
                                            </WhiteBorderTextField>

                                        </div>
                                    </div>
                                    <div className='col-md-6 mb-4'>
                                        <div className="form-inner">

                                            <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                                <TextField type="text"
                                                    id="universitycode"
                                                    name="universitycode"
                                                    label="Phone"
                                                    variant="outlined"

                                                />
                                            </WhiteBorderTextField>

                                        </div>
                                    </div>
                                </div>
                                <div className="form-inner">
                                    <WhiteBorderTextField fullWidth className={styles.FormControl}>
                                        <TextField type="text"
                                            id="universitycode"
                                            name="universitycode"
                                            label="Institute "
                                            variant="outlined"

                                        />
                                    </WhiteBorderTextField>
                                </div>
                                <div className='sbmt-btn-err'>
                                    <div className={styles.submitbuttonwrapper}>
                                        <button id="sendData"> Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}