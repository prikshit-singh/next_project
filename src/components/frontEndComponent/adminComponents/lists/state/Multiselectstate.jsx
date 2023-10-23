import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { apis } from '../../../../../../apis.js'
import axios from 'axios';
import { useSession } from "next-auth/react"
import styles from './style.module.css'

import Componentloader from '../../../loader/Componentloader.js';



function Multiselectstate(props) {
   
    const [university, setUniversity] = useState([])
    const session = useSession()
    useEffect(() => {
        if (session.data) {
            getAllUser()
        }
    }, [])

    const getAllUser = async () => {
        const menus = await axios.get(`${apis.baseUrl}${apis.getAllState}`, {
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
                field: 'title',
                headerName: 'Title',
                resizable: true,
                
                filter: 'agTextColumnFilter',
                
                cellRenderer: (data) => {
                    let name = data.data.title.toLowerCase()
                    return name
                },
            },
            
            {
                field: 'statecode',
                headerName: 'Statecode',

                resizable: true,
                filter: true,
                cellRenderer: (data) => {
                    let name = data.data.statecode
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
                        filter={true}
                    >
                    </AgGridReact>
                </div>

                : <Componentloader/>
            }
        </>
    );
}

export default Multiselectstate;