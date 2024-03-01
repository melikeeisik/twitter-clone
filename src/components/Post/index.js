import React, { useEffect, useState } from 'react';
import style from './post.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faRetweet,
  faChartSimple,
  faArrowUpFromBracket
} from '@fortawesome/free-solid-svg-icons';
import {
  faComment,
  faHeart,
  faBookmark
} from '@fortawesome/free-regular-svg-icons';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useComments } from '../../context/PostCommentsContext';
library.add(
  faComment,
  faRetweet,
  faHeart,
  faChartSimple,
  faBookmark,
  faArrowUpFromBracket
);
function Post({ post }) {
  const [downloadURL, setDownloadURL] = useState('');
  const navigate = useNavigate();
  const { getCommentsByPostId, comments } = useComments();
  const [totalComments, setTotalComments] = useState([]);
  const [commentInfo, setCommentInfo] = useState({
    commentId: '',
    comment: []
  });

  useEffect(() => {
    const fetchComments = async () => {
      let total = 0;
      try {
        await getCommentsByPostId(post.id);
        if (comments) {
          if (Object.keys(comments).length != 0) {
            console.log('postId', post.id, comments);
            for (const user in comments) {
              if (Object.hasOwnProperty.call(comments, user)) {
                total += comments[user].length;
              }
            }
            console.log('postId', post.id, 'comments[post.userNick]', total);
          }
        }
      } catch (error) {
        console.error('Yorumlar getirilirken hata oluştu:', error);
      }
    };
    fetchComments();
  }, [post.id]);

  const showPost = (postId) => {
    navigate(`/postinfo/${postId}`);
  };

  const goProfile = () => {
    navigate(`/profile/${post.userNick}`);
  };
  useEffect(() => {
    const fetchImageURL = async () => {
      if (post.userPost.postImg) {
        const storage = getStorage();
        const storageRef = ref(storage, post.userPost.postImg);
        try {
          const url = await getDownloadURL(storageRef);
          setDownloadURL(url);
        } catch (error) {
          console.error('Error getting download URL:', error);
        }
      }
    };
    fetchImageURL();
  }, [post]);

  return (
    <div
      onClick={() => navigate(`/postinfopage/${post.id}`)}
      className={style.postBox}
    >
      <div onClick={goProfile} className={style.userProfile}>
        <img
          src={`https://api.multiavatar.com/${post.userNick}.png`}
          alt={`${post.userNick} Profil Resmi`}
        />
      </div>
      <div className={style.postContainer}>
        <div onClick={goProfile} className={style.userNameBox}>
          <span className={style.userName}>
            {post.userName} {post.userSurname}
          </span>
          <span className={style.userNick}>
            @{post.userNick} • {post.postDate.postDay}
          </span>
        </div>
        <div>
          {!post.userPost.postImg && (
            <div className={style.userPostBox}>
              <p>{post.userPost.postText}</p>
            </div>
          )}
          {post.userPost.postImg && (
            <div>
              <span>{post.userPost.postText}</span>
              <div className={style.userPostBoxImg}>
                <img
                  onClick={() => showPost(post.id)}
                  src={downloadURL}
                  alt={`${post.userNick} Postu`}
                />
              </div>
            </div>
          )}
        </div>
        <div className={style.reaction}>
          <div className={style.reactionOne}>
            <FontAwesomeIcon icon="fa-regular fa-comment" />
            <FontAwesomeIcon icon="fa-solid fa-retweet" />
            <FontAwesomeIcon icon="fa-regular fa-heart" />
            <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
          </div>
          <div className={style.reactionTwo}>
            <FontAwesomeIcon icon="fa-regular fa-bookmark" />
            <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
