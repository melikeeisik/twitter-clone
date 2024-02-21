import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import style from "../../../style.module.css"
import { getDownloadURL, ref, getStorage } from 'firebase/storage'
import { usePosts } from '../../../context/PostsContext'
import PostComment from './PostComment'
import { useUserInfo } from '../../../context/UserInfoContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRetweet, faChartSimple, faArrowUpFromBracket, faXmark} from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart,faBookmark } from '@fortawesome/free-regular-svg-icons'
import { useComments } from '../../../context/PostCommentsContext'
library.add(faComment,faRetweet,faHeart,faChartSimple,faArrowUpFromBracket,faBookmark,faXmark)

function PostInfo() {
    const {postId}= useParams()
    const [imgUrl, setImgUrl] = useState("");
    const [post,setPost] = useState({})
    const {userInfo} = useUserInfo()
    const navigate = useNavigate()
    const {allPosts} = usePosts()
    const [comment, setComment] = useState("")
    const {addComment} = useComments()
    useEffect(() => {
        const showPost = allPosts.find(post => post.id == postId);
        if (showPost) {
            setPost(showPost);

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
    }, [post.userPost])


      const closePostInfo = () =>{
        navigate(-1)
      }

      const handleSendComment = () =>{
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
      }
    
  return (
    <div className={style.postInfoPage}> 
            <div className={style.postImg}>
                <FontAwesomeIcon onClick={closePostInfo} style={{padding:"8px 10px", borderRadius:"999px", position:"fixed",top:"15px",left:"10px",zIndex:"999"}} icon="fa-solid fa-xmark" />
                <div style={{position: "sticky", top:"0px", margin:"auto", width:"50%"}}>
                    <img style={{ minHeight:"94vh", maxWidth:"95vh", objectFit:"cover", zIndex:"999"}} src={imgUrl} alt={`${post.userNick} Kapak Resmi`} />
                    <div className={style.reactionOnePost}>
                        <FontAwesomeIcon icon="fa-regular fa-comment" />
                        <FontAwesomeIcon icon="fa-solid fa-retweet" />
                        <FontAwesomeIcon icon="fa-regular fa-heart" />
                        <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
                        <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
                    </div>
                </div>
            </div>
            <div className={style.postInfo}>
                <div className={style.userInfo}>
                    <div>
                        <img className={style.userImg} src={`https://api.multiavatar.com/${post.userNick}.png`} alt={`${post.userNick} Profil Resmi`}/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <span style={{fontWeight:700}}>{post.userName} {post.userSurname} <span style={{color:"#5c5b5b",fontWeight:400}}>• {post.postDate ? post.postDate.postDay : ""}</span></span>
                        <span style={{color:"#5c5b5b"}}>@{post.userNick}</span>
                    </div>
                </div>
                <div className={style.postText}>
                    {post.userPost && <span>{post.userPost.postText}</span>}
                </div>
                <div className={style.reactionOne}>
                    <FontAwesomeIcon icon="fa-regular fa-comment" />
                    <FontAwesomeIcon icon="fa-solid fa-retweet" />
                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                    <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                    <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
                </div>
                <div style={{display:"flex", padding:"10px", gap:"10px", borderBottom:" 1px solid #3e3d3d", alignItems:"center"}}>
                    <img className={style.userImg}  src={`https://api.multiavatar.com/${userInfo.userNick}.png`} alt={`${post.userNick} Profil Resmi`}/>
                    <input name='comment' value={comment}  placeholder='Yanıtını gönder' type='text' onChange={(e) => setComment(e.target.value)} />
                    <button onClick={handleSendComment} style={{ filter:comment=="" ?  "brightness(65%)":""}} disabled={comment == "" ? "disabled" : ""}>Yanıtla</button>
                </div>
                <div>
                    <PostComment postId={postId}/>
                </div>
            </div>
        </div>
  )
}

export default PostInfo
