import React, { useState } from 'react';
import Navadmin from '../../../components/frontEndComponent/navabrs/adminNavbar/Navadmin';
import { withAuth } from '../../../components/Auth';
import MultiSelectUniversity from '../../../components/frontEndComponent/adminComponents/lists/university/MultiSelectUniversity';
import MultiSelectuser from '../../../components/frontEndComponent/adminComponents/lists/user/Multiselectuser'
import Multiselectcity from '../../../components/frontEndComponent/adminComponents/lists/city/Multiselectcity'
import Multiselectstate from '../../../components/frontEndComponent/adminComponents/lists/state/Multiselectstate';
import Multiselectcourse from '../../../components/frontEndComponent/adminComponents/lists/course/Multiselectcourse';
import Multiselectsubject from '../../../components/frontEndComponent/adminComponents/lists/subject/Multiselectsubject';
import Subnavadmin from '../../../components/frontEndComponent/navabrs/adminNavbar/Subnavadmin';
import style from '../../../styles/admin/Dashboard.module.css'

const Index = () => {
    const [subnavName, setSubnavName] = useState("University")
    const [multiSelectConponent,setMultiSelectConponent] = useState()
    const [subnavBtn, setsubNavBtn] = useState()

    return (
        <>
            <Navadmin name={subnavName} setSubnavName={setSubnavName}  />
            <Subnavadmin name={subnavName} state="state" />

            <div className={style.MultiSelect} >
            {subnavName === 'University' ?
                <MultiSelectUniversity  />
             : null}
             {subnavName === 'City' ?
                <Multiselectcity  />
             : null}
             {subnavName === 'State' ?
                <Multiselectstate  />
             : null}
             {subnavName === 'Course' ?
                <Multiselectcourse  />
             : null}
             {subnavName === 'Subject' ?
                <Multiselectsubject  />
             : null}
            </div>
        </>
    );
};

export default withAuth(Index);