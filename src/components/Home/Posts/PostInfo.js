import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import style from "../../../style.module.css"
import { getDownloadURL, ref, getStorage } from 'firebase/storage'
import { usePosts } from '../../../context/PostsContext'
import { useUserInfo } from '../../../context/UserInfoContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRetweet, faChartSimple, faArrowUpFromBracket, faXmark} from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart,faBookmark } from '@fortawesome/free-regular-svg-icons'

library.add(faComment,faRetweet,faHeart,faChartSimple,faArrowUpFromBracket,faBookmark,faXmark)

function PostInfo() {
    const {postId}= useParams()
    const [imgUrl, setImgUrl] = useState("");
    const [post,setPost] = useState({})
    const {userInfo} = useUserInfo()
    const navigate = useNavigate()
    const {allPosts} = usePosts()

    useEffect(() => {
        const showPost = allPosts.find(post => post.id == postId);
        console.log(postId)
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
        navigate("/home")
      }
    
  return (
    <div className={style.postInfoPage}> 
            <FontAwesomeIcon onClick={closePostInfo} style={{padding:"8px 10px", borderRadius:"999px", position:"absolute",top:"15px",left:"10px"}} icon="fa-solid fa-xmark" />
            <div className={style.postImg}>
                <div style={{height:"90%",display:"flex", alignItems:"center"}}>
                    <img style={{height:"100%"}} src={imgUrl} />
                </div>
                <div className={style.reactionOne}>
                    <FontAwesomeIcon icon="fa-regular fa-comment" />
                    <FontAwesomeIcon icon="fa-solid fa-retweet" />
                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                    <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
                    <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
                </div>
            </div>
            <div className={style.postInfo}>
                <div className={style.userInfo}>
                    <div>
                        <img className={style.userImg} src={`https://api.multiavatar.com/${post.userNick}.png`}/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <span style={{fontWeight:700}}>{post.userName} {post.userSurname}</span>
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
                <div style={{display:"flex", padding:"10px", gap:"10px", borderBottom:" 1px solid #3e3d3d"}}>
                    <img className={style.userImg}  src={`https://api.multiavatar.com/${userInfo.userNick}.png`} />
                    <input placeholder='Yanıtını gönder' type='text' />
                </div>
            </div>
        </div>
  )
}

export default PostInfo
