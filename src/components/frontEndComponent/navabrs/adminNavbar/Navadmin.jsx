import React, { useState, useEffect } from 'react';
import axios from 'axios'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


import Uploadpreviouspapers from '../../../Uploadpreviouspapers';
import Dropdown from '../../../multiLeveldropdown/Dropdown'
import Link from 'next/link';
import Loginmodel from '../../../Loginmodel';
import styles from './style.module.css'
const pages = ['Univesity', 'User', 'Roles'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import { useSession, signOut } from "next-auth/react"

function Navadmin(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loginDialogue, setloginDialogue] = useState(false)
    const [uploadpreviousDialog, setUploadpreviousDialog] = useState(false)
    const [profileMenus, setProfileMenus] = useState([])
    const [menus, setMenus] = useState([])

    const [state, setState] = React.useState(false);
    const session = useSession()

    useEffect(() => {
        if (session && session.data) {
            setProfileMenus(session.data.existingUser.roles[0].canaccessprofilemenus)
            setMenus(session.data.existingUser.roles[0].canaccessmenus)
        }
    }, [session])






    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {props.menus ? props.menus.map((data, index) => {
                    return <ListItem onClick={(e) => navBarLinksonClick(e, data.title)} key={data._id} disablePadding>
                        <ListItemButton  >
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={data.title} />
                        </ListItemButton>
                    </ListItem>
                }) : null}
            </List>
            {/* <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );





    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        document.body.style.overflow = 'scroll';
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const navBarLinksonClick = (e, title) => {
        props.setSubnavName(title)
    }

   

    console.log('menus', props)
    return (
        <>

            <Loginmodel loginDialogue={loginDialogue} setloginDialogue={setloginDialogue} />
            {/* <Uploadpreviouspapers uploadpreviousDialog={uploadpreviousDialog} setUploadpreviousDialog={setUploadpreviousDialog} /> */}
            {/* <div>

                <Drawer
                    anchor='left'
                      variant='temporary'
                    sx={{
                        '& .MuiPaper-root.MuiDrawer-paper': {
                            top:'0px',
                            
                            
                            background: 'var(--primary)',
                            color:'white' 
                        },
                        '& .MuiPaper-elevation16': {
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',  },
                    }}
                    open={state}
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            {props.menus ? props.menus.map((data, index) => {
                                return <ListItem onClick={(e) => navBarLinksonClick(e, data.title)} key={data._id} disablePadding>
                                    <ListItemButton  >
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon style={{fill:'white',}} /> : <MailIcon style={{fill:'white',}} />}
                                        </ListItemIcon>
                                        <ListItemText primary={data.title} />
                                    </ListItemButton>
                                </ListItem>
                            }) : null}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon style={{fill:'white',}} /> : <MailIcon style={{fill:'white',}} />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>

            </div> */}
            <Uploadpreviouspapers uploadpreviousDialog={uploadpreviousDialog} setUploadpreviousDialog={setUploadpreviousDialog} />
            <AppBar style={{ paddingRight: '0px', backgroundColor: 'var(--primary)' }} position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img src='/gitguruslogo.png' style={{ height: '60px', background: 'transparent' }} alt='logo' />

                        </Typography> */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={toggleDrawer(true)}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            {/* <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                }}
                            >

                               
                                <Link className={styles.menuLinks} href='/'>Home</Link>
                                {props.menus ? props.menus.map((data, index) => {
                                    return <Typography key={data._id} name="University"
                                        className={styles.menuLinks}
                                        onClick={(e) => navBarLinksonClick(e)} >
                                        {data.title}
                                    </Typography>

                                }) : null}
                                <Typography name="University"
                                    className={styles.menuLinks}
                                    onClick={(e) => navBarLinksonClick(e)} >
                                    University
                                </Typography>
                                <Typography name="State" onClick={(e) => navBarLinksonClick(e)} className={styles.menuLinks} >State</Typography>
                                <Typography name="City" onClick={(e) => navBarLinksonClick(e)} className={styles.menuLinks} >City</Typography>
                                <Typography name="Course" onClick={(e) => navBarLinksonClick(e)} className={styles.menuLinks} >Course</Typography>
                                <Typography name="Subject" onClick={(e) => navBarLinksonClick(e)} className={styles.menuLinks} >Subject</Typography>
                                <Typography name="Papers" onClick={(e) => navBarLinksonClick(e)} className={styles.menuLinks} >Papers</Typography>
                                <Typography name="Question Paper" onClick={(e) => setUploadpreviousDialog(true)} className={styles.menuLinks} >Upload Question Paper</Typography>
                            </Menu> */}
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img src='/gitguruslogo.png' style={{ height: '60px', background: 'transparent' }} alt='logo' />

                        </Typography>


                        {/* <Box className={styles.adminLinks} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <Link className={styles.navLinks} href='/'>Home</Link>

                            {props.menus ? props.menus.map((data, index) => {
                                console.log('data', data)
                                return <Typography key={data._id} name={data.title}
                                    className={styles.navLinks}
                                    onClick={(e) => navBarLinksonClick(e)} >
                                    {data.title}
                                </Typography>

                            }) : null}
                            <Typography name="University"
                                className={styles.navLinks}
                                onClick={(e) => navBarLinksonClick(e)} >
                                University
                            </Typography>
                            <Typography name="State" onClick={(e) => navBarLinksonClick(e)} className={styles.navLinks} >State</Typography>
                            <Typography name="City" onClick={(e) => navBarLinksonClick(e)} className={styles.navLinks} >City</Typography>
                            <Typography name="Course" onClick={(e) => navBarLinksonClick(e)} className={styles.navLinks} >Course</Typography>
                            <Typography name="Subject" onClick={(e) => navBarLinksonClick(e)} className={styles.navLinks} >Subject</Typography>
                            <Typography name="Papers" onClick={(e) => navBarLinksonClick(e)} className={styles.navLinks} >Papers</Typography>
                            <Typography name="Question Paper" onClick={(e) => setUploadpreviousDialog(true)} className={styles.navLinks} >Upload Question Papers</Typography>
                        </Box> */}

                        <Box sx={{ flexGrow: 0 }}>
                            {session && session.data != undefined ?
                                <Tooltip title="Profile">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={session.data.userData.picture} />
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title="Profile">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                            }
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}

                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {props.profileMenus ?

                                    props.profileMenus.map((setting) => (
                                        <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">
                                                <Link className={styles.profileUrl} href={setting.url}>{setting.title}</Link>
                                            </Typography>
                                        </MenuItem>
                                    )
                                    )


                                    :
                                    null

                                }
                                {session.data ?
                                    <MenuItem key="logout" onClick={handleCloseUserMenu}>
                                        <Typography className={styles.profileUrl} onClick={() => signOut('google', { callbackUrl: 'https://gitgurus.com' })} textAlign="center">
                                            <Link className={styles.profileUrl} href='#'> Log Out</Link>
                                        </Typography>
                                    </MenuItem>
                                    :
                                    <MenuItem key="login" onClick={handleCloseUserMenu}>
                                        <Typography onClick={() => setloginDialogue(true)} textAlign="center">Log In</Typography>
                                    </MenuItem>
                                }
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>

            </AppBar>




        </>
    );
}


export default Navadmin;
