import React from 'react';
import { AppBar,Button, Box, Toolbar, Tabs, Tab, useMediaQuery, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/images/Logo_White.png';
import { useNavigate } from 'react-router-dom';
import '../assets/design.css'


function Header() {
    
    const tabs = ["Hotel", "Apartment", "Dormitory", "Transient Space", "Bed Space"]
    const accountOpt = ["Create Account", "Log in"]

    // Menu List for all accommodations types
    const MenuAccommList = tabs.map((tab) => 
        <MenuItem id='Header-Accomm-MenuList' onClick={() => navigate('/')}>
            {tab}
        </MenuItem>  
    );

    // Menu List for tabs
    const TabAccommList = tabs.map((tab) =>
        <Tab id='Header-Accomm-Tab' label={tab} href='/'/>
    );

    // Menu List for Account Log in or Create Account
    const AccountOptions = accountOpt.map((acc) => 
        <MenuItem id='Header-Acc-Opt' onClick={() => navigate('/')}>
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
            <AppBar id="Header">
                <Toolbar>
                    {isNonMobileDevice?
                        <>
                            <Box id='Header-Logo' component="img" sx={{height:50,width:100}} alt="AirVnV Logo" src={Logo} onClick={() => navigate('/')} />

                            <Tabs>
                                {TabAccommList}
                            </Tabs>

                            <Button id='Header-Create-Acc-Btn'> Create Account </Button>
                            <Button id='Header-Log-in-Btn'> Log in </Button>
                            
                        </>
                        : 
                        <>
                            <IconButton id='Header-Accomm-Menu-Btn' onClick={handleClick}>
                                <MenuIcon id='Header-MenuIcon'/>
                            </IconButton>

                            <Menu id='Header-Accomm-Menu' aria-labelledby='Header-Accomm-Menu-Btn' open={open} onClose={handleClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>                                                            
                                {MenuAccommList}
                            </Menu>
                               
                            <Box id="Header-Logo-Dynamic" component="img" sx={{height:50, width:100}} alt="AirVnV Logo" src={Logo} onClick={() => navigate('/')}/>
                            
                            <IconButton id='Header-Account-Menu-Btn' onClick={handleClickAcc}>
                                <AccountCircleIcon fontSize='inherit'/>
                            </IconButton>

                            <Menu id='Header-Acc-Menu' aria-labelledby='Header-Account-Menu-Btn' open={openAcc} onClose={handleCloseAcc}
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