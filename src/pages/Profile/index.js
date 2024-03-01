import React, { useEffect, useState } from 'react';
import style from './profile.module.css';
import Menu from '../../components/Menu';
import Agenda from '../../components/Agenda';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './tabstyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useUsers } from '../../context/UsersContext';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../context/PostsContext';
import Post from '../../components/Post';

library.add(faArrowLeft);

function Profile({ setPostContainer }) {
  const userNickName = useParams();
  const [userInfo, setUserInfo] = useState({});
  const { userList } = useUsers();
  const navigate = useNavigate();
  const [usersPost, setUsersPost] = useState([]);
  const { allPosts } = usePosts();

  useEffect(() => {
    if (userList) {
      const showUser = userList.find(
        (user) => user.userNick == userNickName.userNick
      );
      if (showUser) {
        setUserInfo(showUser);
      }
    }
  }, [userNickName]);

  useEffect(() => {
    if (allPosts) {
      const posts = allPosts.filter(
        (post) => post.userNick == userInfo.userNick
      );
      if (posts) {
        setUsersPost(posts);
      }
    }
  }, [userInfo]);

  return (
    <>
      <div>
        <Menu setPostContainer={setPostContainer} />
        <div>
          <div className={style.profilePageContainer}>
            <div className={style.profileHeader}>
              <FontAwesomeIcon
                onClick={() => navigate(-1)}
                icon="fa-solid fa-arrow-left"
              />
              <span>
                {userInfo.userName} {userInfo.userSurname}
              </span>
            </div>
            <div>
              <div className={style.userCoverImg}></div>
              <div className={style.userInfoContainer}>
                <div className={style.profilePicture}>
                  <img
                    src={`https://api.multiavatar.com/${userInfo.userNick}.png`}
                    alt="Profile Picture"
                  />
                </div>
                <div className={style.changeProfile}>
                  <button>Profili düzenle</button>
                </div>
                <div className={style.profileInfoBox}>
                  <span className={style.userName}>
                    {userInfo.userName} {userInfo.userSurname}
                  </span>
                  <span className={style.textColor}>@{userInfo.userNick}</span>
                  <span className={`${style.textColor} ${style.marginTop}`}>
                    {userInfo.userDate} tarihinde katıldı
                  </span>
                  <div className={`${style.textColor} ${style.marginTop} `}>
                    <span className={style.followed}>1</span> Takip edilen
                    <span className={style.followers}>1</span> Takipçi
                  </div>
                </div>
                <div>
                  <Tabs>
                    <TabList>
                      <Tab>Gönderiler</Tab>
                      <Tab>Yanıtlar</Tab>
                      <Tab>Öne Çıkanlar</Tab>
                      <Tab>Medya</Tab>
                      <Tab>Beğeni</Tab>
                    </TabList>
                    <TabPanel>
                      <div style={{ color: '#fff' }}>
                        {usersPost.map((post, index) => {
                          return <Post key={index} post={post} />;
                        })}
                      </div>
                    </TabPanel>
                    <TabPanel></TabPanel>
                    <TabPanel></TabPanel>
                    <TabPanel></TabPanel>
                    <TabPanel></TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <Agenda />
        </div>
      </div>
    </>
  );
}

export default Profile;
