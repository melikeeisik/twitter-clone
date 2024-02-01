import React from 'react'
import style from "../style.module.css"
function Post({ post}) {
  return (
    <div className={style.postBox}>
        <div className={style.userInfoBox}>
            <div className={style.userProfile}>
                <img  src={`https://api.multiavatar.com/${post.userNick}.png`}/>
            </div>
            <div className={style.userNameBox}>
                <span style={{fontWeight:700}}>{post.userName}</span>
                <span style={{fontWeight:700}}>{post.userSurname}</span>
                <span style={{color:"#5c5b5b"}}>@{post.userNick}</span>
            </div>
        </div>
        <div className={style.userPostBox}>
            <p>{post.userPost}</p>
        </div>
    </div>
  )
}

export default Post
