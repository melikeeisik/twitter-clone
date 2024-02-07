import { createContext, useContext, useState, useEffect } from "react";
import { addDoc, collection, getDocs, doc, setDoc,updateDoc, arrayUnion,getDoc  } from "@firebase/firestore";
import { db } from "../firebase";

const PostCommentContext = createContext();

export const PostCommentsProvider = ({ children }) => {
    const [postComments, setPostComments] = useState([]);

      const addComment = async (postId, comment, user) => {
          const commentRef = doc(db, "comments", `${postId}`);
          try {
              const docSnap = await getDoc(commentRef);
              if (docSnap.exists()) {
                  const data = docSnap.data();
                  const commentsObj = data.comments || {}; 

                  if (commentsObj[user.userNick]) {
                      commentsObj[user.userNick].push({ 
                          comment: comment,
                          userName: user.userName,
                          userSurname: user.userSurname
                      });
                  } else {

                      commentsObj[user.userNick] = [{
                          comment: comment,
                          userName: user.userName,
                          userSurname: user.userSurname
                      }];
                  }
                  await setDoc(commentRef, {
                      comments: commentsObj
                  }, { merge: true });
                }
                else {
                  const initialComments = {};
                  initialComments[user.userNick] = [{
                      comment: comment,
                      userName: user.userName,
                      userSurname: user.userSurname
                  }];
                  await setDoc(commentRef, {
                      comments: initialComments
                  });
              }
          } catch (error) {
              console.error("Yorum eklenirken hata oluştu: ", error);
          }
      };
    
      const getCommentsByPostId = async (postId) => {
        try {
            const commentRef = doc(db, "comments", postId);
            const docSnap = await getDoc(commentRef);
    
            if (docSnap.exists()) {
                const commentData = docSnap.data();
                const commentsById = commentData.comments || [];
    
                setPostComments(commentsById);
            } else {
                console.log("Belirtilen postId ile eşleşen belge bulunamadı.");
            }
        } catch (error) {
            console.error("Yorumlar getirilirken hata oluştu: ", error);
        }
    };

    const values = { postComments,addComment, getCommentsByPostId };

    return (
        <PostCommentContext.Provider value={values}>
            {children}
        </PostCommentContext.Provider>
    );
};

export const useComments = () => useContext(PostCommentContext);
