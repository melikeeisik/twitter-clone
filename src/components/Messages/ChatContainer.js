import React from 'react'
import style from "../../style.module.css"
import { useUserInfo } from '../../context/UserInfoContext';
import { VscSend } from "react-icons/vsc";

function ChatContainer() {
    const {userInfo} = useUserInfo()

  return (
    <div className={style.chatContainer}>
            <div  className={style.chatHeader}>
                <img style={{width:"40px", objectFit:"contain"}} src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt='Profile Picture'/>
                <span style={{fontWeight:700}}>{userInfo.userName} {userInfo.userSurname}</span>
            </div>
            <div className={style.chatBox}>
                <div className={style.outgoingMessage}> 
                    {/*className={style.incomingMessage}*/}
                    gregre
                </div>
            </div>
            <div className={style.chatInput}>
                <VscSend />
                <input placeholder='Yeni bir mesaja başla' />
            </div>
        </div>
  )
}

export default ChatContainer
