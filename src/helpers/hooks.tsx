import { useState } from "react";
import { produceDefaultErrorPairs } from "./utils";

export const useErrorStates = function(errorParameters: string[]){
    
    const defaultErrors = produceDefaultErrorPairs(errorParameters); 
    const [errors, setErrors] = useState(Object.fromEntries(defaultErrors));
    
    return [errors,setErrors]
};