import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import style from './sendpost.module.css';
import { useUserInfo } from '../../context/UserInfoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGear,
  faPhotoFilm,
  faListUl,
  faLocationDot,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {
  faFaceSmile,
  faCalendarDays
} from '@fortawesome/free-regular-svg-icons';
import { usePosts } from '../../context/PostsContext';
library.add(
  faGear,
  faPhotoFilm,
  faListUl,
  faFaceSmile,
  faCalendarDays,
  faLocationDot,
  faXmark
);

function SendPost({ postContainer, setPostContainer }) {
  const { userInfo } = useUserInfo();
  const [sendPost, setSendPost] = useState('');
  const { addPosts } = usePosts();
  const [imgUrl, setImgUrl] = useState('');
  const [imgPost, setImgPost] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [xDisable, setXDisable] = useState(true);

  const handleClickInput = () => {
    setBtnDisabled(false);
    document.getElementById('fileInput').click();
  };
  const handleSendPost = () => {
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

    if (isImage) {
      const postDetail = {
        postText: sendPost,
        postImg: imgPost
      };
      addPosts(postDetail, userInfo, currentDate, currentTime);
    } else {
      setIsImage(false);
      const postDetail = {
        postText: sendPost,
        postImg: ''
      };
      addPosts(postDetail, userInfo, currentDate, currentTime);
    }
    setSendPost('');
    setIsImage(false);
    setBtnDisabled(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImgPost(file);
    setIsImage(true);
    setXDisable(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {userInfo && (
        <div
          style={{ display: postContainer ? 'flex' : 'none' }}
          className={style.sendPostContainer}
        >
          <div className={style.sendPostBox}>
            <IoCloseSharp
              className={style.closeSendPost}
              onClick={() => {
                setPostContainer(false);
                setIsImage(false);
                setSendPost('');
              }}
            />
            <div className={style.postText}>
              <div className={style.postHeader}>
                <img
                  src={`https://api.multiavatar.com/${userInfo.userNick}.png`}
                  alt="Profile Picture"
                />
                <textarea
                  placeholder="Neler oluyor?"
                  name="sendPost"
                  value={sendPost}
                  onChange={(e) => {
                    setSendPost(e.target.value);
                    setBtnDisabled(false);
                  }}
                />
              </div>
              {isImage && (
                <div className={style.isImage}>
                  <FontAwesomeIcon
                    onClick={() => {
                      setImgUrl('');
                      setXDisable(true);
                      setIsImage(false);
                    }}
                    style={{ display: xDisable ? 'none' : 'block' }}
                    icon="fa-solid fa-xmark"
                  />
                  <img src={imgUrl} alt={`Post Picture`} />
                </div>
              )}
            </div>
            <div className={style.buttonsContainer}>
              <div className={style.categories}>
                <ul>
                  <li>
                    <button onClick={handleClickInput}>
                      <FontAwesomeIcon icon="fa-solid fa-photo-film" />
                    </button>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </li>
                  <li>
                    <FontAwesomeIcon icon="fa-solid fa-list-ul" />
                  </li>
                  <li>
                    <FontAwesomeIcon icon="fa-regular fa-face-smile" />
                  </li>
                  <li>
                    <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                  </li>
                  <li>
                    <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                  </li>
                </ul>
              </div>
              <button
                style={{ filter: btnDisabled ? 'brightness(55%)' : '' }}
                disabled={btnDisabled}
                onClick={() => {
                  handleSendPost();
                  setPostContainer(false);
                }}
                className={style.send}
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SendPost;
