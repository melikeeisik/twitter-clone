import { createContext, useContext} from "react";
import { doc, setDoc,getDoc  } from "@firebase/firestore";
import { db } from "../firebase";

const PostCommentContext = createContext();

export const PostCommentsProvider = ({ children }) => {

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
                      userSurname: user.userSurname,
                      userNick:user.userNick
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
                console.log(commentsById)
                return commentsById;
            } else {
                console.log("Belirtilen postId ile eşleşen belge bulunamadı.");
            }
        } catch (error) {
            console.error("Yorumlar getirilirken hata oluştu: ", error);
        }
    };

    const values = {addComment, getCommentsByPostId };

    return (
        <PostCommentContext.Provider value={values}>
            {children}
        </PostCommentContext.Provider>
    );
};

export const useComments = () => useContext(PostCommentContext);
