import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { apis } from '../../../../../../apis.js'
import axios from 'axios';
import { useSession } from "next-auth/react"
import Componentloader from '../../../loader/Componentloader.js';
import Updatecitydialogue from '../../dialogues/updateModels/Updatecitydialogue.jsx';
import { BiSolidEdit } from 'react-icons/bi';
import styles from '../../../../../styles/admin/frontEndComponent/list/list.module.css'





function Multiselectcity(props) {

    const [university, setUniversity] = useState([])
    const [open, setOpen] = useState(false)
    const [updataData, setUpdateData] = useState(null)
    const session = useSession()
    useEffect(() => {
        if (session.data) {
            getAllCity()
        }
    }, [])

    const getAllCity = async () => {
        const menus = await axios.get(`${apis.baseUrl}${apis.getAllCity}`, {
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
                headerName: 'Name',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.title
                    return <>
                        <span  className={styles.listSpan}> {name}</span>
                    </>
                },
            },
            {
                field: 'state.title',
                headerName: 'state',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.state.title
                    return <>
                        <span   className={styles.listSpan}> {name}</span>
                    </>
                },
            },
            {
                field: 'state.statecode',
                headerName: 'Statecode',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.state.statecode
                    return <>
                        <span  className={styles.listSpan}> {name}</span>

                    </>
                },
            },
            // {
            //     field: 'createdby.name',
            //     headerName: 'CreatedByName',
            //     filter: 'agTextColumnFilter',
            //     resizable: true,
            //     filter: true,
            //     cellRenderer: (data) => {
            //         let name = data.data.createdby.name
            //         return <>
            //             <span  className={styles.listSpan} > {name}</span>

            //         </>
            //     },
            // },
            // {
            //     field: 'createdby.email',
            //     headerName: 'createdByEmail',

            //     resizable: true,
            //     filter: true,
            //     cellRenderer: (data) => {
            //         let name = data.data.createdby.email 
            //         return <>
            //             <span  className={styles.listSpan}> {name}</span>

            //         </>
            //     },
            // },
            // {
            //     field: 'createdby.name',
            //     headerName: 'CreatedbyImg',

            //     resizable: true,
            //     filter: true,
            //     cellRenderer: (data) => {
                    
            //         let name = data.data.createdby.userImage
            //         return <>
            //              <span ><img src= {name} 
            //                 style={{
            //                     height:"25px",
            //                     width:"25px",
            //                     borderRadius:"50%",
            //                 }}
            //             /></span>


            //         </>
            //     },
            // },


        ];

       console.log(321,university)

    return (

        <>
            <Updatecitydialogue open={open} setOpen={setOpen} data={updataData} afterUpdate={getAllCity}/>
            {(university !== undefined && university.length > 0) ?
                <div className="ag-theme-alpine" style={{ height: 530, width: '100%' }}>
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

export default Multiselectcity;