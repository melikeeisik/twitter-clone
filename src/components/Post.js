import React from 'react'
import style from "../style.module.css"
import { useUserInfo } from '../context/UserInfoContext'
function Post({ post}) {
  return (
    <div className={style.postBox}>
        <div className={style.userProfile}>
            <img  src={`https://api.multiavatar.com/${post.userNick}.png`}/>
        </div>
        <div className={style.postContainer}>
            <div className={style.userNameBox}>
                <span style={{fontWeight:700}}>{post.userName}</span>
                <span style={{fontWeight:700}}>{post.userSurname}</span>
                <span style={{color:"#5c5b5b"}}>@{post.userNick}</span>
            </div>
            <div className={style.userPostBox}>
                <span>{post.userPost}</span>
            </div>
        </div>
    </div>
  )
}

export default Post
