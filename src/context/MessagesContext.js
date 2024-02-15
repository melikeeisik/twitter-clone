import { createContext, useContext, useState } from "react";

const MessagesContext = createContext()

export const MessagesProvider = ({children}) =>{
    const [messages, setMessages] = useState([])
    
    const getMessages = (senderId, receiverId) =>{
        fetch(`http://localhost:8090/messages/sender/${senderId}/receiver/${receiverId}`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(error => console.error("Hata oluştu", error));
        return messages;
    }
    
    const sendMessages = (messageInfo) =>{
        console.log("message", messageInfo)
        fetch(`http://localhost:8090/messages/send/${messageInfo.senderId}/receiver/${messageInfo.receiverId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(messageInfo)
            })
        .then(data => {
            console.log('API cevabı:', data); 
        })
        .catch(error => {
            console.error('fetchde hata', error); 
        });
        setMessages([...messages, messageInfo])
    }

    const values={
        getMessages,
        sendMessages
    }

    return (
        <MessagesContext.Provider value={values}>
            {children}
        </MessagesContext.Provider>
    )

}
export const useMessages = () => useContext(MessagesContext)