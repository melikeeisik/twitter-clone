import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './postınfo.module.css';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { usePosts } from '../../context/PostsContext';
import PostComment from '../../components/PostComment';
import { useUserInfo } from '../../context/UserInfoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
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
import { useComments } from '../../context/PostCommentsContext';
library.add(
  faComment,
  faRetweet,
  faHeart,
  faChartSimple,
  faArrowUpFromBracket,
  faBookmark,
  faXmark
);

function PostInfo() {
  const { postId } = useParams();
  const [imgUrl, setImgUrl] = useState('');
  const [post, setPost] = useState({});
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const { allPosts } = usePosts();
  const [comment, setComment] = useState('');
  const { addComment, comments } = useComments();
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const showPost = allPosts.find((post) => post.id == postId);
    if (showPost) {
      setPost(showPost);

      const fetchImageURL = async () => {
        const storage = getStorage();
        const storageRef = ref(storage, showPost.userPost.postImg);
        try {
          const url = await getDownloadURL(storageRef);
          setImgUrl(url);
        } catch (error) {
          console.error('Error getting download URL:', error);
        }
      };
      fetchImageURL();
    }
  }, [post.userPost]);

  useEffect(() => {
    let total = 0;
    for (const user in comments) {
      if (Object.hasOwnProperty.call(comments, user)) {
        total += comments[user].length;
      }
    }
    setTotalComments(total);
  }, [postId, comments]);

  const closePostInfo = () => {
    navigate(-1);
  };

  const handleSendComment = () => {
    const day = new Date();
    const dateDay = day.getDate();
    const month = day.getMonth();
    const year = day.getFullYear();
    const hour = day.getHours();
    const minute = day.getMinutes();
    const second = day.getSeconds();
    const monthsOfYear = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık'
    ];
    const monthName = monthsOfYear[month];
    const currentDate = `${dateDay} ${monthName.slice(0, 3)} ${year}`;
    const currentTime = `${hour}:${minute}:${second}`;

    addComment(postId, comment, userInfo, currentDate, currentTime);
    setComment('');
  };

  return (
    <div className={style.postInfoPage}>
      <div className={style.postImg}>
        <FontAwesomeIcon
          className={style.closePostInfo}
          onClick={closePostInfo}
          icon="fa-solid fa-xmark"
        />
        <div className={style.buttonsContainer}>
          <img src={imgUrl} alt={`${post.userNick} Kapak Resmi`} />
          <div className={style.reactionOnePost}>
            <div className={style.commentBox}>
              <FontAwesomeIcon icon="fa-regular fa-comment" />{' '}
              <span>{totalComments == 0 ? '' : totalComments}</span>
            </div>
            <FontAwesomeIcon icon="fa-solid fa-retweet" />
            <FontAwesomeIcon icon="fa-regular fa-heart" />
            <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
            <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
          </div>
        </div>
      </div>
      <div className={style.postInfo}>
        <div className={style.userInfo}>
          <img
            className={style.userImg}
            src={`https://api.multiavatar.com/${post.userNick}.png`}
            alt={`${post.userNick} Profil Resmi`}
          />
          <div className={style.userBox}>
            <span className={style.userName}>
              {post.userName} {post.userSurname}{' '}
            </span>
            <span className={style.userNick}>@{post.userNick}</span>
          </div>
        </div>
        <div className={style.isPostText}>
          {post.userPost && post.userPost.postText && (
            <span className={style.postText}>{post.userPost.postText}</span>
          )}
          <span className={style.postDate}>
            {post.postDate ? post.postDate.postDay : ''}
          </span>
        </div>
        <div className={style.reactionOne}>
          <div>
            <FontAwesomeIcon icon="fa-regular fa-comment" />{' '}
            <span>{totalComments == 0 ? '' : totalComments}</span>
          </div>
          <FontAwesomeIcon icon="fa-solid fa-retweet" />
          <FontAwesomeIcon icon="fa-regular fa-heart" />
          <FontAwesomeIcon icon="fa-regular fa-bookmark" />
          <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
        </div>
        <div className={style.commentInput}>
          <img
            className={style.userImg}
            src={`https://api.multiavatar.com/${userInfo.userNick}.png`}
            alt={`${post.userNick} Profil Resmi`}
          />
          <input
            name="comment"
            value={comment}
            placeholder="Yanıtını gönder"
            type="text"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleSendComment}
            style={{ filter: comment == '' ? 'brightness(65%)' : '' }}
            disabled={comment == '' ? 'disabled' : ''}
          >
            Yanıtla
          </button>
        </div>
        <PostComment postId={postId} />
      </div>
    </div>
  );
}

export default PostInfo;
