import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import style from "./messagesusers.module.css"
import { useUserInfo } from '../../context/UserInfoContext';
import { useUsers } from '../../context/UsersContext';
function MessagesUsers({messagesUser, setMessagesUser,setSelectedUser}) {
    const [users, setUsers] = useState([])
    const [searchName, setSearchName] = useState("")
    const [click, setClick] = useState({})
    const {userInfo} = useUserInfo()
    const {userList} = useUsers()
    useEffect(() =>{
        const searchNameLower = searchName.toLocaleLowerCase()
        const newUsers = userList.filter(user => user.userName.toLocaleLowerCase().includes(searchNameLower) && user.userNick != userInfo.userNick);
        if(newUsers.length > 0){
            setUsers(newUsers)
        }
    }, [searchName])

  return (
    <div style={{display:messagesUser ? "flex": "none"}}  className={style.messageUsersContainer}>
            <div className={style.messageUsers}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                        <div onClick={() => {setMessagesUser(false); setSearchName("");setUsers(userList)}} >
                            <IoCloseOutline style={{fontSize:25}} />
                        </div>
                        <span style={{fontWeight:700, fontSize:20}}>Yeni mesaj</span>
                    </div>
                    <button className={style.selectUserBtn} onClick={() => {setSelectedUser(click);setMessagesUser(false)}}>Sonraki</button>
                </div>
                <div className={style.searchMessageUser}>
                    <input value={searchName} placeholder='Kişi ara' onChange={(e) => setSearchName(e.target.value)} />
                    <IoIosSearch />
                </div>
                <div className={style.searchUserList}>
                <ul >
                    {
                        users.map((user,index) =>{
                            return(
                                <li style={{backgroundColor:user == click ? "#2f3336" : ""}} onClick={() => setClick(user)} key={index}>
                                    <img style={{width:"40px", objectFit:"contain"}} src={`https://api.multiavatar.com/${user.userNick}.png`} alt='Profile Picture' />
                                    <div style={{display:"flex", flexDirection:"column"}}>
                                            <span style={{fontWeight:700}}>{user.userName} {user.userSurname}</span>
                                            <span style={{color: "rgb(92, 91, 91)"}}>  @{user.userNick}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default MessagesUsers
