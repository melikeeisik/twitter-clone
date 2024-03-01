import React, { useEffect, useState } from 'react';
import { useComments } from '../../context/PostCommentsContext';
import style from './postcomment.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRetweet,
  faChartSimple,
  faArrowUpFromBracket,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {
  faComment,
  faHeart,
  faBookmark
} from '@fortawesome/free-regular-svg-icons';
library.add(
  faComment,
  faRetweet,
  faHeart,
  faChartSimple,
  faArrowUpFromBracket,
  faBookmark,
  faXmark
);

function PostComment({ postId }) {
  const { getCommentsByPostId, comments, setComments } = useComments();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCommentsByPostId(postId);
      } catch (error) {
        console.error('Yorumlar getirilirken hata oluştu: x', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setComments('');
  }, [postId]);

  return (
    <>
      <ul className={style.commentList}>
        {comments &&
          Object.values(comments).map((value, index) => (
            <li key={index}>
              <ul className={style.comments}>
                {value.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <div className={style.commentContainer}>
                      <img
                        src={`https://api.multiavatar.com/${item.userNick}.png`}
                        alt={`${item.userNick} Profil Resmi`}
                      />
                      <div className={style.commentBox}>
                        <div>
                          <div className={style.userBox}>
                            <span className={style.userName}>
                              {item.userName} {item.userSurname}{' '}
                            </span>
                            <span className={style.userNick}>
                              @{item.userNick} • {item.commentDate.commentDay}
                            </span>
                          </div>
                          <div className={style.commentText}>
                            {item.comment}
                          </div>
                        </div>
                        <div className={style.commentReaction}>
                          <FontAwesomeIcon icon="fa-regular fa-comment" />
                          <FontAwesomeIcon icon="fa-solid fa-retweet" />
                          <FontAwesomeIcon icon="fa-regular fa-heart" />
                          <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                          <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
}

export default PostComment;
