import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormDialogProps, PostsType } from "./types";
import React from "react";
import { checkReferred, settleErrors } from "./services";

export const extractPostById = function(id:string, posts:PostsType){
    const post = posts.find(post => post._id === id)
    return post
};

export const produceCommentFormProps = function(){

    const addCommentProps = function(post:string):FormDialogProps{
        
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

        const inputLabel = 'Add Comment';
        const inputText= 'Have your own say on this post.';
        
        const handleSubmitConstructor = function(setErrors: React.Dispatch<React.SetStateAction<Record<string, Record<string, string | boolean>>>>,){

            const addCommentFetcher = async function(data:string){
                const response = await fetch("http://localhost:3000/comment", { //Update url when ready.
                  body: data,
                  headers: {"Accept": "application/json", "Content-Type": "application/json", "Origin": `${window.location.origin}`},
                  method: 'POST', 
                  mode: 'cors',
                  redirect: 'follow', 
                  referrer: window.location.href
                })
                return checkReferred(response) || settleErrors(response,setErrors) 

            };

            const handleSubmit = async function(event: React.FormEvent<HTMLFormElement>){
                event.preventDefault();
                const rawData = new FormData(event.currentTarget);
                post ? rawData.append('post', post) : false;
                const data = JSON.stringify(Object.fromEntries(rawData.entries()));
                await addCommentFetcher(data)
            
            };

            return handleSubmit

        }

        return {
            button, 
            delete: false,
            handleSubmitConstructor,
            inputLabel,
            inputText
        }

    };   

    const deleteCommentProps = function(id: string){

        const button = function(clickHandler: () => void){
            return <Button size='small' variant='text' startIcon={<DeleteIcon />} sx={{mr: 'auto'}} onClick={clickHandler}>Delete comment</Button>  
        };

        const inputLabel = 'Delete Comment';
        const inputText= 'Be absolutely sure you want to delete this comment. Once deleted, it shall be impossible to retrieve.';
        const submitLabel = 'Delete'

        const handleSubmitConstructor = function(setErrors: React.Dispatch<React.SetStateAction<Record<string, Record<string, string | boolean>>>>,){

            const deleteCommentFetcher = async function(data:string){
                const response = await fetch("http://localhost:3000/comment", { //Update url when ready.
                  body: data,
                  headers: {"Accept": "application/json", "Content-Type": "application/json", "Origin": `${window.location.origin}`},
                  method: 'DELETE', 
                  mode: 'cors',
                  redirect: 'follow', 
                  referrer: window.location.href
                })
                return settleErrors(response,setErrors)  
            }

            const handleSubmit = async function(event: React.FormEvent<HTMLFormElement>){
                event.preventDefault();
                const _id = id
                const rawData = new FormData();
                rawData.append('_id', _id);
                const data = JSON.stringify(Object.fromEntries(rawData.entries()));
                await deleteCommentFetcher(data);
                return
            
            };

            return handleSubmit
            
        };

        return  {
            button, 
            delete: true,
            handleSubmitConstructor,
            inputLabel,
            inputText,
            submitLabel
        }
        

    };

    const editCommentProps = function(modifyingKeys:Record<'id' | 'content' | 'post', string>){

        const {content, id, post} = modifyingKeys;

        const button = function(clickHandler: () => void){
            return <Button size='small' variant='text' startIcon={<EditIcon />} sx={{mr:'auto'}} onClick={clickHandler}>Edit comment</Button>
        };

        const inputLabel = 'Edit Comment';
        const inputText= 'Edit your comment in the field below.';

        const handleSubmitConstructor = function(setErrors: React.Dispatch<React.SetStateAction<Record<string, Record<string, string | boolean>>>>,){

            const editCommentFetcher = async function(data:string){
                const response = await fetch("http://localhost:3000/comment", { //Update url when ready.
                  body: data,
                  headers: {"Accept": "application/json", "Content-Type": "application/json", "Origin": `${window.location.origin}`},
                  method: 'POST', 
                  mode: 'cors',
                  redirect: 'follow', 
                  referrer: window.location.href
                })
                return checkReferred(response) || settleErrors(response,setErrors) 

            };

            const handleSubmit = async function(event: React.FormEvent<HTMLFormElement>){
                event.preventDefault();
                const rawData = new FormData(event.currentTarget);
                const _id = id
                rawData.append('_id', _id);
                rawData.append('post', post);
                const data = JSON.stringify(Object.fromEntries(rawData.entries()));
                await editCommentFetcher(data)
            
            };

            return handleSubmit

        }


        return {
            button,
            content, 
            delete: false,
            handleSubmitConstructor,
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
        const defaultErrorsState = Object.fromEntries(defaultErrorsCollection);
        return defaultErrorsState
    }
    errorsSetter(restorer)
};

