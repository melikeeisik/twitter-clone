import React, { useEffect, useState } from 'react'
import style from "../../style.module.css"
import { useUserInfo } from '../../context/UserInfoContext';
import { VscSend } from "react-icons/vsc";
import { useMessages } from '../../context/MessagesContext';
import {io} from "socket.io-client"
import MessagesUsers from './MessagesUsers';

function ChatContainer({selectedUser,setSelectedUser,messagesUser,setMessagesUser}) {
    const {userInfo} = useUserInfo()
    const {getMessages,sendMessages} = useMessages()
    const [inputMessage,setInputMessage] = useState("")
    const [messages, setMessages] = useState([])
    const socket = io('http://localhost:8090', {
        path: '/ws'
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMessages(selectedUser.id, userInfo.id);
            setMessages(data)
        };
        fetchData();
    }, [selectedUser, userInfo]);

    console.log("socket",socket)

    useEffect(() =>{
        const socket = new WebSocket('ws://localhost:8090/ws');
        socket.onmessage = function(event) {
        const message = JSON.parse(event.data);
        console.log(message)
    // Gelen mesajları işleyin
        };
        /*
        console.log("useeffect")
        socket.on('/messages/topic', message => {
            console.log("chat response")
            setMessages([prev => [...prev, message]]);
        });
        return () => {
            socket.disconnect();
        };*/
    }, [messages])

    
    const handleSendMessage = () =>{
        const messageInfo = {
            senderId:selectedUser.id,
            receiverId:userInfo.id,
            message:inputMessage
        }
        sendMessages(messageInfo)
        socket.emit('chatsend', messageInfo);
        setInputMessage("")
        setMessages(prev => [...prev, messageInfo])
    }


  return (
    <div style={{display:"flex"}}>
        {
           (Object.keys(selectedUser).length === 0) && 
            <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"start", height:"100vh", paddingLeft:"200px", borderLeft:"1px solid  #3e3d3d"}}>
                <h1>Mesaj seç</h1>
                <span style={{color: "rgb(92, 91, 91)", marginBottom:20}}>Bir kullanıcı seçerek sohbet başlat</span>
                <button onClick={()=>setMessagesUser(true)} style={{padding:"17px 40px", borderRadius:"30px", border:"none", backgroundColor:"#1d9bf0", color:"#fff", fontWeight:700, fontSize:17}}>Yeni mesaj</button>
            </div>
        }
        {
            Object.keys(selectedUser).length > 0 &&
            
             <div  className={style.chatContainer}>
                <div className={style.chatHeader}>
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
    </div>
  )
}

export default ChatContainer
