import React from 'react';
import { AppBar,Button, Box, Toolbar, Tabs, Tab, useMediaQuery, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/Images/Logo_White.png';
import { useNavigate } from 'react-router-dom';
import QuickCreateAccommodation from '../pages/Accommodation/dev/QuickCreateAccommodation';


function Header() {
    
    const tabs = ["Hotel", "Apartment", "Dormitory", "Transient Space", "Bed Space"]
    const accountOpt = ["Create Account", "Log in"]
    const blue = "#154360";
    const green = "#60ce80";
    const grey = "#f0f0f0";
    const darkGrey = "#f5f5f7";
    const quicksand = "Quicksand"
    const sourceSansPro = "Source Sans Pro";

    // Menu List for all accommodations types
    const MenuAccommList = tabs.map((tab) => 
        <MenuItem onClick={() => navigate('/')}
            sx={{fontFamily: sourceSansPro}}>
            {tab}
        </MenuItem>  
    );

    // Menu List for tabs
    const TabAccommList = tabs.map((tab) =>
        <Tab label={tab} href='/'
            sx={{color:grey, textTransform:"none", fontFamily:sourceSansPro}} />
    );

    // Menu List for Account Log in or Create Account
    const AccountOptions = accountOpt.map((acc) => 
        <MenuItem onClick={() => navigate('/')}
            sx={{fontFamily:sourceSansPro}}>
            {acc}
        </MenuItem>
    );
    
    // For making responsive header
    const navigate = useNavigate()
    const isNonMobileDevice = useMediaQuery("(min-width: 890px)")

    // For Menu List of Accommodation Type
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // For Menu List of Account Login or Create Account
    const [anchorElAcc, setAnchorElAcc] = React.useState<null | HTMLElement>(null);
    const openAcc = Boolean(anchorElAcc);
    const handleClickAcc = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAcc(event.currentTarget);
    };
    const handleCloseAcc = () => {
        setAnchorElAcc(null);
    };

    return (
        <React.Fragment>
            <AppBar id="Header"
                sx={{
                    position:"sticky",
                    backgroundColor:blue,
                    display:'flex',
                }}>
                <Toolbar>
                    {isNonMobileDevice?
                        <>
                            <Box component="img" alt="AirVnV Logo" src={Logo} onClick={() => navigate('/')}
                                sx={{height:50, width:100, marginLeft:"-10px",":hover":{cursor:"hover"}}} />

                            <Tabs>
                                {TabAccommList}
                            </Tabs>

                            {/* <Button sx={{
                                fontFamily:sourceSansPro,
                                marginLeft: "auto",
                                color: grey,
                                border: "solid",
                                borderWidth: "2px",
                                borderRadius: "10px",
                                whiteSpace: "nowrap",
                                fontWeight: "bold",
                                textTransform: "none",
                                ":hover": {
                                    backgroundColor: 'hsl(202, 63%, 12%)',
                                    
                                }
                            }}> Create Account </Button> */}

                            <QuickCreateAccommodation />

                            <Button sx={{
                                fontFamily:sourceSansPro,
                                marginLeft: "10px",
                                fontStyle: "bold",
                                backgroundColor: grey,
                                color: blue,
                                borderRadius: "10px",
                                fontWeight: "bold",
                                textTransform: "none",
                                ":hover": {
                                    backgroundColor: blue,
                                    color: grey,
                                    fontWeight: "bold",
                                }
                            }}> Log in </Button>
                            
                        </>
                        : 
                        <>
                            <IconButton onClick={handleClick}
                                sx={{
                                    size:"large",
                                    color:grey,
                                }}>
                                <MenuIcon sx={{
                                    fontSize:"inherit",
                                }}/>
                            </IconButton>

                            <Menu aria-labelledby='Header-Accomm-Menu-Btn' open={open} onClose={handleClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>                                                            
                                {MenuAccommList}
                            </Menu>
                               
                            <Box component="img" sx={{height:50, width:100, cursor:'pointer',marginLeft:"0px"}} alt="AirVnV Logo" src={Logo} onClick={() => navigate('/')}/>
                            
                            <IconButton onClick={handleClickAcc}
                                sx={{
                                    size:"large",
                                    color:grey,
                                    marginLeft:"auto",
                                }}>
                                <AccountCircleIcon fontSize='inherit'/>
                            </IconButton>

                            <Menu aria-labelledby='Header-Account-Menu-Btn' open={openAcc} onClose={handleCloseAcc}
                                anchorOrigin={{ vertical:'top', horizontal:'right' }}>
                                {AccountOptions}
                            </Menu>
                        </>
                    }
                    

                </Toolbar>
            </AppBar>
        </React.Fragment> 
    );
}

export default Header;