import React, { useState,useEffect } from 'react';
import Navadmin from '../../../components/frontEndComponent/navabrs/adminNavbar/Navadmin';
import { withAuth } from '../../../components/Auth';
import MultiSelectUniversity from '../../../components/frontEndComponent/adminComponents/lists/university/MultiSelectUniversity';
import MultiSelectuser from '../../../components/frontEndComponent/adminComponents/lists/user/Multiselectuser'
import Multiselectcity from '../../../components/frontEndComponent/adminComponents/lists/city/Multiselectcity'
import Multiselectstate from '../../../components/frontEndComponent/adminComponents/lists/state/Multiselectstate';
import Multiselectcourse from '../../../components/frontEndComponent/adminComponents/lists/course/Multiselectcourse';
import Multiselectsubject from '../../../components/frontEndComponent/adminComponents/lists/subject/Multiselectsubject';
import Multiselectpapers from '../../../components/frontEndComponent/adminComponents/lists/papers/Multiselectpapers';
import Subnavadmin from '../../../components/frontEndComponent/navabrs/adminNavbar/Subnavadmin';
import { useSession, signOut } from "next-auth/react"
import Newnavadmin from '../../../components/frontEndComponent/navabrs/adminNavbar/Newnavadmin'
import style from '../../../styles/admin/Dashboard.module.css'
const Index = () => {
    const [subnavName, setSubnavName] = useState("University")
    const [multiSelectConponent,setMultiSelectConponent] = useState()
    const [subnavBtn, setsubNavBtn] = useState()
    const [profileMenus, setProfileMenus] = useState([])
    const [menus, setMenus] = useState([])
    const session = useSession()
    useEffect(() => {
      if (session && session.data) {
          setProfileMenus(session.data.existingUser.roles[0].canaccessprofilemenus)
          setMenus(session.data.existingUser.roles[0].canaccessmenus)
      }
  }, [session])

    return (
        <>
            {/* <Navadmin profileMenus={profileMenus} menus={menus} name={subnavName} setSubnavName={setSubnavName}  /> */}
            <Newnavadmin  profileMenus={profileMenus} menus={menus} name={subnavName} setSubnavName={setSubnavName}  />
            
            {/* <Subnavadmin name={subnavName} state="state" /> */}

            {/* <div className={style.MultiSelect} >
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
             {subnavName === 'Papers' ?
                <Multiselectpapers  />
             : null}
            </div> */}
        </>
    );
};

export default withAuth(Index);