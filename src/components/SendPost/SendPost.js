import React,{useState} from 'react'
import { IoCloseSharp } from "react-icons/io5";
import style from "./sendpost.module.css"
import { useUserInfo } from '../../context/UserInfoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faPhotoFilm, faListUl, faLocationDot,faXmark } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile, faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { usePosts } from '../../context/PostsContext';
library.add(faGear,faPhotoFilm,faListUl,faFaceSmile,faCalendarDays,faLocationDot, faXmark)

function SendPost({postContainer, setPostContainer}) {
    const {userInfo} = useUserInfo()
    const [sendPost, setSendPost] = useState("")
    const {addPosts} = usePosts()
    const [imgUrl, setImgUrl] = useState("");
    const [imgPost, setImgPost] = useState("")
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [isImage, setIsImage] = useState(false)
    const [xDisable, setXDisable] = useState(true)

    const handleClickInput = () =>{
        setBtnDisabled(false)
        document.getElementById('fileInput').click();
    }
    const handleSendPost = () =>{
        const day = new Date();
        const dateDay = day.getDate()
        const month = day.getMonth();
        const year = day.getFullYear();
        const hour = day.getHours();
        const minute = day.getMinutes();
        const second = day.getSeconds();
        const monthsOfYear = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
        const monthName = monthsOfYear[month];
        const currentDate = `${dateDay} ${monthName.slice(0,3)} ${year}`;
        const currentTime = `${hour}:${minute}:${second}`
        
        if(isImage){
            const postDetail = {
            postText:sendPost,
            postImg:imgPost,
            }
            addPosts(postDetail, userInfo, currentDate, currentTime)
        }else{
            setIsImage(false)
            const postDetail = {
            postText:sendPost,
            postImg:"",
            }
            addPosts(postDetail, userInfo, currentDate, currentTime)
        }
        setSendPost("")
        setIsImage(false)
        setBtnDisabled(true)
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
    
    
  return (
   <div style={{display:postContainer ? "flex": "none"}} className={style.sendPostContainer}>
    <div className={style.sendPostBox}>
         <div>
            <IoCloseSharp style={{fontSize:22,color:"#fff"}} onClick={() => {setPostContainer(false);  setIsImage(false);setSendPost("")}} />
        </div>
        <div style={{borderBottom:"1px solid  #3e3d3d"}}>
            <div style={{display:"flex", alignItems:"start", padding:"20px 0px", gap:"10px"}}>
                <img style={{ width: "50px", objectFit:"contain"}} src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt='Profile Picture'/>
                <textarea placeholder='Neler oluyor?' name='sendPost' value={sendPost}  onChange={(e) => {setSendPost(e.target.value); setBtnDisabled(false)}}  />
            </div>
            {
                isImage  && 
                <div style={{position:"relative"}}>
                    <FontAwesomeIcon onClick={() => {setImgUrl(""); setXDisable(true);setIsImage(false)}} style={{display: xDisable ? "none" : "block", padding:"8px 10px",backgroundColor:"#252525", borderRadius:"999px", position:"absolute",top:"5px",right:"5px",color:"#fff"}} icon="fa-solid fa-xmark" />
                    <img style={{height:"300px", width:"100%", objectFit:"cover", display:"block", borderRadius:"10px", marginBottom:"10px"}} src={imgUrl} alt={`Post Picture`}/>
                </div>
            }
        </div>
        <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0px"}}>
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
            <button style={{filter: btnDisabled ? "brightness(55%)" : ""}} disabled={btnDisabled} onClick={() => {handleSendPost(); setPostContainer(false)}} className={style.send}>Gönder</button>
        </div>
    </div>
   </div>
  )
}

export default SendPost
