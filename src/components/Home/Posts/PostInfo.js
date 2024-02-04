import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import style from "../../../style.module.css"
import { getDownloadURL, ref, getStorage } from 'firebase/storage'
import { usePosts } from '../../../context/PostsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRetweet, faChartSimple, faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
library.add(faComment,faRetweet,faHeart,faChartSimple,faArrowUpFromBracket)

function PostInfo() {
    const postId = useParams()
    const [imgUrl, setImgUrl] = useState("");
    const {allPosts} = usePosts()
    const [post,setPost] = useState({})

    useEffect(() => {
        const showPost = allPosts.find(post => post.id == postId.postId)
        setPost(showPost)
        const fetchImageURL = async () => {
            const storage = getStorage();
            const storageRef = ref(storage, showPost.userPost.postImg);
            try {
              const url = await getDownloadURL(storageRef);
              setImgUrl(url);
            } catch (error) {
              console.error('Error getting download URL:', error);
            }
          };
        fetchImageURL();
      }, [postId.postId]);

  return (
    <div className={style.postInfoPage}>
        <div>
            <div>
                <img src={imgUrl} />
            </div>
            <div className={style.reactionOne}>
                <FontAwesomeIcon icon="fa-regular fa-comment" />
                <FontAwesomeIcon icon="fa-solid fa-retweet" />
                <FontAwesomeIcon icon="fa-regular fa-heart" />
                <FontAwesomeIcon icon="fa-solid fa-chart-simple" />
                <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
            </div>
        </div>
        <div>
            <div>
                <div>
                    <img src={`https://api.multiavatar.com/${post.userNick}.png`}/>
                </div>
                <div>
                    <div>
                        <span>{post.userName}</span>
                        <span>{post.userSurname}</span>
                    </div>
                    <span>@{post.userNick}</span>
                </div>
            </div>
            <div>
                {post.userPost.postText && <span>{post.userPost.postText}</span>}
            </div>
        </div>
    </div>
  )
}

export default PostInfo
