import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PostsType, UserInterface, IndexInterface } from "./types";
import { produceDefaultErrorPairs } from "./utils";


export const useErrorStates = function(errorParameters: string[]){
    
    const defaultErrors = produceDefaultErrorPairs(errorParameters); 
    const [errors, setErrors] = useState(Object.fromEntries(defaultErrors));
    
    return [errors,setErrors]
};


export const useIndexData = function(){
    return useOutletContext<IndexInterface>()
}

export const useFetchIndexData = function(){

    const [user,setUser] = useState<UserInterface | null>(null);
    const [posts, setPosts] = useState<PostsType | null>(null);

    const resetIndexData = function hardReset(){
        setPosts(() => null);
        setUser(() => null)
    };

    useEffect(()=> {

        const checkData = function(){
            return posts && posts.length > 0 && user
        };

        const setFreshUser = function(res:Record<'user' | 'posts',UserInterface | PostsType>){
            const responseUser = res.user;
            setUser(() => Object.assign({}, responseUser as UserInterface))
            return 
        };

        const setFreshPosts = function(res:Record<'user' | 'posts',UserInterface | PostsType>){
            const responsePosts = res.posts;
            setPosts([...responsePosts as PostsType])
            return

        };

        const setFreshIndexData = function(res:Record<'user' | 'posts',UserInterface | PostsType>){
            setFreshUser(res);
            setFreshPosts(res);
            return
        };

        const fetchData = async function(){
            const response = await fetch("update this url when ready", { //Update url when ready.
                headers: {"Accept": "application/json", "Origin": `${window.location.origin}`},
                method: 'GET', 
                mode: 'cors',
              })
            return response.ok ?  setFreshIndexData(await response.json()) : false
        };

        checkData() && fetchData()

        //return statement to clean up

    },[user,posts])



   return {user, posts, resetIndexData, setUser, setPosts}
}