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
import Dropdown from '../../../multiLeveldropdown/Dropdown'
import Link from 'next/link';
import Loginmodel from '../../../Loginmodel';
import styles from './style.module.css'
const pages = ['Univesity', 'User', 'Roles'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import { useSession, signOut } from "next-auth/react"

function Navadmin() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [dialogue, setDialogue] = useState(false)
    const [loginDialogue, setloginDialogue] = useState(false)
    const [uploadpreviousDialog, setUploadpreviousDialog] = useState(false)

    const [profileMenus, setProfileMenus] = useState([])
    const session = useSession()
    // console.log(session)
    // const session = useSession()
    useEffect(() => {
        if (session && session.data) {
            setProfileMenus(session.data.existingUser.roles[0].canaccessprofilemenus)
        }
    }, [session])


    // const getMenus = async () => {
    //     const menus = await axios.get(`http://localhost:3000/api/settings/menusettings/profilemenus/getprofilemenus`)
    //     if (menus.data && menus.data.CODE == 200) {
    //         setProfileMenus(menus.data.menus)
    //     }
    // }


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

    console.table(pages)
    return (
        <>

            <Loginmodel loginDialogue={loginDialogue} setloginDialogue={setloginDialogue} />
            <AppBar style={{ paddingRight: '0px', backgroundColor: 'var(--primary)' }} position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
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
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
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
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (

                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box className={styles.adminLinks} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <Link className={styles.navLinks} href='/'>Home</Link>
                            <Typography className={styles.navLinks} >University</Typography>
                            <Typography className={styles.navLinks} >User</Typography>
                        </Box>

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
                                {session.data ?

                                    profileMenus.map((setting) => (
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
