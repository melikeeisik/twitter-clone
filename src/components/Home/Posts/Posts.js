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
  const {allPosts, addPosts} = usePosts()
  const [sendPost, setSendPost] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [imgPost, setImgPost] = useState("")
  const [isImage, setIsImage] = useState(false)
  const [imgUrl, setImgUrl] = useState("");
  const [xDisable, setXDisable] = useState(true)
  const [date, setDate] = useState("")
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
    const day = new Date();
    const dateDay = day.getDate()
    const month = day.getMonth();
    const year = day.getFullYear();
    const monthsOfYear = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
    const monthName = monthsOfYear[month];
    setDate(`${dateDay} ${monthName.slice(0,3)} ${year}`)
    
    if(isImage){
      const postDetail = {
        postText:sendPost,
        postImg:imgPost,
      }
      addPosts(postDetail, userInfo, date)
    }else{
      setIsImage(false)
      const postDetail = {
        postText:sendPost,
        postImg:"",
      }
      addPosts(postDetail, userInfo,date)
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
                  <img  src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt='Profile Picture'/>
              </div>
              <div style={{display:"flex", flexDirection:"column", flex:"1", paddingRight:"20px"}}>
                <textarea name='sendPost' value={sendPost} onChange={(e) => {setSendPost(e.target.value); setBtnDisabled(false)}} placeholder='Neler oluyor?'></textarea>
                {
                  isImage &&  
                  <div style={{position:"relative"}}>
                    <FontAwesomeIcon onClick={() => {setImgUrl(""); setXDisable(true)}} style={{display: xDisable ? "none" : "block", padding:"8px 10px",backgroundColor:"#252525", borderRadius:"999px", position:"absolute",top:"5px",right:"5px"}} icon="fa-solid fa-xmark" />
                    <img style={{width:"100%" , objectFit:"cover", display:"block", borderRadius:"10px", marginBottom:"10px"}} src={imgUrl} alt={`Profile Picture`}/>
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
