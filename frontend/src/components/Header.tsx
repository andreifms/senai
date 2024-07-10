import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, Container } from '@mui/material';
import { Link } from "react-router-dom";

interface HeaderProps {
  userName: string;
  title: string;
}

function Header({userName, title}: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{background: 'rgba(91,82,82,0.51)'}}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" style={ {flexGrow: 1} }>
            { title }
          </Typography>
          <div>
            <Avatar onClick={ handleMenu }>{ userName.charAt(0) }</Avatar>
            <Menu
              id="menu-appbar"
              anchorEl={ anchorEl }
              anchorOrigin={ {
                vertical: 'top',
                horizontal: 'right',
              } }
              keepMounted
              transformOrigin={ {
                vertical: 'top',
                horizontal: 'right',
              } }
              open={ Boolean(anchorEl) }
              onClose={ handleClose }
            >
              <Link to={ '/perfil' } style={ {textDecoration: 'none', color: 'black'} }>
                <MenuItem onClick={ handleClose }>Perfil</MenuItem>
              </Link>
              <Link to={ '/' } style={ {textDecoration: 'none', color: 'black'} }>
                <MenuItem onClick={ handleClose }>Logout</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
