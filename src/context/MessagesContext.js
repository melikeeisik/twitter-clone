import { createContext, useContext, useEffect, useState } from 'react';

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const getMessages = async (senderId, receiverId) => {
    try {
      const response = await fetch(
        `http://localhost:8090/messages/sender/${senderId}/receiver/${receiverId}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'GET'
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hata oluştu', error);
      return [];
    }
  };

  const sendMessages = (messageInfo) => {
    fetch(
      `http://localhost:8090/messages/send/${messageInfo.senderId}/receiver/${messageInfo.receiverId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(messageInfo)
      }
    )
      .then((data) => {
        console.log('API cevabı:', data);
      })
      .catch((error) => {
        console.error('fetchde hata', error);
      });
  };

  const values = {
    getMessages,
    sendMessages
  };

  return (
    <MessagesContext.Provider value={values}>
      {children}
    </MessagesContext.Provider>
  );
};
export const useMessages = () => useContext(MessagesContext);
