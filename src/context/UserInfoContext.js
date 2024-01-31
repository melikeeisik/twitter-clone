import { createContext, useContext, useEffect, useState } from "react";

const UserInfoContext = createContext();

export const UserInfoProvider = ({children}) =>{
    const [userInfo, setUserInfo] = useState({})

    useEffect(() =>{
        const storedUser = localStorage.getItem("user");
        const activeUser = storedUser ? JSON.parse(storedUser) : null;
        setUserInfo(activeUser)
    }, [localStorage.getItem("user")])

    const updateUserInfo = (newUser) => {
        setUserInfo(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const values = {userInfo,updateUserInfo} 


    return(
        <UserInfoContext.Provider value={values}>
            {children}
        </UserInfoContext.Provider>
    )
}


export const useUserInfo = () => useContext(UserInfoContext)