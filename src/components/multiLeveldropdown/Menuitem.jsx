import React, { useState, useEffect, useRef } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Submenudropdawn from './Submenudropdawn';
import styles from '../../styles/FrontPageStyle/Dropdown.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
function Menuitem({ item, depth, menuData }) {
    const [showMenu, setShowMenu] = useState(false)
    const [leafChildParentIds, setLeafChildParentIds] = useState([]);
    const [selectedChildId, setSelectedChildId] = useState(null);
    const myref = useRef()
    const router = useRouter();

    const handleToggol = () => {
        setShowMenu((pre) => !pre)
    }
    useEffect(() => {
        const myhandler = (event) => {
            if (showMenu && myref.current && !myref.current.contains(event.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener('mousedown', myhandler)
    }, [showMenu])

    const onMouseEnterLi = () => {
        setShowMenu(true)
    }
    const onMouseLeaveLi = () => {
        setShowMenu(false)
    }

    function findParentSubmenuIds(data, parentIds = [], targetChildId) {
        let submenuIds = [];

        for (const item of data) {
            const submenuId = item._id;
            const submenuTitle = item.title;
            const submenus = item.submenu;

            if (submenuId === targetChildId) {
                // Child ID is found, store the parent IDs
                submenuIds = parentIds.concat({ submenuId, submenuTitle });
                break; // Stop searching
            }

            if (submenus && submenus.length > 0) {
                parentIds.push({ submenuId, submenuTitle });
                submenuIds = findParentSubmenuIds(submenus, parentIds, targetChildId);
                parentIds.pop();
            }
        }
        return submenuIds;
    }

    const handleQuestionPaperClick = async (e) => {
        const ids = await findParentSubmenuIds(menuData, [], e.target.id)
        console.log(ids)
        //    router.push(`questionpaper/${ids.join('-')}`)
    }
    return (
        item.submenu && item.submenu.length > 0 ? (
         
                <li onMouseEnter={() => onMouseEnterLi()} onMouseLeave={() => onMouseLeaveLi()} ref={myref} className={styles.parent} >
                    <button  id={item._id} className={styles.liButton} onClick={() => handleToggol()} >

                    {item.title.toUpperCase()}
                        {depth > 0 ?
                            <span  className={styles.ArrowRightIcon}><ArrowRightIcon /></span>
                            :
                            <span  className={styles.ArrowDropDownIcon}><ArrowDropDownIcon /></span>
                        }

                    </button>
                    <Submenudropdawn submenu={item.submenu} depth={depth} showSubMenu={showMenu} menuData={menuData} />
                </li>
            
        ) : (
         
                item.title.toLowerCase() != 'question papers' && depth == 0 ?
                    <li  id={item.title} onClick={(e) => handleQuestionPaperClick(e)}><Link style={{color:"white"}} href={item.url}>{item.title.toUpperCase()}</Link></li>
                    :
                    <li  id={item.title} onClick={(e) => handleQuestionPaperClick(e)}>{item.title.toUpperCase()}</li>
                

           
        )
    );
}

export default Menuitem;