import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import style from "../../style.module.css"
function MessagesUsers({userList,setPageVisible}) {
    const [users, setUsers] = useState([])
    const [searchName, setSearchName] = useState("")

    useEffect(() =>{
        const searchNameLower = searchName.toLocaleLowerCase()
        const newUsers = userList.filter(user => user.userName.toLocaleLowerCase().includes(searchNameLower));
        if(newUsers.length > 0){
            setUsers(newUsers)
        }
    }, [searchName])

  return (
    <div style={{padding:"10px 15px"}}>
      <div >
        <div>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:5}}>
                <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                    <div onClick={() => {setPageVisible(false); setSearchName("");setUsers(userList)}} >
                        <IoCloseOutline style={{fontSize:25}} />
                    </div>
                    <span style={{fontWeight:700, fontSize:20}}>Yeni mesaj</span>
                </div>
                <button style={{padding:"7px 20px", borderRadius:20, backgroundColor:"#fff", border:"1px solid #fff", fontWeight:700, fontSize:14}}>Sonraki</button>
            </div>
            <div className={style.searchMessageUser}>
                <input value={searchName} placeholder='Kişi ara' onChange={(e) => setSearchName(e.target.value)} />
                <IoIosSearch />
            </div>
        </div>
      </div>
      <div>
        <ul style={{margin:0,padding:0,listStyle:"none"}}>
            {
                users.map((user,index) =>{
                    return(
                        <li style={{display:"flex", gap:"10px", padding:"10px 0px"}} key={index}>
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
  )
}

export default MessagesUsers
