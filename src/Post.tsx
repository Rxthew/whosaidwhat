import Avatar from '@mui/material/Avatar'
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField  from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as React from 'react'; 
import { useParams } from "react-router-dom";
import { useIndexData } from "./helpers/hooks";
import { CommentInterface, FormDialogProps } from "./helpers/types";
import { extractPostById, produceCommentFormProps } from "./helpers/utils";


const FormDialog = function(props: FormDialogProps){
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const FormButton = function(){
      return props.button(handleClickOpen)
    };
  
    return (
      <div>
        <FormButton />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{props.inputLabel}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.inputText}
            </DialogContentText>
            {props.delete || (
              <form id="dialogForm" onSubmit={props.handleSubmit}>
                <TextField 
                autoFocus
                margin="dense"
                id="content"
                name="content"
                label="content"
                type="text"
                fullWidth
                variant="standard"
                value={props.content || ""} 
                />
              </form>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="dialogForm">{props.submitLabel ? props.submitLabel : "Submit"}</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const {
         addCommentProps, 
         deleteCommentProps,
         editCommentProps
        } = produceCommentFormProps();  
 

const Comment = function(props: CommentInterface){ 

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
  <div>
    <Container>
      <Stack spacing={2}>
        <Grid container spacing={2} sx={{p:2, borderBottom: '1px solid', minWidth:'fit-content'}} wrap='nowrap'>
          <Grid item>
            <Avatar sx={{bgcolor:'#1976d2', width: '30px', height:'30px'}}>U</Avatar>
          </Grid>
          <Grid item sx={{flexGrow: '1'}}>
            <Typography>User </Typography>
          </Grid>
          <Grid item>
            <FormDialog {...addCommentProps(props._id)}/>
          </Grid>
        </Grid>
        <Box sx={{display: 'flex'}}>
          <Paper sx={{p:2}} variant='outlined'>
            <Grid container spacing={6} wrap='nowrap'>
              <Grid item> 
                <Typography variant='overline'>{props.user?.username || 'Anonymous'}:</Typography>      
              </Grid>
              <Grid item>
                <Typography>02/12/2019</Typography>
              </Grid>
              <Grid item sx={{ml:'auto'}}>
                <Button onClick={handleClick}>
                  <MoreHorizIcon  />
                </Button>
                <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 10,
                horizontal: 130,
                }}
                sx={{
                cursor: 'pointer'
                }}
              >
                  <Stack sx={{p:1}}>
                    <FormDialog {...editCommentProps(props._id, props.content)} />
                    <FormDialog {...deleteCommentProps(props._id)} />      
                  </Stack>
                </Popover>
            </Grid>
            </Grid>
            <Typography>
                  {props.content}
            </Typography>  
          </Paper>
        </Box>
      </Stack>
    </Container>      
  </div>
  );   // /Box at the end is the end of a single comment so that's where you loop with keys.
}; 

const Post = function Post(){
    const { postId }  = useParams();
    const { user, posts } = useIndexData();
    const post = postId && posts && posts.length > 0 ? extractPostById(postId, posts) : null;

    return (
       <>
          {post ? (
            <div>yes</div>
          ): <div>no</div>}
       </>
    )
};

export default Post
