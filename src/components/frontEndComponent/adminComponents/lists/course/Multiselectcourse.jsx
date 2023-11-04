import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { apis } from '../../../../../../apis.js'
import axios from 'axios';
import { useSession } from "next-auth/react"
import styles from './style.module.css'
import Updatecoursedialogue from '../../dialogues/updateModels/Updatecoursedialogue.jsx';
import Componentloader from '../../../loader/Componentloader.js';
import { BiSolidEdit } from 'react-icons/bi';




function Multiselectcourse(props) {
    const [open, setOpen] = useState(false)
    const [updataData, setUpdateData] = useState(null)
    const [university, setUniversity] = useState([])
    const session = useSession()
    useEffect(() => {
        if (session.data) {
            getAllCourse()
        }
    }, [])

    const getAllCourse = async () => {
        const menus = await axios.get(`${apis.baseUrl}${apis.getAllCourse}`, {
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
                field: 'Name',
                headerName: 'Name',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.title
                    return <>
                        <p > {name}</p>
                    </>
                },
            },
            
            {
                field: 'Statecode',
                headerName: 'Statecode',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.coursecode
                    return <>
                        <p > {name}</p>

                    </>
                },
            },
            

            {
                field: 'Duration',
                headerName: 'Duration',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.duration
                    return <>
                        <p > {name}</p>

                    </>
                },
            },
            {
                field: 'CreatedBy',
                headerName: 'createdBy',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.createdby.email 
                    return <>
                        <p > {name}</p>

                    </>
                },
            },


        ];



    return (

        <>
<Updatecoursedialogue open={open} setOpen={setOpen} data={updataData} afterUpdate={getAllCourse}/>
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

export default Multiselectcourse;