import React, { useEffect, useState } from 'react';
import style from './menu.module.css';
import { Link } from 'react-router-dom';
import { GoHome,GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { FaRegBell,FaEnvelope,FaRegEnvelope  } from "react-icons/fa";
import { BsPerson,BsPersonFill } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../context/UserInfoContext';
import { FaPlus } from "react-icons/fa6";

library.add(
  faXTwitter,
);

function Menu({ setPostContainer }) {
  const { userInfo } = useUserInfo();
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
    navigate("/logout")
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
                {
                  pageUrl == '/home' ? <GoHomeFill/> : <GoHome/>
                }
                <span style={{ fontWeight: pageUrl == '/home' ? 'bold' : '' }}>
                  Anasayfa
                </span>
              </Link>
            </li>
            <li>
              <IoIosSearch/>
              <span>Keşfet</span>
            </li>
            <li>
              <FaRegBell/>
              <span>Bildirimler</span>
            </li>
            <li>
              <Link to="/messages">
                {
                  pageUrl == '/messages' ? <FaEnvelope /> : <FaRegEnvelope />
                }
                <span
                  style={{ fontWeight: pageUrl == '/messages' ? 'bold' : '' }}
                >
                  Mesajlar
                </span>
              </Link>
            </li>
            <li>
              <Link to={`/profile/${userInfo.userNick}`}>
                {
                  pageUrl == `/profile/${userInfo.userNick}` ? <BsPersonFill/> : <BsPerson/>
                }
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
                <FaPlus/>
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
