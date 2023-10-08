import React,{useState} from 'react';
import Navadmin from '../../../components/frontEndComponent/navabrs/adminNavbar/Navadmin';
import { withAuth } from '../../../components/Auth';
import MultiSelectUniversity from '../../../components/frontEndComponent/adminComponents/lists/university/MultiSelectUniversity';
import Subnavadmin from '../../../components/frontEndComponent/navabrs/adminNavbar/Subnavadmin';
import style from '../../../styles/admin/Dashboard.module.css'

const index = () => {
    return (
        <>
            <Navadmin />
            <Subnavadmin  name="UNIVERSITY" state="state"/>

            <div className={style.MultiSelect} >
                <MultiSelectUniversity />
            </div>
        </>
    );
};

export default index;