import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Error = function Error(){
    return (
        <Box sx={{display:'flex', flexDirection: 'column'}}>
            <Typography align='left' component='h1' variant='h3'>Something went wrong :(</Typography>
            <Typography component='h2' variant='h4'>Please wait for a few minutes and try again.</Typography>
        </Box>
    )

}

export default Error