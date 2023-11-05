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


function MultiSelectUniversity(props) {
    const [open, setOpen] = useState(false)
    const [updataData, setUpdateData] = useState(null)
    const [university, setUniversity] = useState([])

    const session = useSession()
    useEffect(() => {
        if (session.data) {
            getAllUniversity()
        }
    }, [])

    const getAllUniversity = async () => {
        const menus = await axios.get(`${apis.baseUrl}${apis.getAllUniversity}`, {
            headers: {
                'token': session.data ? session.data.userData.token : '',
            }
        })
        if (menus.data && menus.data.CODE == 200) {
            setUniversity(menus.data.result)
        }

    }

    const columnDefs =
        [
            {
                field: 'Name',
                headerName: 'Edit',
                resizable: false,
                width: '60px',
                cellRenderer: (data) => {
                    let name = data.data.title
                    return <>
                        <BiSolidEdit
                            onClick={() => {
                                setOpen(true)
                                setUpdateData(data.data)
                            }
                            }
                            style={{
                                color: 'var(--primary)',
                                fontSize: '15px',
                                cursor: 'pointer'
                            }}
                        />
                    </>
                },
            },
            {
                field: 'state.title',
                headerName: 'logo',

                resizable: false,
                
                width:"80px",
                cellRenderer: (data) => {
                    let name = data.data.universitylogo
                    return <>
                        <span ><img src= {name} 
                            style={{
                                height:"25px",
                                width:"25px",
                                borderRadius:"50%",
                            }}
                        /></span>

                    </>
                },
            },

            {
                field: 'title',
                headerName: 'Title',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.title
                    return <span className={styles.listSpan} >{name} </span>
                },
            },
            {
                field: 'city.title',
                headerName: 'City',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.city.title.toUpperCase()
                    return <>
                        <span className={styles.listSpan} > {name}</span>
                    </>
                },
            },
          
            {
                field: 'state.title',
                headerName: 'State',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.state.title.toUpperCase()
                    return <>
                        <span className={styles.listSpan} > {name}</span>

                    </>
                },
            },
            {
                field: 'course.length',
                headerName: 'Courses',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    
                    let name = data.data.course.length
                    return <>
                        <span> {name}</span>

                    </>
                },
            },
            {
                field: 'createdby.name',
                headerName: 'Createdby',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    
                    let creatorName = data.data.createdby.name
                    return <>
                        <span className={styles.listSpan} > { creatorName}</span>

                    </>
                },
            },
      {
                field: 'createdby.name',
                headerName: 'CreatedbyImg',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    
                    let name = data.data.createdby.userImage
                    return <>
                         <span ><img src= {name} 
                            style={{
                                height:"25px",
                                width:"25px",
                                borderRadius:"50%",
                            }}
                        /></span>


                    </>
                },
            },




        ];


console.log(123,university)
    return (

        <>
            <Updateuniversitydialogue open={open} setOpen={setOpen} data={updataData} getAllUniversity={getAllUniversity} />
            {(university !== undefined && university.length > 0) ?
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

export default MultiSelectUniversity;