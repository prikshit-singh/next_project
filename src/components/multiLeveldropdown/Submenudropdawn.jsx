import React from 'react';
import Menuitem from './Menuitem';
import styles from './Dropdown.module.css';
const Submenudropdawn = ({submenu,depth,showSubMenu,menuData}) => {
    return (
        <ul className={`${styles.subMenuDropDawn} ${depth > 0 ? styles.subMenuDropDawnStyle:''} ${showSubMenu ?styles.showMenu:styles.showHideMenu }`}>
            {submenu.map((menu)=>{
                return(
                    <Menuitem item={menu} depth={depth+1} menuData={menuData}/>
                )
            })}
        </ul>
    );
};

export default Submenudropdawn;