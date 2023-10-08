import React, { useState, useEffect } from 'react';
import Menuitem from './Menuitem';
import styles from './Dropdown.module.css';
import axios from 'axios';
import { useSession } from "next-auth/react"
const Dropdown = React.memo(() => {
    const [menu, setMenu] = useState([])

    const session = useSession()

    useEffect(() => {
        if (session.data) {
            getMenus()
        } else {
            getUserMenus()
        }
    }, [session])

    const getMenus = async () => {
        const menus = await axios.get(`http://localhost:3000/api/settings/menusettings/getmenus`, {
            headers: {
                'token': session.data ? session.data.userData.token : '',
            }
        })
        if (menus.data && menus.data.CODE == 200) {
            setMenu(menus.data.menus)
        }
       
    }
    const getUserMenus = async () => {
        const menus = await axios.get(`http://localhost:3000/api/settings/menusettings/getmenus`)

        if (menus.data && menus.data.CODE == 200) {
            setMenu(menus.data.menus)
        }

      

    }

    return (
        <div className={styles.headers}>
            <ul>
                {menu && menu.length > 0 ? menu.map((item, index) => {
                    return (
                        <Menuitem item={item} key={index} depth={0} menuData={menu} />
                    )
                }) : null}
            </ul>
        </div>

    );
});

export default Dropdown;
