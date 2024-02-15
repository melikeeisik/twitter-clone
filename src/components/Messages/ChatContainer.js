import React, { useEffect, useState } from 'react'
import style from "../../style.module.css"
import { useUserInfo } from '../../context/UserInfoContext';
import { VscSend } from "react-icons/vsc";
import { useMessages } from '../../context/MessagesContext';
function ChatContainer({selectedUser,pageVisible,setPageVisible}) {
    const {userInfo} = useUserInfo()
    const {sendMessages} = useMessages()
    const [inputMessage,setInputMessage] = useState("")
    
    const handleSendMessage = () =>{
        const messageInfo = {
            senderId:selectedUser.id,
            receiverId:userInfo.id,
            message:inputMessage
        }
        sendMessages(messageInfo)
        setInputMessage("")
    }

    useEffect(() =>{
        
    })

  return (
    <div className={style.chatContainer}>
        {
           (Object.keys(selectedUser).length === 0) && 
            <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"start", height:"100%", marginLeft:"200px"}}>
                <h1>Mesaj seç</h1>
                <span style={{color: "rgb(92, 91, 91)", marginBottom:20}}>Bir kullanıcı seçerek sohbet başlat</span>
                <button onClick={()=>setPageVisible(true)} style={{padding:"17px 40px", borderRadius:"30px", border:"none", backgroundColor:"#1d9bf0", color:"#fff", fontWeight:700, fontSize:17}}>Yeni mesaj</button>
            </div>
        }
        {
            Object.keys(selectedUser).length > 0 &&
            <>
                <div style={{backgroundColor:pageVisible?"rgba(91, 112, 121, 0)":""}}  className={style.chatHeader}>
                    <img style={{width:"40px", objectFit:"contain"}} src={`https://api.multiavatar.com/${selectedUser.userNick}.png`} alt='Profile Picture'/>
                    <span style={{fontWeight:700}}>{selectedUser.userName} {selectedUser.userSurname}</span>
                </div>
                <div className={style.chatBox}>
                    <div className={style.outgoingMessage}> 
                        {/*className={style.incomingMessage}*/}
                        
                    </div>
                </div>
                <div className={style.chatInput}>
                    <div onClick={handleSendMessage}>
                        <VscSend />
                    </div>
                    <input value={inputMessage} placeholder='Yeni bir mesaja başla' onChange={(e) =>setInputMessage(e.target.value)} />
                </div>
            </>
        }           
    </div>
  )
}

export default ChatContainer
