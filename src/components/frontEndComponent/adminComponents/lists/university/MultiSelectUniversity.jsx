import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { apis } from '../../../../../../apis.js'
import axios from 'axios';
import { useSession } from "next-auth/react"
import styles from './style.module.css'

const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
];



function MultiSelectReferences(props) {
   
    const [university, setUniversity] = useState([])
    const session = useSession()
    useEffect(() => {
        if (session.data) {
            getMenus()
        }
    }, [])

    const getMenus = async () => {
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
                        <p > {name}</p>
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
                        <p > {name}</p>
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
                        <p > {name}</p>

                    </>
                },
            },


        ];



    return (

        <>

            {(university !== undefined && university.length > 0) ?
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
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

export default MultiSelectReferences;