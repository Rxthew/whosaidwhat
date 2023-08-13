import { PostsType } from "./types";
import React from "react";


export const extractPostById = function(id:string, posts:PostsType){
    const post = posts.find(post => post._id === id)
    return post
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

export const produceDefaultNotificationStatus = function(){

    const _convertNotificationToAction = function(key: string){
        return {
            type: key,
            status: false
        }
    };

    const notification = function(){
        return {
            'Add Comment Notify': {message: 'Commen successfully added.' ,status: false}, 
            'Delete Comment Notify': {message: 'Commen successfully deleted.' ,status: false}, 
            'Edit Comment Notify': {message: 'Commen successfully modified.' ,status: false}
        }
    };

    const dispatch = function(){
        const defaultKeys = Object.keys(notification());
        const defaultStatusesCollection = defaultKeys.map(_convertNotificationToAction);
        const defaultStatuses = Object.assign({}, ...defaultStatusesCollection);
        return defaultStatuses


    };

    return {
        dispatch,
        notification,
    }
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

