import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { apis } from '../../../../../../apis.js'
import axios from 'axios';
import { useSession } from "next-auth/react"
import styles from './style.module.css'





function Multiselectcity(props) {
   
    const [university, setUniversity] = useState([])
    const session = useSession()
    useEffect(() => {
        if (session.data) {
            getAllUser()
        }
    }, [])

    const getAllUser = async () => {
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
                field: 'state',
                headerName: 'state',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.state.title
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
                    let name = data.data.state.statecode
                    return <>
                        <p > {name}</p>

                    </>
                },
            },


        ];



    return (

        <>

            {(university !== undefined && university.length > 0) ?
                <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
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

                : null
            }
        </>
    );
}

export default Multiselectcity;