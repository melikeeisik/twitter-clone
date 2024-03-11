import React, { useEffect, useState } from 'react';
import style from './menu.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faHouse,
  faMagnifyingGlass,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import {
  faBell,
  faEnvelope,
  faUser
} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../context/UserInfoContext';

library.add(
  faXTwitter,
  faHouse,
  faMagnifyingGlass,
  faBell,
  faEnvelope,
  faUser,
  faPlus
);

function Menu({ setPostContainer }) {
  const { userInfo, removeUserInfo } = useUserInfo();
  const [logoutDisable, setLogoutDisable] = useState(false);
  const navigate = useNavigate();
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.pathname);
  }, [pageUrl]);

  const handleSend = () =>{
    setPostContainer(true)
  }

  const handleLogOutContainer = () => {
    if (logoutDisable) {
      setLogoutDisable(false);
    } else {
      setLogoutDisable(true);
    }
  };

  const handleLogOut = () => {
    removeUserInfo(userInfo);
    navigate('/');
  };

  return (
    <div className={style.menuBar}>
      <div className={style.menu}>
        <div className={style.menuList}>
          <ul>
            <li>
              <Link to="/home">
                <FontAwesomeIcon
                  className={style.menuIcon}
                  icon="fa-brands fa-x-twitter"
                />
              </Link>
            </li>
            <li>
              <Link to="/home">
                <FontAwesomeIcon icon="fa-solid fa-house" />
                <span style={{ fontWeight: pageUrl == '/home' ? 'bold' : '' }}>
                  Anasayfa
                </span>
              </Link>
            </li>
            <li>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              <span>Keşfet</span>
            </li>
            <li>
              <FontAwesomeIcon icon="fa-regular fa-bell" />
              <span>Bildirimler</span>
            </li>
            <li>
              <Link to="/messages">
                <FontAwesomeIcon icon="fa-regular fa-envelope" />
                <span
                  style={{ fontWeight: pageUrl == '/messages' ? 'bold' : '' }}
                >
                  Mesajlar
                </span>
              </Link>
            </li>
            <li>
              <Link to={`/profile/${userInfo.userNick}`}>
                <FontAwesomeIcon icon="fa-regular fa-user" />
                <span
                  style={{
                    fontWeight:
                      pageUrl == `/profile/${userInfo.userNick}` ? 'bold' : ''
                  }}
                >
                  Profil
                </span>
              </Link>
            </li>
            <li className={style.sendContainer}>
              <div onClick={handleSend} className={style.mobileSend}>
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </div>
              <div>
                <button
                  onClick={handleSend}
                  className={style.webSend}
                >
                  Gönder
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div
          onClick={handleLogOut}
          style={{ display: logoutDisable ? 'flex' : 'none' }}
          className={style.logoutContainer}
        >
          <span>@{userInfo.userNick} hesabından çıkış yap</span>
          <div className={style.arrowDown}></div>
        </div>
        <div onClick={handleLogOutContainer} className={style.profileContainer}>
          <div className={style.profileImgContainer}>
            <img
              src={`https://api.multiavatar.com/${userInfo.userNick}.png`}
              alt={`${userInfo.userNick} Profil Resmi`}
            />
          </div>
          <div className={style.profileNameContainer}>
            <span className={style.userName}>
              {userInfo.userName} {userInfo.userSurname}
            </span>
            <span className={style.userNick}>@{userInfo.userNick}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
