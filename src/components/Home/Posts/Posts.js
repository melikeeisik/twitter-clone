import React, { useEffect, useState } from 'react'
import style from "../../../style.module.css"
import Post from './Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faPhotoFilm, faListUl, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile, faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { useUserInfo } from '../../../context/UserInfoContext'
import { usePosts } from '../../../context/PostsContext'
library.add(faGear,faPhotoFilm,faListUl,faFaceSmile,faCalendarDays,faLocationDot)

function Posts() {
  const {userInfo} = useUserInfo()
  const {allPosts, addPosts} = usePosts()
  const [sendPost, setSendPost] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(true)

  const handleSendPost = () =>{
    const postInfo = {
      userName:userInfo.userName,
      userSurname: userInfo.userSurname,
      userNick:userInfo.userNick,
      userPost: sendPost,
    }
    addPosts(postInfo)
    setSendPost("")
    setBtnDisabled(true)
  }

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
            <textarea name='sendPost' value={sendPost} onChange={(e) => {setSendPost(e.target.value); setBtnDisabled(false)}} placeholder='Neler oluyor?'></textarea>
            <div className={style.categories}>
              <ul>
                <li><FontAwesomeIcon icon="fa-solid fa-photo-film" /></li>
                <li><FontAwesomeIcon icon="fa-solid fa-list-ul" /></li>
                <li><FontAwesomeIcon icon="fa-regular fa-face-smile" /></li>
                <li><FontAwesomeIcon icon="fa-regular fa-calendar-days" /></li>
                <li><FontAwesomeIcon icon="fa-solid fa-location-dot" /></li>
              </ul>
            </div>
            <button style={{filter: btnDisabled ? "brightness(55%)" : ""}} disabled={btnDisabled} onClick={handleSendPost} className={style.send}>Gönder</button>
          </div>
          <div className={style.postsList}>
              {
                allPosts.map((post, index)=>{
                  return(
                    <Post key={index} post={post}/>
                  )
                })
              }
          </div>
        </div>
    </div>

  )
}

export default Posts