import React, { useState } from 'react'
import Menu from '../Home/Menu/Menu'
import ChatContainer from './ChatContainer';
import MessagesUsers from './MessagesUsers';
import { BsEnvelopePlus } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import style from "../../style.module.css"
import { useUserInfo } from '../../context/UserInfoContext';
import { useUsers } from '../../context/UsersContext';
import SendPost from '../Home/Posts/SendPost';
function Messages({ setPostContainer}) {
    const {userInfo} = useUserInfo()
    const [selectedUser, setSelectedUser] = useState({})
    const [messagesUser, setMessagesUser] = useState(false)
  return (
    <>
    <div>
        <MessagesUsers messagesUser={messagesUser} setMessagesUser={setMessagesUser}  setSelectedUser={setSelectedUser} />
    </div>
     <div>
        <Menu  setPostContainer={setPostContainer}/>
        <div className={style.messagesPages} >
            <div>
                <div >
                    <div  className={style.messagesHeader}>
                        <span>Mesajlar</span>
                        <div>
                            <IoSettingsOutline />
                            <BsEnvelopePlus onClick={() =>setMessagesUser(true)} />
                        </div>
                    </div>
                    <div className={style.messageInput}>
                        <input placeholder='Direk Mesajlarda Ara' />
                        <IoIosSearch />
                    </div>
                    <div>
                        <ul >
                            <li >
                                <div>
                                    <img style={{width:"40px", objectFit:"contain"}} src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt='Profile Picture'/>
                                </div>
                                <div>
                                    <div>
                                        <span style={{fontWeight:700}}>{userInfo.userName} {userInfo.userSurname}</span>
                                        <span style={{color: "rgb(92, 91, 91)"}}>  @{userInfo.userNick}</span>
                                    </div>
                                    <div>
                                        message
                                    </div>
                                </div>
                            </li>
                            <li >
                                <div>
                                    <img style={{width:"40px", objectFit:"contain"}} src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt='Profile Picture'/>
                                </div>
                                <div>
                                    <div>
                                        <span style={{fontWeight:700}}>{userInfo.userName} {userInfo.userSurname}</span>
                                        <span style={{color: "rgb(92, 91, 91)"}}>  @{userInfo.userNick}</span>
                                    </div>
                                    <div>
                                        message
                                    </div>
                                </div>
                            </li>
                            <li >
                                <div>
                                    <img style={{width:"40px", objectFit:"contain"}} src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt='Profile Picture'/>
                                </div>
                                <div>
                                    <div>
                                        <span style={{fontWeight:700}}>{userInfo.userName} {userInfo.userSurname}</span>
                                        <span style={{color: "rgb(92, 91, 91)"}}>  @{userInfo.userNick}</span>
                                    </div>
                                    <div>
                                        message
                                    </div>
                                </div>
                            </li>
                            <li >
                                <div>
                                    <img style={{width:"40px", objectFit:"contain"}} src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt='Profile Picture'/>
                                </div>
                                <div>
                                    <div>
                                        <span style={{fontWeight:700}}>{userInfo.userName} {userInfo.userSurname}</span>
                                        <span style={{color: "rgb(92, 91, 91)"}}>  @{userInfo.userNick}</span>
                                    </div>
                                    <div>
                                        message
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} messagesUser={messagesUser} setMessagesUser={setMessagesUser}/>
        </div>
    </div>
    </>
  )
}

export default Messages
