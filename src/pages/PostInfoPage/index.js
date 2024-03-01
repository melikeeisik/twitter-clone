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
    <>
       <Menu/>
      <>
        <div className={style.postInfoContainer}>
          <div className={style.postInfoHeader}>
            <FaArrowLeft onClick={() => navigate("/home")} />
            <span>Gönderi</span>
          </div>
          <>
            <div className={style.userContainer}>
              <div className={style.userBox}>
                <img src={`https://api.multiavatar.com/${post.userNick}.png`} alt='Profile Picture' />
                <div  className={style.userNameBox}>
                  <span className={style.userName}>{post.userName} {post.userSurname}</span>
                  <span className={style.userNick}>@{post.userNick} </span>
                </div>
              </div>
              <BsThreeDots/>
            </div>
            <div className={style.postPart}>
              {
                post.userPost && <span>{post.userPost.postText}</span>
              }
              {
                  (post.userPost && post.userPost.postImg && 
                      <div className={style.postImg}>
                          <img onClick={() => showPost(post.id)}  src={imgUrl} alt={`${post.userNick} Postu`} />
                      </div>
                   )
              }
            </div>
            <span className={style.postDate}>{post.postDate ? post.postDate.postDay : ""} </span>
            <div className={style.buttonContainer}>
              <div><FontAwesomeIcon icon="fa-regular fa-comment" /> <span>{totalComments==0 ? "": totalComments }</span></div>
              <FontAwesomeIcon icon="fa-solid fa-retweet" />
              <FontAwesomeIcon icon="fa-regular fa-heart" />
              <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
              <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" style={{paddingRight:16}}/>
            </div>
            <div className={style.commentBox}>
              <div className={style.commentInput} >
                <img src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt='Profile Picture' />
                <input placeholder='Yanıtını gönder'  name='comment' value={comment} onChange={(e) => setComment(e.target.value)}/>
              </div>
              <button onClick={handleSendComment} disabled={comment == "" ? "disabled" : ""} style={{filter:comment=="" ?  "brightness(65%)":""}}>Yanıtla</button>
            </div>
            <PostComment postId={postId}/>
          </>
        </div>
        <Agenda/>
      </>
    </>
  )
}

export default PostInfoPage
