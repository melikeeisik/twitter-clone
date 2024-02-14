import { createContext, useContext, useEffect, useState } from "react";
import {addDoc, collection , getDocs} from "@firebase/firestore"
import {db} from "../firebase";
import { storage } from "../firebase";
import { ref , uploadBytes} from "firebase/storage";

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
      
    const addPosts = async (newData, user,date) => {
        let postInfo;
        if(newData.postImg == ""){
            postInfo = {
                userName:user.userName,
                userSurname: user.userSurname,
                userNick:user.userNick,
                postDate :date,
                userPost:{
                    postText: newData.postText,
                    postImg:"",
                },
            }
        }else{
            const storageRef = ref(storage, `images/${newData.postImg.name }`);
            await uploadBytes(storageRef, newData.postImg).then(() =>{
                console.log("yes")
            });
            postInfo = {
                userName:user.userName,
                userSurname: user.userSurname,
                userNick:user.userNick,
                postDate :date,
                userPost:{
                    postText: newData.postText,
                    postImg:`images/${newData.postImg.name }`,
                }     
            }
        }
        addDoc(posts, postInfo);
        setAllPosts([...allPosts, postInfo])
    };
      
      
    const values = {allPosts,addPosts} 


    return(
        <PostsContext.Provider value={values}>
            {children}
        </PostsContext.Provider>
    )
}


export const usePosts =  () => useContext(PostsContext)