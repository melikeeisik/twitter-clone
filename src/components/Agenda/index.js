import React, { useEffect } from 'react';
import style from './agenda.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useUsers } from '../../context/UsersContext';
import arrayShuffle from 'array-shuffle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserInfo } from '../../context/UserInfoContext';
library.add(faMagnifyingGlass);

function Agenda() {
  const { userList } = useUsers();
  const [shuffledUserList, setShuffledUserList] = useState([]);
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    const newList = userList.filter(
      (user) => user.userNick != userInfo.userNick
    );
    setShuffledUserList(arrayShuffle(newList));
  }, [userList]);

  const goProfile = (userNick) => {
    navigate(`/profile/${userNick}`);
  };

  return (
    <div className={style.agendaPage}>
      <div className={style.searchBox}>
        <input type="text" placeholder="Ara" />
        <div>
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </div>
      </div>
      <div className={style.agendaContainer}>
        <span className={style.agendaTitle}>İlgini çekebilecek gündemler</span>
        <div className={style.agendaList}>
          <ul>
            <li>
              <span className={style.agendaCategory}>
                Türkiye tarihinde gündemde
              </span>
              <span className={style.agendaName}>#ösym</span>
            </li>
            <li>
              <span className={style.agendaCategory}>
                Türkiye tarihinde gündemde
              </span>
              <span className={style.agendaName}>#kpss</span>
            </li>
            <li>
              <span className={style.agendaCategory}>
                Türkiye tarihinde gündemde
              </span>
              <span className={style.agendaName}>#deprem</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.followPeople}>
        <span className={style.agendaTitle}>Kimi takip etmeli</span>
        <div className={style.peopleList}>
          <ul>
            {shuffledUserList.length < 3 &&
              shuffledUserList.map((user, index) => (
                <li onClick={() => goProfile(user.userNick)} key={index}>
                  <div className={style.peopleInfo}>
                    <div className={style.peopleimg}>
                      <img
                        src={`https://api.multiavatar.com/${user.userNick}.png`}
                        alt={`${user.userNick} Profil Resmi`}
                      />
                    </div>
                    <div className={style.peopleName}>
                      <span>
                        {user.userName} {user.userSurname}
                      </span>
                      <span>@{user.userNick}</span>
                    </div>
                  </div>
                  <div>
                    <button className={style.peopleFollowBtn}>Takip et</button>
                  </div>
                </li>
              ))}
            {shuffledUserList.length >= 3 &&
              shuffledUserList.slice(0, 3).map((user, index) => (
                <li onClick={() => goProfile(user.userNick)} key={index}>
                  <div className={style.peopleInfo}>
                    <div className={style.peopleimg}>
                      <img
                        src={`https://api.multiavatar.com/${user.userNick}.png`}
                        alt={`Avatar for ${user.userNick}`}
                      />
                    </div>
                    <div className={style.peopleName}>
                      <span>
                        {user.userName} {user.userSurname}
                      </span>
                      <span>@{user.userNick}</span>
                    </div>
                  </div>
                  <div>
                    <button className={style.peopleFollowBtn}>Takip et</button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Agenda;
