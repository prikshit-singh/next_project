import React from 'react';
import { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";


import { Button, Icon, Label, Header, Segment, Item } from 'semantic-ui-react'
import axios from "axios";
import { apis } from '../../../../apis';
import { toast } from 'react-toastify';
import { Modal, Box } from '@mui/material'
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';


import { useSession } from "next-auth/react"
import Layout from '../../../layouts/Layout'
import Link from 'next/link';


export const getServerSideProps = async (context) => {
  try {
    const { slug } = context.params
    const ID = await slug.split('-').reverse()[0]
    const UniversityID = await slug.split('-').reverse()[1]

    
    const res = await axios.get(`${apis.baseUrl}/${apis.getCourseWithId}`, {
      headers: {
        'id': ID,
        'uid':UniversityID
      }
    })
    if (res.data.CODE === 200) {
      return {
        props: {
          res: res.data.result,
        }
      };
    } else {
      return {
        props: { res: false }
      };
    }

  } catch (error) {
    console.log(error)
    return {
      props: { res: false }
    };
  }

}

function Page(props) {
  const [leftSideDivLinks, setLeftSideDivLinks] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [universityDetails, setUniversityDetails] = useState(props.res.university[0])
  const [courseDetails, setCourseDetails] = useState(props.res.course[0])

  const router = useRouter();

  const dispatch = useDispatch()
  const session = useSession()

  

  return (
    <>

      <Layout>
        <Box sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          paddingBottom: '20px'
        }}>

          <Box sx={{
            mr: 1,
            display: { xs: 'none', sm: 'none', md: 'flex' },
            position: 'fixed',
            // height:'100%',
            flexDirection: 'column',
            width: '20%',
            fontFamily: 'var(--font-regular)',
            fontWeight: 700,
            color: 'var(--primary)',
            fontSize: { sm: '14px', md: '18px' },
            // border: '1px solid var(--borderColor)',
            textDecoration: 'none',
          }}>
            <Typography
              sx={{
                border: '1px solid var(--borderColor)',
                textDecoration: 'none',
                // height: '40px',
                paddingTop: '10px',
                paddingBottom: '10px',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontFamily: 'var(--font-regular)',
                fontWeight: 700,
              }}
            >
              More Universities
            </Typography>
            {leftSideDivLinks.map((data,index) => {
              return <Typography
              key={index}
                sx={{
                  border: '1px solid var(--borderColor)',
                  textDecoration: 'none',
                  height: '30px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                <Link style={{
                  marginLeft: 10,
                  textOverflow: 'ellipsis',
                  fontFamily: 'var(--font-regular)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  width: '100%',
                  cursor: 'pointer',
                  color: 'var(--primary)',
                  fontSize: { sm: '14px', md: '14px' },
                }} href='' key={data}>kurukshetra university kurukshetra university link {data}</Link>
              </Typography>
            })}

          </Box>



          <Box sx={{
            display: 'flex',
            width: { xs: '100%', sm: '100%', md: '55%' },
            marginLeft: { xs: '0', sm: '0', md: '20%' },
            paddingLeft: '20px',
            paddingRight: '20px',
            flexDirection: 'column',
            borderLeft: '1px solid var(--borderColor)',
            borderRight: '1px solid var(--borderColor)',

          }}>
            <Box style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column'
            }}>
              <Typography
                sx={{
                  //  backgroundColor:'var(--borderColor)',
                  // border: '1px solid var(--borderColor)',
                  textDecoration: 'none',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontFamily: 'var(--font-regular)',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  fontSize: { sm: '18px', md: '22px' },
                  textDecoration: 'none',
                }}
              >
                PREVIOUS YEAR QUESTION PAPERS FOR 
                {' '+universityDetails.title.toUpperCase()}
              </Typography>
              <Typography
                sx={{
                  textDecoration: 'none',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontFamily: 'var(--font-regular)',
                  fontWeight: 700,
                  color: 'black',
                  fontSize: { sm: '14px', md: '18px' },
                  textDecoration: 'none',
                }}
              >
                Previous year question paper with solutions for B-
                TECH, BBA,
                BCA, BCOM, BSC-IT, M-TECH, MBA, MCA, PGDCA,
                MSC-IT, MCOM, MSC-JAMC, BSIM, BRDM, BSC-AGRI,
                BAMT, BHMCT, BTTM, BSC-MLS, BVOC-WTM
              </Typography>
            </Box>


            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '20px',
              justifyContent: 'center',
              width: '100%',
              flexDirection: { xs: 'column', sm: 'row', md: 'row' }
            }}>
              <img style={{
                height: '200px',
                width: '200px',

              }} src={universityDetails.universitylogo} alt=
                {universityDetails.title.toUpperCase()} />
              <Typography
                sx={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-regular)',
                  fontWeight: 400,
                  paddingLeft: '10px',
                  color: 'gray',
                  fontSize: { sm: '18px', md: '18px' },
                  textDecoration: 'none',
                }}
              >
                Our website provides solved previous year question paper for B-TECH, BBA, BCA, BCOM,
                BSC-IT, M-TECH, MBA, MCA,
                PGDCA, MSC-IT, MCOM, MSC-JAMC, BSIM, BRDM, BSC-AGRI, BAMT, BHMCT, BTTM, BSC-MLS, BVOC-
                WTM. Doing preparation from the previous year question paper helps you to get good marks
                in exams. From our PTU question paper bank, students can download solved previous year
                question paper. The solutions to these previous year question paper are very easy to
                understand.
              </Typography>
            </Box>


            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '40px',
              width: '100%',

            }}>
              {courseDetails && courseDetails.subject.length > 0 ? courseDetails.subject.map((data,index) => {
                return (
                  <Typography
                  key={data._id}
                    onClick={()=>{
                      // console.log(`university/course/${universityDetails.title.split(' ').join('-')}-${courseDetails.title.split(' ').join('-')}-${data.title.split(' ').join('-')}-${universityDetails._id}-${courseDetails._id}-${data._id}`)

                        router.push(`subject/${universityDetails.title.split(' ').join('-')}-${courseDetails.title.split(' ').join('-')}-${data.title.split(' ').join('-')}-${universityDetails._id}-${courseDetails._id}-${data._id}`);
                    }}
                    sx={{
                      border: '1px solid var(--borderColor)',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '1px 1px 5px gray',
                      fontFamily: 'var(--font-regular)',
                      fontWeight: 700,
                      marginTop: "20px",
                      color: 'var(--primary)',
                      fontSize: { sm: '14px', md: '18px' },
                      paddingLeft: '20px',
                      height: 60,
                      lineHeight: '60px',
                    }}
                  >

                    {data.title.toUpperCase()}
                  </Typography>
                )
              })
                : null}

            </Box>

          </Box>







          <Box sx={{
            mr: 1,
            display: { xs: 'none', sm: 'none', md: 'flex' },
            position: 'fixed',
            // height:'100%',
            flexDirection: 'column',
            width: '25%',
            right:-8,
            fontFamily: 'var(--font-regular)',
            fontWeight: 700,
            color: 'var(--primary)',
            fontSize: { sm: '14px', md: '18px' },
            // border: '1px solid var(--borderColor)',
            textDecoration: 'none',
          }}>
            <Typography
              sx={{
                border: '1px solid var(--borderColor)',
                textDecoration: 'none',
                // height: '40px',
                
                paddingTop: '10px',
                paddingBottom: '10px',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontFamily: 'var(--font-regular)',
                fontWeight: 700,
              }}
            >
              More Universities
            </Typography>
            {leftSideDivLinks.map((data,index) => {
              return <Typography
              key={index}
                sx={{
                  border: '1px solid var(--borderColor)',
                  textDecoration: 'none',
                  height: '30px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                <Link style={{
                  marginLeft: 10,
                  textOverflow: 'ellipsis',
                  fontFamily: 'var(--font-regular)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  width: '100%',
                  cursor: 'pointer',
                  color: 'var(--primary)',
                  fontSize: { sm: '14px', md: '14px' },
                }} href='' key={data}>kurukshetra university kurukshetra university link {data}</Link>
              </Typography>
            })}

          </Box>
        </Box>
      </Layout>
    </>
  );
}



// Page.Layout = Layout;
export default Page
