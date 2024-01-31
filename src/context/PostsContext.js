import { createContext, useContext, useEffect, useState } from "react";
import {addDoc, collection , getDocs} from "@firebase/firestore"
import {db} from "../firebase";

const PostsContext = createContext();

export const PostsProvider = ({children}) =>{

    const [allPosts, setAllPosts] = useState([])

    useEffect(() =>{
        const fetchPost = async () => {
          await getDocs(collection(db, "posts"))
              .then((querySnapshot)=>{               
                  const newData = querySnapshot.docs
                      .map((doc) => ({...doc.data(), id:doc.id }));
                      setAllPosts(newData)
              })
        }
        fetchPost()
      }, [])

    const addPosts = (newData) => {
        const posts = collection(db, "posts")
        addDoc(posts, newData)
        
    };

    const values = {allPosts,addPosts} 


    return(
        <PostsContext.Provider value={values}>
            {children}
        </PostsContext.Provider>
    )
}


export const usePosts =  () => useContext(PostsContext)