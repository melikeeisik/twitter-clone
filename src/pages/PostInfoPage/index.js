import React,{useEffect, useState} from 'react'
import PostComment from '../../components/PostComment';
import { useParams, useNavigate } from 'react-router-dom'
import { usePosts } from '../../context/PostsContext';
import { getDownloadURL, ref, getStorage } from 'firebase/storage'
import Menu from '../../components/Menu';
import Agenda from '../../components/Agenda';
import style from "./postınfopage.module.css"
import { useUserInfo } from '../../context/UserInfoContext';
import { useComments } from '../../context/PostCommentsContext';
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRetweet, faChartSimple, faArrowUpFromBracket, faXmark} from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart,faBookmark } from '@fortawesome/free-regular-svg-icons'
library.add(faComment,faRetweet,faHeart,faChartSimple,faArrowUpFromBracket,faBookmark,faXmark)

function PostInfoPage() {
  const {postId} = useParams();
  const {allPosts,setCommentCount} = usePosts();
  const [post, setPost] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate()
  const [comment, setComment] = useState("")
  const {addComment, comments} = useComments()
  const {userInfo} = useUserInfo()
  const [totalComments,setTotalComments] = useState(0);

  useEffect(() => {
    const showPost = allPosts.find(post => post.id == postId);
    if (showPost) {
        setPost(showPost);
        if(showPost.userPost.postImg!=""){
          const fetchImageURL = async () => {
          const storage = getStorage();
          const storageRef = ref(storage, showPost.userPost.postImg);
          try {
              const url = await getDownloadURL(storageRef);
              setImgUrl(url);
          } catch (error) {
              console.error('Error getting download URL:', error);
          }};
          fetchImageURL();
        }
    }
  }, [post.userPost]);


  useEffect(() =>{
    let total = 0
    for (const user in comments) {
      if (Object.hasOwnProperty.call(comments, user)) {
        total += comments[user].length;
      }
    }
    setTotalComments(total)
  },[postId,comments])

  const handleSendComment = () =>{
    if(comment != ""){
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
  
      addComment(postId,comment,userInfo, currentDate, currentTime); 
      setComment("")
      setCommentCount(prev => prev +1)
    }
  }

  const showPost = (postId) =>{
    navigate(`/postinfo/${postId}`);
  }

  return (
    <div >
       <Menu/>
      <div className={style.postAndAgendaPart}>
        <div className={style.postInfoContainer}>
          <div className={style.postInfoHeader}>
            <FaArrowLeft onClick={() => navigate("/home")} />
            <span style={{fontWeight:700, fontSize:"20px", marginLeft:30}}>Gönderi</span>
          </div>
          <div>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px"}}>
              <div style={{display:"flex", gap:8, alignItems:"center"}}>
                <img style={{width:"50px", objectFit:"contain"}} src={`https://api.multiavatar.com/${post.userNick}.png`} alt='Profile Picture' />
                <div style={{display:"flex", flexDirection:"column"}}>
                  <span style={{fontWeight:700}}>{post.userName} {post.userSurname}</span>
                  <span style={{color:"#5c5b5b"}}>@{post.userNick} </span>
                </div>
              </div>
              <BsThreeDots style={{color:"#5c5b5b"}}/>
            </div>
            <div style={{ marginBottom:16, padding:"0px 16px"}}>
              {
                post.userPost && <span>{post.userPost.postText}</span>
              }
              {
                  (post.userPost && post.userPost.postImg && 
                  <div >
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop:30 }}>
                          <img onClick={() => showPost(post.id)}  style={{ border:"1px solid #3e3d3d", width:"100%" , objectFit: 'cover', overflow: 'auto', borderRadius:"10px" }} src={imgUrl} alt={`${post.userNick} Postu`} />
                      </div>
                  </div> )
              }
            </div>
            <span style={{color:"#5c5b5b", padding:16}}>{post.postDate ? post.postDate.postDay : ""} </span>
            <div style={{display:"flex", width:"100%", justifyContent:"space-between",alignItems:"center", marginTop:16, fontSize:20, height:48, borderTop:"1px solid #3e3d3d", borderBottom:"1px solid #3e3d3d",color:"#5c5b5b"}}>
              <span style={{display:"flex",alignItems:"center", gap:"5px",paddingLeft:16}}><FontAwesomeIcon icon="fa-regular fa-comment" /> <span style={{fontSize:15, fontWeight:700}}>{totalComments==0 ? "": totalComments }</span></span>
              <FontAwesomeIcon icon="fa-solid fa-retweet" />
              <FontAwesomeIcon icon="fa-regular fa-heart" />
              <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
              <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" style={{paddingRight:16}}/>
            </div>
            <div style={{display:"flex", alignItems:"center",borderBottom:"1px solid #3e3d3d", justifyContent:"space-between",paddingLeft:16, paddingRight:16}}>
              <div style={{display:"flex", gap:10, alignItems:"center",paddingTop:12,paddingBottom:8,width:"85%",}}>
                <img style={{width:"50px", objectFit:"contain"}} src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt='Profile Picture' />
                <input placeholder='Yanıtını gönder'  name='comment' value={comment} onChange={(e) => setComment(e.target.value)}    style={{background:"#000",width:"100%", outline:"none", border:"none",  padding:"12px 0px",color:"#fff", fontSize:20}} />
              </div>
              <button onClick={handleSendComment} disabled={comment == "" ? "disabled" : ""} style={{border:"none", backgroundColor:"#1a8cd8", padding:"10px 20px",borderRadius:"20px", fontWeight:700,color:"#fff", fontSize:15, filter:comment=="" ?  "brightness(65%)":""}}>Yanıtla</button>
            </div>
            <div style={{wordBreak:"break-word"}}>
              <PostComment postId={postId}/>
            </div>
          </div>
        </div>
        <Agenda/>
      </div>
    </div>
  )
}

export default PostInfoPage