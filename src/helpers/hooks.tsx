import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IndexInterface } from "./types";
import { produceDefaultErrorPairs } from "./utils";


export const useErrorStates = function(errorParameters: string[]){
    
    const defaultErrors = produceDefaultErrorPairs(errorParameters); 
    const [errors, setErrors] = useState(Object.fromEntries(defaultErrors));
    
    return [errors,setErrors]
};


export const useIndexData = function(){
    return useOutletContext<IndexInterface>()
}