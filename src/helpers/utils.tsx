import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormDialogProps, PostsType } from "./types";

export const extractPostById = function(id:string, posts:PostsType){
    const post = posts.find(post => post._id === id)
    return post
};

export const produceCommentFormProps = function(){

    const addCommentProps = function(id: string):FormDialogProps{
        
        const button = function(clickHandler: () => void){
            return (
            <> 
                <Button size='small' variant='contained' endIcon={<AddCircleIcon />} sx={{display: {xs:'inline-flex',sm: 'none'}}} onClick={clickHandler}>
                    Add
                </Button>
                <Button size='small' variant='contained' endIcon={<AddCircleIcon />} sx={{display: {xs: 'none', sm:'inline-flex'}}} onClick={clickHandler}>
                    Add Comment
                </Button>
            </>
            )
        };       

        const handleSubmit = async function(event: React.FormEvent<HTMLFormElement>){
            event.preventDefault();
            const _id = id
            const data = new FormData(event.currentTarget);
            data.append('_id', _id);
            await fetch()
        
        };

        const inputLabel = 'Add Comment';
        const inputText= 'Have your own say on this post.';

        return {
            button, 
            delete: false,
            handleSubmit,
            inputLabel,
            inputText
        }

    };   

    const deleteCommentProps = function(id: string){

        const button = function(clickHandler: () => void){
            return <Button size='small' variant='text' startIcon={<DeleteIcon />} sx={{mr: 'auto'}} onClick={clickHandler}>Delete comment</Button>  
        };

        const handleSubmit = async function(event: React.FormEvent<HTMLFormElement>){
            event.preventDefault();
            const _id = id
            const data = new FormData();
            data.append('_id', _id);
            await fetch()
        
        };

        const inputLabel = 'Delete Comment';
        const inputText= 'Be absolutely sure you want to delete this comment. Once deleted, it shall be impossible to retrieve.';
        const submitLabel = 'Delete'


        return {
            button, 
            delete: true,
            handleSubmit,
            inputLabel,
            inputText,
            submitLabel
        }


    };

    const editCommentProps = function(id: string, content: string){

        const button = function(clickHandler: () => void){
            return <Button size='small' variant='text' startIcon={<EditIcon />} sx={{mr:'auto'}} onClick={clickHandler}>Edit comment</Button>
        };

        const handleSubmit = async function(event: React.FormEvent<HTMLFormElement>){
            event.preventDefault();
            const _id = id
            const data = new FormData(event.currentTarget);
            data.append('_id', _id);
            await fetch()
        
        };

        const inputLabel = 'Edit Comment';
        const inputText= 'Edit your comment in the field below.';


        return {
            button,
            content, 
            delete: false,
            handleSubmit,
            inputLabel,
            inputText,
        }

    };

    return {
        addCommentProps,
        deleteCommentProps,
        editCommentProps,
    }  
};



export const produceDefaultErrorPairs = function(errorKeys:string[]){

    const produceDefaultErrorValue = function(){
        return {
            error : false,
            msg: ''
        }
    };

    const generalError = ['general', produceDefaultErrorValue()]

    return [generalError, ...errorKeys.map(function convertToKeyValues(key){
        return [key, produceDefaultErrorValue()]
    })]

};


export const parseAPIErrors = function(response:Record<'errors',Record<string,string | Record<string,string>>>){

    const errors = response?.errors;
    const keys = Object.keys(errors);

    const convertToErrorInterface = function(errorKey:string){
        return errorKey === 'msg' ? {
            'general': {
                error: true,
                msg: errors[errorKey] as string
            }
        } : {
            [errorKey]: {
                error: true,
                msg: (errors[errorKey] as Record<string,string>)['msg']
            }
        }
    }; 

   const errorsCollection = keys.map(convertToErrorInterface);
   const parsedErrors = Object.assign({}, ...errorsCollection)
   return parsedErrors 

};

export const restoreOriginalErrorState = function(errorsSetter: React.Dispatch<React.SetStateAction<Record<string,Record<string, string | boolean>>>>){
    const restorer = function(errors:Record<string,Record<string, string | boolean>>){
        const parameters = Object.keys(errors);
        const defaultErrorsCollection = produceDefaultErrorPairs(parameters);
        const defaultErrorsState = Object.assign({},...defaultErrorsCollection)
        return defaultErrorsState
    }
    errorsSetter(restorer)
};

