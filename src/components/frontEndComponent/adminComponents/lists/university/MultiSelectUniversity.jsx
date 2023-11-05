import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { apis } from '../../../../../../apis.js'
import axios from 'axios';
import { useSession } from "next-auth/react"
import styles from './style.module.css'
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
                field: 'title',
                headerName: 'Title',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.title.toUpperCase()
                    return <span style={{fontFamily:'var(--font-regular)'}}> {name} </span>
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
                        <span style={{fontFamily:'var(--font-regular)'}}> {name}</span>
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
                        <span style={{fontFamily:'var(--font-regular)'}}> {name}</span>
                    </>
                },
            },


        ];


console.table(university)
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