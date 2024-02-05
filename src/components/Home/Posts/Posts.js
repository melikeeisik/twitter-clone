import React, { useEffect, useState } from 'react'
import style from "../../../style.module.css"
import Post from './Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faPhotoFilm, faListUl, faLocationDot,faXmark } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile, faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { useUserInfo } from '../../../context/UserInfoContext'
import { usePosts } from '../../../context/PostsContext'

library.add(faGear,faPhotoFilm,faListUl,faFaceSmile,faCalendarDays,faLocationDot, faXmark)

function Posts() {
  const {userInfo} = useUserInfo()
  const {allPosts, addPosts,addImgPosts} = usePosts()
  const [sendPost, setSendPost] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [imgPost, setImgPost] = useState("")
  const [isImage, setIsImage] = useState(false)
  const [imgUrl, setImgUrl] = useState("");
  const [xDisable, setXDisable] = useState(true)

  console.log(allPosts)

  const handleClickInput = () =>{
    setBtnDisabled(false)
    document.getElementById('fileInput').click();
  }

  const handleFileChange =  (event) => {
    const file = event.target.files[0]
    setImgPost(file);
    setIsImage(true)
    setXDisable(false)
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgUrl(e.target.result);
    }
    reader.readAsDataURL(file);
    }

  const handleSendPost = () =>{
    if(isImage){
      const postDetail = {
        postImg:imgPost,
        postText:sendPost
      }
      addImgPosts(postDetail, userInfo)
    }else{
      setIsImage(false)
      const postInfo = {
        userName:userInfo.userName,
        userSurname: userInfo.userSurname,
        userNick:userInfo.userNick,
        userPost: sendPost,
      }
      addPosts(postInfo)
    }
    setSendPost("")
    setIsImage(false)
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
            <div style={{display:"flex", gap:"15px"}}>
              <div className={style.profileImgContainer}>
                  <img  src={`https://api.multiavatar.com/${userInfo.userNick}.png`}/>
              </div>
              <div style={{display:"flex", flexDirection:"column", flex:"1", paddingRight:"20px"}}>
                <textarea name='sendPost' value={sendPost} onChange={(e) => {setSendPost(e.target.value); setBtnDisabled(false)}} placeholder='Neler oluyor?'></textarea>
                {
                  isImage &&  
                  <div style={{position:"relative"}}>
                    <FontAwesomeIcon onClick={() => {setImgUrl(""); setXDisable(true)}} style={{display: xDisable ? "none" : "block", padding:"8px 10px",backgroundColor:"#252525", borderRadius:"999px", position:"absolute",top:"5px",right:"5px"}} icon="fa-solid fa-xmark" />
                    <img style={{width:"100%" , objectFit:"cover", display:"block", borderRadius:"10px", marginBottom:"10px"}} src={imgUrl}/>
                  </div>
                }
              </div>
            </div>
            <div style={{paddingLeft:"75px", paddingRight:"20px", display:"flex", justifyContent:"space-between", margin:"10px 0px"}}>
              <div className={style.categories}>
                <ul>
                  <li>
                    <button onClick={handleClickInput}><FontAwesomeIcon icon="fa-solid fa-photo-film"/></button>
                    <input type='file' id="fileInput" accept="image/*" onChange={handleFileChange} style={{display:"none"}} />
                  </li>
                  <li><FontAwesomeIcon icon="fa-solid fa-list-ul" /></li>
                  <li><FontAwesomeIcon icon="fa-regular fa-face-smile" /></li>
                  <li><FontAwesomeIcon icon="fa-regular fa-calendar-days" /></li>
                  <li><FontAwesomeIcon icon="fa-solid fa-location-dot" /></li>
                </ul>
              </div>
              <button style={{filter: btnDisabled ? "brightness(55%)" : ""}} disabled={btnDisabled} onClick={handleSendPost} className={style.send}>Gönder</button>
            </div>
          </div>
          <div className={style.postsList}>
              {
                allPosts.map((post, index)=>{
                  return(
                    <Post key={index} post={post} />
                  )
                })
              }
          </div>
        </div>
    </div>

  )
}

export default Posts
