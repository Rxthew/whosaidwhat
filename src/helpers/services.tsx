import { parseAPIErrors, restoreOriginalErrorState } from "./utils";


export  const checkReferred = function(res:Response){
    return res.redirected

};

export const settleErrors = async function(res:Response, setErrors:React.Dispatch<React.SetStateAction<Record<string,Record<string, string | boolean>>>>){
      
    const response = await res.json();

    const checkForErrors = function(){
      const errorsStatus = 'errors' in response;
      return !errorsStatus
    };

    const settleErrorFlow = function(){
      restoreOriginalErrorState(setErrors);
      const parsedErrors = parseAPIErrors(response);

      const mergeErrors = function(errors:Record<string,Record<string, string | boolean>>){
        return Object.assign({},errors, parsedErrors)
      };

      setErrors(mergeErrors)
      
    }

    return checkForErrors() || settleErrorFlow()

 };