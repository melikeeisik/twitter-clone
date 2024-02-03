import { createContext, useContext, useEffect, useState } from "react";
import {addDoc, collection , getDocs} from "@firebase/firestore"
import {db} from "../firebase";
import { storage } from "../firebase";
import { ref , uploadBytes} from "firebase/storage";
import { v4 } from "uuid";
const PostsContext = createContext();

export const PostsProvider = ({children}) =>{
    const posts = collection(db, "posts")
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
        addDoc(posts, newData)
        setAllPosts([...allPosts, newData])
        
    };
    
    const addImgPosts = async (newData, user) => {
        const storageRef = ref(storage, `images/${newData.postImg.name }`);
        await uploadBytes(storageRef, newData.postImg).then(() =>{
            console.log("yes")
        });

        const postInfo = {
            userName:user.userName,
            userSurname: user.userSurname,
            userNick:user.userNick,
            userPost:{
                postText: newData.postText,
                postImg:`images/${newData.postImg.name }`,
            }
          
        }
        addDoc(posts, postInfo);
        setAllPosts([...allPosts, postInfo])
    };
      
      
    const values = {allPosts,addPosts,addImgPosts} 


    return(
        <PostsContext.Provider value={values}>
            {children}
        </PostsContext.Provider>
    )
}


export const usePosts =  () => useContext(PostsContext)