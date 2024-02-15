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
function Messages() {
    const [pageVisible, setPageVisible] = useState(false)
    const {userInfo} = useUserInfo()
    const {userList} = useUsers()

  return (
    <div>
        <Menu pageVisible={pageVisible}/>
        <div style={{display:pageVisible ? "block": "none"}} className={style.messageUsers}>
            <MessagesUsers  userList={userList} setPageVisible={setPageVisible}/>
        </div>
        <div style={{backgroundColor:pageVisible?"rgba(91, 112, 131, 0.4)":""}}  className={style.messagesPages} >
            <div>
                <div >
                    <div style={{backgroundColor:pageVisible?"rgba(91, 112, 131, 0)":""}} className={style.messagesHeader}>
                        <span>Mesajlar</span>
                        <div>
                            <IoSettingsOutline />
                            <BsEnvelopePlus onClick={() =>setPageVisible(true)} />
                        </div>
                    </div>
                    <div className={style.messageInput}>
                        <input style={{backgroundColor:pageVisible?"rgba(91, 112, 131, 0)":""}} placeholder='Direk Mesajlarda Ara' />
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
            <ChatContainer pageVisible={pageVisible} />
        </div>
    </div>
  )
}

export default Messages
