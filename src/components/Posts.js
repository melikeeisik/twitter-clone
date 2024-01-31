import React from 'react'
import style from "../style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faPhotoFilm, faListUl, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile, faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { useUserInfo } from '../context/UserInfoContext'
library.add(faGear,faPhotoFilm,faListUl,faFaceSmile,faCalendarDays,faLocationDot)
function Posts() {
  const {userInfo} = useUserInfo()
  return (
    <div className={style.posts}>
        <div className={style.postsHeader}>
          <span>Sana özel</span>
          <span>Takip edilenler</span>
          <span><FontAwesomeIcon icon="fa-solid fa-gear" /></span>
        </div>
        <div className={style.postPart}>
          <div className={style.createPost}>
            <div className={style.profileImgContainer}>
                <img  src={`https://api.multiavatar.com/${userInfo.userNick}.png`}/>
            </div>
            <textarea placeholder='Neler oluyor?'></textarea>
            <div className={style.categories}>
              <ul>
                <li><FontAwesomeIcon icon="fa-solid fa-photo-film" /></li>
                <li><FontAwesomeIcon icon="fa-solid fa-list-ul" /></li>
                <li><FontAwesomeIcon icon="fa-regular fa-face-smile" /></li>
                <li><FontAwesomeIcon icon="fa-regular fa-calendar-days" /></li>
                <li><FontAwesomeIcon icon="fa-solid fa-location-dot" /></li>
              </ul>
            </div>
            <button className={style.send}>Gönder</button>
          </div>
          <div className={style.postsList}>

          </div>
        </div>
    </div>

  )
}

export default Posts
