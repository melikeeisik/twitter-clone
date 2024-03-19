import React, { useEffect, useState } from 'react';
import style from './chatcontainer.module.css';
import { useUserInfo } from '../../context/UserInfoContext';
import { VscSend } from 'react-icons/vsc';
import { useMessages } from '../../context/MessagesContext';
import { FaArrowLeft } from "react-icons/fa6";
import { io } from 'socket.io-client';
import MessagesUsers from '../MessagesUsers';

function ChatContainer({
  selectedUser,
  setSelectedUser,
  messagesUser,
  setMessagesUser,
}) {
  const { userInfo } = useUserInfo();
  const { getMessages, sendMessages } = useMessages();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [mobileChatVisible, setMobileChatVisible] = useState(false)

  useEffect(() =>{
    if(window.innerWidth>=800) 
    {
      Object.keys(selectedUser).length===0
      ?setMobileChatVisible(false)
      :setMobileChatVisible(true)
    }
    else{
      setMobileChatVisible(true)
    }
  },[window.innerWidth,selectedUser])

  const handleBack = () =>{
    setMobileChatVisible(false)
    setSelectedUser({})
  }

  /*
  const socket = io('http://localhost:8090', {
    path: '/ws'
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages(selectedUser.id, userInfo.id);
      setMessages(data);
    };
    fetchData();
  }, [selectedUser, userInfo]);

  console.log('socket', socket);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8090/ws');
    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      console.log(message);
      // Gelen mesajları işleyin
    };
    
        console.log("useeffect")
        socket.on('/messages/topic', message => {
            console.log("chat response")
            setMessages([prev => [...prev, message]]);
        });
        return () => {
            socket.disconnect();
        };
  }, [messages]);
  */
  const handleSendMessage = () => {
    const messageInfo = {
      senderId: selectedUser.id,
      receiverId: userInfo.id,
      message: inputMessage
    };
    sendMessages(messageInfo);
    //socket.emit('chatsend', messageInfo);
    setInputMessage('');
    setMessages((prev) => [...prev, messageInfo]);
  };
  
  return (
    <div  className={style.chatContainerPage}>
      {Object.keys(selectedUser).length === 0 && (
        <div className={style.emptyChatContainer}>
          <h1>Mesaj seç</h1>
          <span>Bir kullanıcı seçerek sohbet başlat</span>
          <button onClick={() => setMessagesUser(true)}>Yeni mesaj</button>
        </div>
      )}
      {Object.keys(selectedUser).length > 0 && (
        <div style={{display:mobileChatVisible ? "flex":"none"}} className={style.chatContainer}>
          <div className={style.chatHeader}>
            <FaArrowLeft onClick={handleBack}/>
            <img
              src={`https://api.multiavatar.com/${selectedUser.userNick}.png`}
              alt="Profile Picture"
            />
            <span>
              {selectedUser.userName} {selectedUser.userSurname}
            </span>
          </div>
          <div>
            <div className={style.chatBox}>
              <ul>
                {!messages.length == 0 &&
                  messages.map((message, item) => {
                    return (
                      <li
                        key={item}
                        className={
                          message.receiverId == userInfo.id
                            ? style.outgoingMessageLi
                            : style.incomingMessageLi
                        }
                      >
                        <div
                          className={
                            message.receiverId == userInfo.id
                              ? style.outgoingMessage
                              : style.incomingMessage
                          }
                        >
                          {message.message}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={style.chatInput}>
              <VscSend onClick={handleSendMessage} />
              <input
                value={inputMessage}
                placeholder="Yeni bir mesaja başla"
                onChange={(e) => setInputMessage(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
