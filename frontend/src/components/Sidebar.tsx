import React, { useState } from 'react';
import { List, ListItemText, Drawer, ListItemButton, Box, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MailIcona from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <Box sx={ {width: 250} }>
        <List>
          <ListItemButton onClick={ () => handleNavigation('/dashboard') }>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Início"/>
          </ListItemButton>
          <ListItemButton onClick={ () => handleNavigation('/casas') }>
            <ListItemIcon>
              <BookIcon/>
            </ListItemIcon>
            <ListItemText primary="Casas"/>
          </ListItemButton>
          <ListItemButton onClick={ () => handleNavigation('/especializacoes') }>
            <ListItemIcon>
              <BookIcon/>
            </ListItemIcon>
            <ListItemText primary="Especializações"/>
          </ListItemButton>
          <ListItemButton onClick={ () => handleNavigation('/usuarios') }>
            <ListItemIcon>
              <MailIcona/>
            </ListItemIcon>
            <ListItemText primary="Usuários"/>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
