import { createContext, useContext, useEffect, useState } from "react";
import {addDoc, collection , getDocs} from "@firebase/firestore"
import {db} from "../firebase";
const PostCommentContext = createContext();

export const PostCommentsProvider = ({children}) =>{
    const comments = collection(db, "comments")
    const [commentList, setCommentList] = useState([])
    useEffect(() =>{
        const fetchComments = async () => {
            await getDocs(collection(db, "comments"))
                .then((querySnapshot)=>{               
                    const newData = querySnapshot.docs
                        .map((doc) => ({...doc.data(), id:doc.id }));
                        setCommentList(newData)
                })
        }
        fetchComments()
    }, [])

    const values = {commentList} 


    return(
        <PostCommentsProvider.Provider value={values}>
            {children}
        </PostCommentsProvider.Provider>
    )
}

export const useComments = () => useContext(PostCommentContext)