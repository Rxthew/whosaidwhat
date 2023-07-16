import Button from "@mui/material/Button";
import Card  from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import TextField  from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useIndexData } from "./helpers/hooks";
import { CommentInterface } from "./helpers/types";
import { extractPostById } from "./helpers/utils";


interface FormDialogProps {
  buttonLabel: string,
  delete: boolean,
  handleSubmit: () => void
  inputLabel: string,
  inputText: string,
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

    return (
        <Card>
            <Typography>
                {props.content}
            </Typography>
        </Card>
    )
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