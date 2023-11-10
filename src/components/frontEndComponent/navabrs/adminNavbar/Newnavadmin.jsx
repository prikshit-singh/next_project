import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuItem from '@mui/material/MenuItem';
import styles from './style.module.css'
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Link from 'next/link';
import MultiSelectUniversity from '../../adminComponents/lists/university/MultiSelectUniversity';
import Multiselectcity from '../../adminComponents/lists/city/Multiselectcity';
import Multiselectcourse from '../../adminComponents/lists/course/Multiselectcourse';
import Multiselectstate from '../../adminComponents/lists/state/Multiselectstate';
import Multiselectpapers from '../../adminComponents/lists/papers/Multiselectpapers';
import Multiselectsubject from '../../adminComponents/lists/subject/Multiselectsubject';
import Multiselectuser from '../../adminComponents/lists/user/Multiselectuser';
import Multiselectroles from '../../adminComponents/lists/roles/Multiselectroles';
import Multiselectmenus from '../../adminComponents/lists/menus/Multiselectmenus';
import Multiselectsettings from '../../adminComponents/lists/settings/Multiselectsettings';
import Multiselectprofilemenus from '../../adminComponents/lists/profilemenus/Multiselectprofilemenus';
import Uploadpreviouspapers from '../../../Uploadpreviouspapers';
import Loginmodel from '../../../Loginmodel';
import Subnavadmin from './Subnavadmin';
import Navadmin from './Navadmin';
import { useSession, signOut } from "next-auth/react"
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,

        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loginDialogue, setloginDialogue] = useState(false)
    const [uploadpreviousDialog, setUploadpreviousDialog] = useState(false)
    const [profileMenus, setProfileMenus] = useState([])
    const [menus, setMenus] = useState([])
    const [state, setState] = React.useState(false);
    const session = useSession()


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(true);

    const handleClick = () => {
        setOpen1(!open1);
    };

    console.log(props)

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

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    // css-hyum1k-MuiToolbar-root {
    return (
        <>
            <Loginmodel loginDialogue={loginDialogue} setloginDialogue={setloginDialogue} />
            <Uploadpreviouspapers uploadpreviousDialog={uploadpreviousDialog} setUploadpreviousDialog={setUploadpreviousDialog} />

            <Box sx={{ display: 'flex', }}>
                {/* <CssBaseline /> */}
                <AppBar sx={{ backgroundColor: 'var(--primary)' }} position="fixed" open={open} >
                    <Toolbar sx={{ justifyContent: 'space-between', }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                        >
                            <img src='/gitguruslogo.png' style={{ height: '50px', background: 'transparent' }} alt='logo' />

                        </Typography>
                        {/* </Typography> */}

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
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,

                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            backgroundColor: 'var(--borderColor)',
                            textTransform: 'uppercase',
                            color: 'var(--primary)',
                            boxSizing: 'border-box',
                        },
                        '& .css-10hburv-MuiTypography-root': {
                            fontWeight: '900',
                            fontFamily: 'var(--font-bold)'
                        }
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader sx={{ backgroundColor: 'var(--primary)', }}>
                        <ListItemText sx={{ color: 'white', }} primary='Menu' />
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronRightIcon style={{ fill: 'white', }} /> : <ChevronLeftIcon style={{ fill: 'white', }} />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {props.menus ? props.menus.map((data, index) => {
                            if (data.submenus && data.submenus.length > 0) {
                                return (
                                    <div key={data.title}>
                                        <ListItem onClick={(e) => navBarLinksonClick(e, data.title)} key={data._id} disablePadding>
                                            <ListItemButton onClick={handleClick}>

                                                <ListItemText primary={data.title} />
                                                <ListItemIcon>
                                                    {open1 ? <ExpandLess style={{ fill: 'var(--primary)', }} /> : <ExpandMore style={{ fill: 'var(--primary)', }} />}

                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>
                                        <Collapse in={open1} timeout="auto" unmountOnExit>
                                            <List component="div" onClick={(e) => navBarLinksonClick(e, data.title)} key={data._id} disablePadding>
                                                <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon>
                                                        <StarBorder />
                                                    </ListItemIcon>
                                                    <ListItemText primary={data.title} />
                                                </ListItemButton>
                                            </List>
                                            {
                                                data.submenus.map((data1) => {
                                                    return (
                                                        <List key={data1._id} component="div" onClick={(e) => navBarLinksonClick(e, data1.title)} disablePadding>
                                                            <ListItemButton sx={{ pl: 4 }}>
                                                                <ListItemIcon>
                                                                    <StarBorder />
                                                                </ListItemIcon>
                                                                <ListItemText primary={data1.title} />
                                                            </ListItemButton>
                                                        </List>
                                                    )
                                                })
                                            }
                                        </Collapse></div>
                                )
                            } else {
                                return (

                                    <div>
                                        <ListItem onClick={(e) => navBarLinksonClick(e, data.title)} key={data._id} disablePadding>
                                            <ListItemButton  >
                                                <ListItemText primary={data.title} />
                                                <ListItemIcon>
                                                    {index % 2 === 0 ? <ChevronRightIcon style={{ fill: 'var(--primary)', }} /> : <ChevronRightIcon style={{ fill: 'var(--primary)', }} />}
                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>

                                    </div>
                                )
                            }

                        }) : null}
                        <ListItem
                            name="Question Paper"
                            onClick={(e) => setUploadpreviousDialog(true)}
                            key="Upload Question Paper" disablePadding>
                            <ListItemButton  >
                                <ListItemText primary="Upload Paper" />
                                <ListItemIcon>
                                    <ChevronRightIcon style={{ fill: 'var(--primary)', }} />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />

                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <Subnavadmin name={props.name} state="state" />
                    <div className={styles.MultiSelect} >
                        {props.name === 'University' ?
                            <MultiSelectUniversity />
                            : null}
                        {props.name === 'City' ?
                            <Multiselectcity />
                            : null}
                        {props.name === 'State' ?
                            <Multiselectstate />
                            : null}
                        {props.name === 'Course' ?
                            <Multiselectcourse />
                            : null}
                        {props.name === 'Subject' ?
                            <Multiselectsubject />
                            : null}
                        {props.name === 'Papers' ?
                            <Multiselectpapers />
                            : null}
                        {props.name === 'Users' ?
                            <Multiselectuser />
                            : null}
                        {props.name === 'Menus' ?
                            <Multiselectmenus />
                            : null}
                        {props.name === 'Roles' ?
                            <Multiselectroles />
                            : null}

                        {props.name === 'Profile Menus' ?
                            <Multiselectprofilemenus />
                            : null}
                        {props.name === 'Settings' ?
                            <Multiselectsettings />
                            : null}

                    </div>
                </Main>
            </Box >
        </>

    );
}
