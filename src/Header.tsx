import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface HeaderProps {
    username: string,

}

export default function Header(props:HeaderProps) {
    const {username} = props;

    return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography
              component="h1"
              variant="h1"
              color="inherit"
              align="left"
              noWrap
              sx={{flexGrow: 1}}
            >
              Who Said What
            </Typography>
            {username ? (
            <>   
              <Typography>Welcome {username}</Typography>
              <Button color="inherit" variant="outlined" size="small">
                  Edit Profile
              </Button>
              <Button color="inherit" variant="outlined" size="small">
                  Log out
              </Button>
            </> )
            : 
            ( <>
              <Button color="inherit" variant="outlined" size="small"> 
                Sign up
              </Button>
              <Button color="inherit" variant="outlined" size="small">
                Log in
              </Button>
            </> )
            }
          </Toolbar>          
        </AppBar>
      </Box>

    </>
  );
}