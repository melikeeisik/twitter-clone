import React, { useState } from 'react';
import Menu from '../../components/Menu';
import ChatContainer from '../../components/ChatContainer';
import MessagesUsers from '../../components/MessagesUsers';
import { BsEnvelopePlus } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import style from './messages.module.css';
import { useUserInfo } from '../../context/UserInfoContext';

function Messages({ setPostContainer }) {
  const { userInfo } = useUserInfo();
  const [selectedUser, setSelectedUser] = useState({});
  const [messagesUser, setMessagesUser] = useState(false);
  return (
    <>
      <div>
        <MessagesUsers
          messagesUser={messagesUser}
          setMessagesUser={setMessagesUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
      <div>
        <Menu setPostContainer={setPostContainer} />
        <div className={style.messagesPages}>
          <div>
            <div>
              <div className={style.messagesHeader}>
                <span>Mesajlar</span>
                <div>
                  <IoSettingsOutline />
                  <BsEnvelopePlus onClick={() => setMessagesUser(true)} />
                </div>
              </div>
              <div className={style.messageInput}>
                <input placeholder="Direk Mesajlarda Ara" />
                <IoIosSearch />
              </div>
              <div className={style.messagesBox}>
                <ul>
                  <li>
                    <img
                      src={`https://api.multiavatar.com/${userInfo.userNick}.png`}
                      alt="Profile Picture"
                    />
                    <div>
                      <div>
                        <span className={style.userName}>
                          {userInfo.userName} {userInfo.userSurname}
                        </span>
                        <span className={style.userNick}>
                          @{userInfo.userNick}
                        </span>
                      </div>
                      <div>message</div>
                    </div>
                  </li>
                  <li>
                    <img
                      src={`https://api.multiavatar.com/${userInfo.userNick}.png`}
                      alt="Profile Picture"
                    />
                    <div>
                      <div>
                        <span className={style.userName}>
                          {userInfo.userName} {userInfo.userSurname}
                        </span>
                        <span className={style.userNick}>
                          @{userInfo.userNick}
                        </span>
                      </div>
                      <div>message</div>
                    </div>
                  </li>
                  <li>
                    <img
                      src={`https://api.multiavatar.com/${userInfo.userNick}.png`}
                      alt="Profile Picture"
                    />
                    <div>
                      <div>
                        <span className={style.userName}>
                          {userInfo.userName} {userInfo.userSurname}
                        </span>
                        <span className={style.userNick}>
                          @{userInfo.userNick}
                        </span>
                      </div>
                      <div>message</div>
                    </div>
                  </li>
                  <li>
                    <img
                      src={`https://api.multiavatar.com/${userInfo.userNick}.png`}
                      alt="Profile Picture"
                    />
                    <div>
                      <span className={style.userName}>
                        {userInfo.userName} {userInfo.userSurname}
                      </span>
                      <span className={style.userNick}>
                        @{userInfo.userNick}
                      </span>
                      <div>message</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ChatContainer
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            messagesUser={messagesUser}
            setMessagesUser={setMessagesUser}
          />
        </div>
      </div>
    </>
  );
}

export default Messages;
