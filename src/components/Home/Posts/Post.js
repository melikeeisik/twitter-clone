import React, { useEffect, useState } from 'react'
import style from "../../../style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRetweet, faChartSimple, faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart, faBookmark  } from '@fortawesome/free-regular-svg-icons'
import { getDownloadURL, ref, getStorage } from 'firebase/storage'
import {useNavigate } from 'react-router-dom';
library.add(faComment,faRetweet,faHeart,faChartSimple,faBookmark,faArrowUpFromBracket)
function Post({ post}) {
    const [downloadURL, setDownloadURL] = useState("");
    const navigate = useNavigate();

    const showPost = (postId) =>{
        navigate(`/postinfo/${postId}`);
    }

    useEffect(() => {
        const fetchImageURL = async () => {
          if (post.userPost.postImg ) {
            const storage = getStorage();
            const storageRef = ref(storage, post.userPost.postImg);
            try {
              const url = await getDownloadURL(storageRef);
              setDownloadURL(url);
           } catch (error) {
              console.error('Error getting download URL:', error);
            }
          }
        };
        fetchImageURL();
      }, [post]);

  return (
    <div className={style.postBox}>
        <div className={style.userInfoBox}>
            <div className={style.userProfile}>
                <img  src={`https://api.multiavatar.com/${post.userNick}.png`} alt={`${post.userNick} Profil Resmi`}/>
            </div>
            <div className={style.userNameBox}>
                <span style={{fontWeight:700}}>{post.userName}</span>
                <span style={{fontWeight:700}}>{post.userSurname}</span>
                <span style={{color:"#5c5b5b"}}>@{post.userNick}</span>
                <span style={{color:"#5c5b5b"}}>• {post.postDate}</span>
            </div>
        </div>
        <div className={style.postContainer}>
            <div >
                {
                    (!post.userPost.postImg  &&  <div className={style.userPostBox}><p>{post.userPost.postText}</p></div> )
                }
                {
                    (post.userPost.postImg && 
                    <div >
                        <p>{post.userPost.postText}</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img onClick={() => showPost(post.id)}  style={{ border:"1px solid #3e3d3d", width:"100%" ,height: "300px", objectFit: 'cover', overflow: 'auto', borderRadius:"20px" }} src={downloadURL} alt={`${post.userNick} Postu`} />
                    </div>
                    </div> )
                }
            </div>
            <div className={style.reaction}>
                <div className={style.reactionOne}>
                    <FontAwesomeIcon icon="fa-regular fa-comment" />
                    <FontAwesomeIcon icon="fa-solid fa-retweet" />
                    <FontAwesomeIcon icon="fa-regular fa-heart" />
                    <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
                </div>
                <div className={style.reactionTwo}>
                    <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                    <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post
