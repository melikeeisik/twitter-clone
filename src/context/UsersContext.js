import { createContext, useContext, useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase';
const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const users = collection(db, 'users');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      await getDocs(collection(db, 'users')).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setUserList(newData);
      });
    };
    fetchUsers();
  }, []);

  const addUsers = (newUser) => {
    setUserList([...userList, newUser]);
    addDoc(users, newUser);
  };

  const values = { userList, addUsers };

  return (
    <UsersContext.Provider value={values}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
