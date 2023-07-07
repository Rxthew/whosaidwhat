
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

