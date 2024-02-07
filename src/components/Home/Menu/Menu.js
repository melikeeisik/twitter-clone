import React, { useState } from 'react'
import style from "../../../style.module.css"
import {  Link } from 'react-router-dom';
import Profile from "../../Profile/Profile"
import Home from '../../Home/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse,faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faBell, faEnvelope, faUser} from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../context/UserInfoContext'

library.add(faXTwitter,faHouse,faMagnifyingGlass,faBell,faEnvelope, faUser, faPlus)

function Menu() {
    const {userInfo, removeUserInfo} = useUserInfo()
    const [logoutDisable, setLogoutDisable] = useState(false)
    const navigate = useNavigate()
    const handleLogOutContainer = () =>{
        if(logoutDisable){
            setLogoutDisable(false)
        }else{
            setLogoutDisable(true)
        }
    }

    const handleLogOut = () =>{
        removeUserInfo(userInfo)
        navigate("/")
    }

  return (
    <div className={style.menuBar}>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}} >
            <div>
                <ul>
                    <li>
                        <Link to="/home">
                            <FontAwesomeIcon style={{fontSize:30}} icon="fa-brands fa-x-twitter" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/home">
                            <FontAwesomeIcon icon="fa-solid fa-house" />
                            <span>Anasayfa</span>
                        </Link>
                    </li>
                    <li>
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                        <span>Keşfet</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon="fa-regular fa-bell" />
                        <span>Bildirimler</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon="fa-regular fa-envelope" />
                        <span>Mesajlar</span>
                    </li>
                    <li>
                        <Link to={`/profile/${userInfo.userNick}`}> 
                            <FontAwesomeIcon icon="fa-regular fa-user" />
                            <span>Profil</span>
                        </Link> 
                    </li>
                    <li>
                        <div className={style.mobileSend}>
                            <FontAwesomeIcon icon="fa-solid fa-plus" />
                        </div>
                        <div >
                            <button className={style.webSend}>Gönder</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div onClick={handleLogOut} style={{display:logoutDisable ? "flex": "none"}} className={style.logoutContainer}>
                <span>@{userInfo.userNick} hesabından çıkış yap</span>
                <div className={style.arrowDown}></div>
            </div>
            <div onClick={handleLogOutContainer}  className={style.profileContainer}>
                <div className={style.profileImgContainer}>
                    <img  src={`https://api.multiavatar.com/${userInfo.userNick}.png`}/>
                </div>
                <div className={style.profileNameContainer}>
                    <span style={{display:"flex", fontWeight:"700", color:"#fff", fontWeight:700}}>{userInfo.userName} {userInfo.userSurname}</span>
                    <span style={{color:"#5c5b5b"}}>@{userInfo.userNick}</span>
                </div>
                
            </div>
      </div>
    </div>
  )
}

export default Menu
