import React, { useEffect, useState } from 'react'
import style from "../../style.module.css"
import { useUserInfo } from '../../context/UserInfoContext';
import { VscSend } from "react-icons/vsc";
import { useMessages } from '../../context/MessagesContext';
function ChatContainer({selectedUser,pageVisible,setPageVisible}) {
    const {userInfo} = useUserInfo()
    const {getMessages,sendMessages} = useMessages()
    const [inputMessage,setInputMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMessages(selectedUser.id, userInfo.id);
            setMessages(data)
        };
        fetchData();
    }, [selectedUser, userInfo]);

    
    const handleSendMessage = () =>{
        const messageInfo = {
            senderId:selectedUser.id,
            receiverId:userInfo.id,
            message:inputMessage
        }
        sendMessages(messageInfo)
        setInputMessage("")
        setMessages(prev => [...prev, messageInfo])
    }


  return (
    <>
        {
           (Object.keys(selectedUser).length === 0) && 
            <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"start", height:"100vh", paddingLeft:"200px", borderLeft:"1px solid  #3e3d3d"}}>
                <h1>Mesaj seç</h1>
                <span style={{color: "rgb(92, 91, 91)", marginBottom:20}}>Bir kullanıcı seçerek sohbet başlat</span>
                <button onClick={()=>setPageVisible(true)} style={{padding:"17px 40px", borderRadius:"30px", border:"none", backgroundColor:"#1d9bf0", color:"#fff", fontWeight:700, fontSize:17}}>Yeni mesaj</button>
            </div>
        }
        {
            Object.keys(selectedUser).length > 0 &&
            
             <div  className={style.chatContainer}>
                <div style={{backgroundColor:pageVisible?"rgba(91, 112, 121, 0)":""}}  className={style.chatHeader}>
                    <img style={{width:"40px", objectFit:"contain"}} src={`https://api.multiavatar.com/${selectedUser.userNick}.png`} alt='Profile Picture'/>
                    <span style={{fontWeight:700}}>{selectedUser.userName} {selectedUser.userSurname}</span>
                </div>
                <div >
                    <div className={style.chatBox}>
                        <ul>
                            {
                                !messages.length==0 && 
                                messages.map((message , item) =>{
                                    return(
                                        <li key={item} className={message.receiverId == userInfo.id ? style.outgoingMessageLi : style.incomingMessageLi}>
                                            <div  className={message.receiverId == userInfo.id ? style.outgoingMessage : style.incomingMessage}>
                                                {message.message}
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={style.chatInput}>
                        <div onClick={handleSendMessage}>
                            <VscSend />
                        </div>
                        <input value={inputMessage} placeholder='Yeni bir mesaja başla' onChange={(e) =>setInputMessage(e.target.value)} />
                    </div>
                </div>
            </div> 
        }           
    </>
  )
}

export default ChatContainer
