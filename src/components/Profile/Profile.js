import React, { useEffect, useState } from 'react'
import style from "../../style.module.css"
import Menu from '../Home/Menu/Menu'
import Agenda from '../Home/Agenda/Agenda'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./tabstyle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { useUsers } from '../../context/UsersContext'
import { useUserInfo } from '../../context/UserInfoContext'
library.add(faArrowLeft)
function Profile() {
  const {userList} = useUsers()
  const userNickName = useParams()
  console.log(userList)
  const {userInfo} = useUserInfo()
  useEffect (() =>{
    
   // user = userList.find(user => user.userNick == userNickName.userNick)
  }, [userNickName]) 

  return (
    <div >
       <Menu/>
        <div className={style.postAndAgendaPart}>
          <div className={style.profilePageContainer}>
            <div className={style.profileHeader}>
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
              <span style={{fontWeight:700, fontSize:"19px"}}>{userInfo.userName} {userInfo.userSurname}</span>
            </div>
            <div>
              <div className={style.userCoverImg}></div>
              <div className={style.userInfoContainer}>
                <div className={style.profilePicture}>
                  <img style={{width:"130px", objectFit:"contain"}} src={`https://api.multiavatar.com/${userInfo.userNick}.png`} />
                </div>
                <div style={{width:"100%", display:"flex", justifyContent:"flex-end"}}>
                  <button>Profili düzenle</button>
                </div>  
                <div className={style.profileInfoBox}>
                  <span>{userInfo.userName} {userInfo.userSurname}</span>
                  <span style={{color: "rgb(92, 91, 91)"}}>@{userInfo.userNick}</span>
                  <span style={{color: "rgb(92, 91, 91)", paddingTop:"20px"}}>katılma tarihi</span>
                  <span style={{color: "rgb(92, 91, 91)", paddingTop:"20px"}}><span style={{color:"#fff" ,fontWeight:700,}}>1</span> Takip edilen <span style={{color:"#fff",fontWeight:700,}}>1</span> Takipçi</span>
                </div>
                <div>
                  <Tabs className={style.tabs}>
                    <TabList>
                    <Tab>Gönderiler</Tab>
                    <Tab>Yanıtlar</Tab>
                    <Tab>Öne Çıkanlar</Tab>
                    <Tab>Medya</Tab>
                    <Tab>Beğeni</Tab>
                    </TabList>

                    <TabPanel>
                    <h2>Any content 1</h2>
                    </TabPanel>
                    <TabPanel>
                    <h2>Any content 2</h2>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <Agenda/>
        </div>
    </div>
  )
}

export default Profile
