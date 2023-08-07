import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react'


interface HeaderProps {
    username?: string,

}

export default function Header(props:HeaderProps) {
    const {username} = props;
    const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerWidth = 240;

  const navItems = username ? ["Edit profile", "Log out"] : ["Sign up", "Log in"]

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
         Actions
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

    return (
    <>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppBar component="nav" position="static">
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              align="left"
              noWrap
              sx={{display: {xs: 'none', sm:'none', md: 'block'}, flexGrow: 1 }}
            >
              Who Said What
            </Typography>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              align="left"
              noWrap
              sx={{display: {xs: 'block', md: 'none'}, flexGrow: 1 }}
            >
              WSW
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {username ? (
              <>   
                <Typography>
                  Welcome {username}
                </Typography>
                <Button color="inherit" >
                    Edit profile
                </Button>
                <Button color="inherit" >
                    Log out
                </Button>
              </> )
              : 
              ( <>
                <Button color="inherit" > 
                  Sign up
                </Button>
                <Button color="inherit" >
                  Log in
                </Button>
              </> )
              }
            </Box>
          </Toolbar>          
        </AppBar>
        <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      </Box>

    </>
  );
}