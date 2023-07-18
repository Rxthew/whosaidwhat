import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Card  from "@mui/material/Card";
import Container from '@mui/material/Container'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
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
     <Grid container spacing={6} sx={{p:2}}>
      <Grid item>
     <Typography>User + Avatar</Typography>
     </Grid>
     <Grid item sx={{ml: 'auto'}}>
     <Button variant='contained' endIcon={<AddCircleIcon />}>Add Comment</Button>
      </Grid>
      </Grid>
      <Paper sx={{p:2}} variant='outlined'>
        <Grid container spacing={6}>
        <Grid item>
        <Typography>User + Avatar</Typography>
        </Grid>
        <Grid item>
        <Typography>02/12/2019</Typography>
        </Grid>
        <Grid item sx={{ml:'auto'}}>
          <Button onClick={handleClick}>
          <MoreHorizIcon/>
          </Button>
          <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Stack sx={{p:1}}>
         <Box sx={{display: 'flex', gap: '5px', py: '0.5rem'}}>
         <EditIcon />
         <Typography>Edit comment</Typography>
         </Box>
         <Box sx={{display: 'flex', gap: '5px', py: '0.5rem'}}>
         <DeleteIcon />
         <Typography>Delete comment</Typography>
         </Box>
         </Stack>
        </Popover>
        </Grid>
        </Grid>
        <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>  
        </Paper>
        <Paper sx={{p:2}} variant='outlined'>
        <Grid container spacing={6}>
        <Grid item>
        <Typography>User + Avatar</Typography>
        </Grid>
        <Grid item>
        <Typography>02/12/2019</Typography>
        </Grid>
        <Grid item sx={{ml:'auto'}}>
          <Button onClick={handleClick}>
          <MoreHorizIcon/>
          </Button>
          <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Stack sx={{p:1}}>
         <Box sx={{display: 'flex', gap: '5px', py: '0.5rem'}}>
         <EditIcon />
         <Typography>Edit comment</Typography>
         </Box>
         <Box sx={{display: 'flex', gap: '5px', py: '0.5rem'}}>
         <DeleteIcon />
         <Typography>Delete comment</Typography>
         </Box>
         </Stack>
        </Popover>
        </Grid>
        </Grid>
        <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>  
        </Paper>
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




 