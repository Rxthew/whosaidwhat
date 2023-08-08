import Avatar from '@mui/material/Avatar'
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DateTime } from 'luxon';
import * as React from 'react'; 
import { useParams } from "react-router-dom";
import { useErrorStates, useIndexData } from "./helpers/hooks";
import { CommentInterface, FormDialogProps } from "./helpers/types";
import { extractPostById, produceCommentFormProps } from "./helpers/utils";


const FormDialog = function(props: FormDialogProps){
    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = useErrorStates(['_id', 'content', 'user', 'post']);

    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = props.handleSubmitConstructor(setErrors);

    const FormButton = function(){
      return props.button(handleClickOpen)
    };
  
    return (
      <div>
        <FormButton />
        {errors.general.error && (
        <Typography component="h2" variant="h6" sx={{color: "red"}}>
        Error: {errors.general.msg}
        </Typography>
        )}
        {errors.content.error && (
        <Typography component="h2" variant="h6" sx={{color: "red"}}>
        Error: {errors.content.msg}
        </Typography>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{props.inputLabel}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.inputText}
            </DialogContentText>
            {props.delete || (
              <form id="dialogForm" onSubmit={handleSubmit}>
                <TextField 
                autoFocus
                margin="dense"
                multiline
                id="content"
                name="content"
                label="content"
                type="text"
                fullWidth
                variant="standard"
                value={props.content || ""}
                sx={{whiteSpace:"pre-line"}} 
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
  const { user } = useIndexData();
  
  const isUserCommentOwner = user && props.user && user?._id === props.user?._id;
  const isUserPrivilegedMember = user?.member_status === 'privileged';
  const isUserPrivilegedOwner = isUserCommentOwner && isUserPrivilegedMember;
  const isUserAdminMember = user?.member_status === 'admin'; 


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
  <Box sx={{display: 'flex'}}>
    <Paper sx={{p:2}} variant='outlined'>
      <Grid container spacing={6} wrap='nowrap'>
        <Grid item> 
          <Typography variant='overline'>{props.user?.username || 'Anonymous'}:</Typography>      
        </Grid>
        <Grid item>
          <Typography>{props.date}</Typography>
        </Grid>
        {(isUserAdminMember || isUserPrivilegedOwner) && (
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
              <FormDialog {...editCommentProps({content: props.content, id: props._id, post: props.post})} />
              <FormDialog {...deleteCommentProps(props._id)} />      
            </Stack>
          </Popover>
        
      </Grid>
      )}
      </Grid>
      <Typography>
            {props.content}
      </Typography>  
    </Paper>
  </Box>    
  );   
}; 

const Post = function Post(){
    const { postId }  = useParams();
    const { user, posts } = useIndexData();
    const post = postId && posts && posts.length > 0 ? extractPostById(postId, posts) : null;
    return (
       <>
       <Container>
          {post ? (
              <>
              <Typography component='h1' variant='h4'>{post.title}</Typography>
              <Typography variant='body2' sx={{padding: '1rem', whiteSpace: 'pre-line'}}>
                {post.content}
              </Typography>
              <Divider />
          <Container>
            <Stack spacing={2}>
                ({ (user?.member_status === 'privileged' || user?.member_status === 'admin') &&
                <Grid container spacing={2} sx={{p:2, borderBottom: '1px solid', minWidth:'fit-content'}} wrap='nowrap'>
                  <Grid item>
                    <Avatar sx={{bgcolor:'#1976d2', width: '30px', height:'30px'}}>{user?.username[0].toUpperCase()}</Avatar>
                  </Grid>
                  <Grid item sx={{flexGrow: '1'}}>
                    <Typography>User </Typography>
                  </Grid>
                  <Grid item>
                    <FormDialog {...addCommentProps(postId as string)}/>
                  </Grid>
                </Grid>})
                {post.comments.map((comment)=>
                  <Comment _id={comment._id} content={comment.content} date={comment.date} key={comment._id} post={postId as string} user={comment.user} />
                )}
              </Stack>
            </Container>  
          </>
          ): <Typography>This post is not available right now.</Typography>}
        </Container> 
       </>
    )
};

export default Post
