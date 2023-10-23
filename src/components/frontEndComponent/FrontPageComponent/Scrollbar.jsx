'use client'
import styles from '../../../styles/FrontPageStyle/Scrollbar.module.css'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { IconContext } from "react-icons";
import { Typography } from '@mui/material';
export default function Scrollbar(props) {
  return (
    <>
      <div className={styles.headersub}>
        <Typography sx={{
          mr: 10,
          // display: { md: 'flex', },
          color: 'var(--primary)',
          fontFamily: 'var(--font-bold)',
          fontWeight: {sm:100,md:700},
          fontSize: {sm:'20px',md:'25px'},
          marginLeft:'20px',
          letterSpacing: '.1rem',
          textDecoration: 'none',
        }}>
          University

        </Typography>
      </div>
      <div className={styles.main} id="scrollNavBar">
        <div className={styles.topsection}>
          <IconContext.Provider value={{ color: "white", className: styles.previcon }}>
            <GrPrevious className={styles.previcon} onClick={() => {
              document.getElementById('scrollNavBar').scrollLeft -= 400;
            }} />
          </IconContext.Provider>
          {props.university ? props.university.map((data,index) => {
            return (
              <div key={index} className={styles.topsectioninner}>
                {/* <div className={styles.imagesection}> */}
               
                  <img className={styles.imagesection} src={data.universitylogo} alt={data.title.toUpperCase()} />
                  
                {/* </div> */}
                <Typography sx={{
                  mr: 1,
                  display: { md: 'flex' },
                  fontFamily: 'var(--font-regular)',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  fontSize: {sm:'14px',md:'18px'},
                  textDecoration: 'none',
                }}>
                  {data.title.toUpperCase()}
                  ({data.universitycode.toUpperCase()})
                </Typography>
                <Typography sx={{
                  mr: 1,
                  display: { md: 'flex' },
                  fontFamily: 'var(--font-regular)',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  fontSize: '15px',
                  textDecoration: 'none',
                }}>
                  {data.city.title.toUpperCase()}
                  ({data.state.title.toUpperCase()})
                 
                </Typography>
              </div>
            )
          }) : null}



          <IconContext.Provider value={{ color: "white !important", className: styles.slidernextico }}>
            <GrNext className={styles.slidernextico} onClick={() => {
              document.getElementById('scrollNavBar').scrollLeft += 400;
            }} />
          </IconContext.Provider>
        </div>

      </div>
    </>
  )
}
