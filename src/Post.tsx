import Avatar from '@mui/material/Avatar'
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Card  from "@mui/material/Card";
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useIndexData } from "./helpers/hooks";
import { CommentInterface } from "./helpers/types";
import { extractPostById } from "./helpers/utils";
import * as React from 'react'; //to remove

interface FormDialogProps {
  buttonLabel: string,
  delete: boolean,
  handleSubmit: () => void
  inputLabel: string,
  inputText: string,
  content?: string,
  submitLabel?: string,

}

const FormDialog = function(props: FormDialogProps){
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          {props.buttonLabel}
        </Button>
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
            <Button type="submit" form="dialogForm" onClick={props.handleSubmit}>{props.submitLabel ? props.submitLabel : "Submit"}</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
 

const Comment = function(props: CommentInterface){ //to flesh out.

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  
  const addComment = async function(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const id = props._id;
    const data = new FormData(event.currentTarget);
    data.append('_id', id);
    await fetch()

};

const updateComment = async function(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const id = props._id
    const data = new FormData(event.currentTarget);
    data.append('_id', id);
    await fetch()


};

const deleteComment = function(){

};


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
   <Button size='small' variant='contained' endIcon={<AddCircleIcon />} sx={{display: {xs:'inline-flex',sm: 'none'}}}>Add</Button>
   <Button size='small' variant='contained' endIcon={<AddCircleIcon />} sx={{display: {xs: 'none', sm:'inline-flex'}}}>Add Comment</Button>
   </Grid>
    </Grid>
    <Box sx={{display: 'flex'}}>
    <Paper sx={{p:2}} variant='outlined'>
      <Grid container spacing={6} wrap='nowrap'>
      <Grid item> 
      <Typography variant='overline'>User:</Typography>
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
       <Button size='small' variant='text' startIcon={<EditIcon />} sx={{mr:'auto'}}>Edit comment</Button>
       <Button size='small' variant='text' startIcon={<DeleteIcon />} sx={{mr: 'auto'}}>Delete comment</Button>       
       </Stack>
      </Popover>
      </Grid>
      </Grid>
      <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>  
      </Paper>
      </Box>
      </Stack>
      </Container>      
    </div>
  );   
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
