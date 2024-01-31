import { createContext, useContext, useEffect, useState } from "react";

const UserInfoContext = createContext();

export const UserInfoProvider = ({children}) =>{
    const [user, setUser] = useState("")
    const activeUser = JSON.parse(localStorage.getItem("user")) || []
    
    useEffect(() =>{
        setUser(activeUser)
    }, [activeUser])

    const userInfo = {user} 


    return(
        <UserInfoContext.Provider value={userInfo}>
            {children}
        </UserInfoContext.Provider>
    )
}


export const useUserInfo = () => useContext(UserInfoContext)