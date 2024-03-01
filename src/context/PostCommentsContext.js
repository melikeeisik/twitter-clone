import { createContext, useContext, useState } from 'react';
import { doc, setDoc, getDoc, collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
const PostCommentContext = createContext();

export const PostCommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({});

  const addComment = async (postId, comment, user, date, time) => {
    const commentRef = doc(db, 'comments', `${postId}`);
    try {
      const docSnap = await getDoc(commentRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const commentsObj = data.comments || {};

        if (commentsObj[user.userNick]) {
          commentsObj[user.userNick].push({
            comment: comment,
            userName: user.userName,
            userSurname: user.userSurname,
            userNick: user.userNick,
            commentDate: {
              commentDay: date,
              commentTime: time
            }
          });
        } else {
          commentsObj[user.userNick] = [
            {
              comment: comment,
              userName: user.userName,
              userSurname: user.userSurname,
              userNick: user.userNick,
              commentDate: {
                commentDay: date,
                commentTime: time
              }
            }
          ];
        }
        await setDoc(
          commentRef,
          {
            comments: commentsObj
          },
          { merge: true }
        );
        setComments(commentsObj);
      } else {
        const initialComments = {};
        initialComments[user.userNick] = [
          {
            comment: comment,
            userName: user.userName,
            userSurname: user.userSurname,
            userNick: user.userNick,
            commentDate: {
              commentDay: date,
              commentTime: time
            }
          }
        ];
        await setDoc(commentRef, {
          comments: initialComments
        });
        setComments(initialComments);
      }
    } catch (error) {
      console.error('Yorum eklenirken hata oluştu: ', error);
    }
  };

  const getCommentsByPostId = async (postId) => {
    try {
      const commentRef = doc(db, 'comments', postId);
      const docSnap = await getDoc(commentRef);

      if (docSnap.exists()) {
        const commentData = docSnap.data();
        const commentsById = commentData.comments || [];
        setComments(commentsById);
      } else {
        console.log('Belirtilen postId ile eşleşen belge bulunamadı.');
      }
    } catch (error) {
      console.error('Yorumlar getirilirken hata oluştu: ', error);
    }
  };

  const values = { addComment, getCommentsByPostId, comments, setComments };

  return (
    <PostCommentContext.Provider value={values}>
      {children}
    </PostCommentContext.Provider>
  );
};

export const useComments = () => useContext(PostCommentContext);
