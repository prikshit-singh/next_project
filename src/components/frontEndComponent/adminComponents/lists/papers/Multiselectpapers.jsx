import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { apis } from '../../../../../../apis.js'
import axios from 'axios';
import { useSession } from "next-auth/react"
import styles from "../../../../../styles/admin/frontEndComponent/list/list.module.css"
import Componentloader from '../../../loader/Componentloader.js';
import { BiSolidEdit } from 'react-icons/bi';
import Updateuniversitydialogue from '../../dialogues/updateModels/Updateuniversitydialogue.jsx';


function Multiselectpapers(props) {
    const [open, setOpen] = useState(false)
    const [updataData, setUpdateData] = useState(null)
    const [university, setUniversity] = useState([])
    const [loader , setLoader] = useState(false)
    const session = useSession()
    useEffect(() => {
        if (session.data) {
            getAllUniversity()
        }
    }, [])

    const getAllUniversity = async () => {
        setLoader(true)
        const menus = await axios.get(`${apis.baseUrl}${apis.getAllPapers}`, {
            headers: {
                'token': session.data ? session.data.userData.token : '',
            }
        })
        if (menus.data && menus.data.CODE == 200) {
            setUniversity(menus.data.result)
            setLoader(false)
        }

    }

    const columnDefs =
        [
            // {
            //     field: 'Name',
            //     headerName: 'Edit',
            //     resizable: false,
            //     width: '60px',
            //     cellRenderer: (data) => {
            //         let name = data.data.title
            //         return <>
            //             <BiSolidEdit
            //                 onClick={() => {
            //                     setOpen(true)
            //                     setUpdateData(data.data)
            //                 }
            //                 }
            //                 style={{
            //                     color: 'var(--primary)',
            //                     fontSize: '15px',
            //                     cursor: 'pointer'
            //                 }}
            //             />
            //         </>
            //     },
            // },
            {
                field: 'subject.title',
                headerName: 'logo',

                resizable: false,

                width: "80px",
                cellRenderer: (data) => {
                    let name = data.data.university.universitylogo
                    return <>
                        <span ><img src={name}
                            style={{
                                height: "25px",
                                width: "25px",
                                borderRadius: "50%",
                            }}
                        /></span>

                    </>
                },
            },
            {
                field: 'university.title',
                headerName: 'University',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.university.title
                    return <>
                        <span className={styles.listSpan} > {name}</span>

                    </>
                },
            },

            {
                field: 'subject.title',
                headerName: 'Subject',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.subject.title
                    return <span className={styles.listSpan} >{name} </span>
                },
            },
            {
                field: 'year',
                headerName: 'Year',
                resizable: true,
                filter: true,
                width: "80px",
                cellRenderer: (data) => {
                    let name = data.data.year
                    return <span className={styles.listSpan} >{name} </span>
                },
            },
            {
                field: 'semester',
                headerName: 'Semester',
                resizable: true,
                filter: true,
                width: "110px",

                cellRenderer: (data) => {
                    let name = data.data.semester
                    return <span className={styles.listSpan} >{name} </span>
                },
            },
            {
                field: 'course.title',
                headerName: 'Course',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.course.title
                    return <>
                        <span className={styles.listSpan} > {name}</span>
                    </>
                },
            },
            // {
            //     field: 'isvarified',
            //     headerName: 'Status',
            //     resizable: true,
            //     filter: true,
            //     cellRenderer: (data) => {
            //         let name = data.data.isvarified
            //         if(name === 'false'){
            //             return <>
            //             <span style={{color:'red'}} className={styles.listSpan} >Pending</span>
            //         </>
            //         }else if(name === 'true'){
            //             return <>
            //             <span style={{color:'green'}} className={styles.listSpan} >Varified</span>
            //         </>
            //         }else if(name === 'rejected'){
            //             return <>
            //             <span style={{color:'red'}} className={styles.listSpan} > Rejected</span>
            //         </>
            //         }

                    
            //     },
            // },

            // {
            //     field: 'uploadby.email',
            //     headerName: 'Uploadby',

            //     resizable: true,
            //     filter: true,
            //     cellRenderer: (data) => {

            //         let creatorName = data.data.uploadby.email
            //         return <>
            //             <span className={styles.listSpan} > {creatorName}</span>

            //         </>
            //     },
            // },
            // {
            //     headerName: 'UploadbyImg',

            //     resizable: true,
            //     cellRenderer: (data) => {

            //         let name = data.data.uploadby.userImage
            //         return <>
            //             <span ><img src={name}
            //                 style={{
            //                     height: "25px",
            //                     width: "25px",
            //                     borderRadius: "50%",
            //                 }}
            //             /></span>


            //         </>
            //     },
            // },




        ];

    return (

        <>
            <Updateuniversitydialogue open={open} setOpen={setOpen} data={updataData} getAllUniversity={getAllUniversity} />
            {(university !== undefined && !loader && university) ?
                <div className="ag-theme-alpine" style={{ height: 520, width: '100%' }}>
                    <AgGridReact
                        rowData={university}
                        columnDefs={columnDefs}
                        rowSelection='multiple'
                        pagination={true}
                        paginationPageSize='10'
                        editType="fullRow"
                        animateRows={true}
                    >
                    </AgGridReact>
                </div>

                : <Componentloader />
            }
        </>
    );
}

export default Multiselectpapers;