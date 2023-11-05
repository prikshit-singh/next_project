import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { apis } from '../../../../../../apis.js'
import axios from 'axios';
import { useSession } from "next-auth/react"
import styles from "../../../../../styles/admin/frontEndComponent/list/list.module.css"

const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
];



function MultiSelectUser(props) {
   
    const [university, setUniversity] = useState([])
    const session = useSession()
    console.log(session)
    useEffect(() => {
        if (session.data) {
            getAllUser()
        }
    }, [])

    const getAllUser = async () => {
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
                headerName: 'Name',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.title
                    console.log(data)
                    return <>
                        <span  className={styles.listSpan}> {name}</span>
                    </>
                },
            },
            {
                field: 'City',
                headerName: 'City',
                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.city.title
                    console.log(data)
                    return <>
                        <span className={styles.listSpan} > {name}</span>
                    </>
                },
            },
            {
                field: 'State',
                headerName: 'State',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.state.title
                    console.log(data)
                    return <>
                        <span  className={styles.listSpan}>{name}</span>

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

export default MultiSelectUser;