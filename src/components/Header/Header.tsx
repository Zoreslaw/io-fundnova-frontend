import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../contexts/AuthContext"; 
import Modal from "../Modal/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import Logo from "../Logo/Logo";
import "./Header.css";
import UserProfile from "../UserProfile/UserProfile";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Button, createTheme, Stack, ThemeProvider } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0056b3" },
    secondary: { main: "#3d3d3d" },
    background: { default: "#2a2a2a", paper: "#333333" },
    text: { primary: "#d8d8d8", secondary: "#b0b0b0" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { color: "#d8d8d8" },
    body1: { color: "#b0b0b0" },
  },
});


const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const loginModal = useModal();
  const registerModal = useModal();
  const profileModal = useModal();
  const [activeTab, setActiveTab] = useState("general");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const searchButtonHandler = () => {
    navigate("./search")
  };

  // useEffect(() => {
  //   console.log(user);
  // }, [user])

  return (
    <header className="header">
      <div className="header-logo">
      <Link to="/">
          <Logo />
        </Link>
      </div>
      {/* <div className="searchButton">
        <button onClick={searchButtonHandler}>Explore</button>
      </div> */}
      <div className="authButtons">
        {/* {user ? (
          <>
            <button onClick={profileModal.openModal} style={{color: "#fff"}}>{user.username}</button>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={loginModal.openModal}>Log In</button>
            <button onClick={registerModal.openModal}>Sign Up</button>
          </>
        )} */}
        <ThemeProvider theme={theme}>
        {user ? (
          
            <React.Fragment>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} mr={1}>
              <Typography>{user.username}</Typography>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>{user.username[0]}</Avatar>
                  </IconButton>
                </Tooltip>
                
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={()=>{
                  handleClose();
                  setActiveTab("general");
                  profileModal.openModal();
                  }}
                >
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={()=>{
                  handleClose();
                  setActiveTab("backed");
                  profileModal.openModal();
                  }}
                >
                  <ListItemIcon>
                    <BookmarkIcon fontSize="small" />
                  </ListItemIcon>
                  Backed Projects
                </MenuItem>
                <MenuItem onClick={()=>{
                  handleClose();
                  setActiveTab("myProjects");
                  profileModal.openModal();
                  }}
                >
                  <ListItemIcon>
                    <WorkIcon fontSize="small" />
                  </ListItemIcon>
                  My Projects
                </MenuItem>
                <MenuItem onClick={()=>{
                  handleClose();
                  setActiveTab("settings");
                  profileModal.openModal();
                  }}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={()=>{
                  handleClose();
                  logout();
                }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          
        ) : (
          <React.Fragment>
            <Stack gap={"15px"} flexDirection={"row"}>
              <Button variant="contained"  onClick={loginModal.openModal}>Log In</Button>
              <Button variant="contained"  onClick={registerModal.openModal}>Sign Up</Button>
            </Stack>
          </React.Fragment>
        )}
        </ThemeProvider>
      </div>

      <Modal isOpen={loginModal.isOpen} onClose={loginModal.closeModal}>
        <LoginForm />
      </Modal>
      <Modal isOpen={registerModal.isOpen} onClose={registerModal.closeModal}>
        <RegisterForm />
      </Modal>
      <Modal isOpen={profileModal.isOpen} onClose={profileModal.closeModal}>
        <UserProfile firstTab={activeTab} />
      </Modal>
    </header>
  );
};

export default Header;
