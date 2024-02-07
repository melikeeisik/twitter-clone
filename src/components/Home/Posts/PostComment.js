import React, { useEffect, useState } from 'react'
import {useComments} from "../../../context/PostCommentsContext"
import style from "../../../style.module.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faChartSimple, faArrowUpFromBracket, faXmark} from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart,faBookmark } from '@fortawesome/free-regular-svg-icons'
library.add(faComment,faRetweet,faHeart,faChartSimple,faArrowUpFromBracket,faBookmark,faXmark)

function PostComment({postId}) {
    const [comments, setComments] = useState([])
    const {getCommentsByPostId} = useComments()

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const findComment = await getCommentsByPostId(postId);
                setComments(findComment)
            } catch (error) {
                console.error("Yorumlar getirilirken hata oluştu: x", error);
            }
        };
        fetchData();
     
    }, []);


  return (
    <div>
        <ul style={{listStyle:"none", margin:"0px", padding:"0px"}}>
           {    comments &&
                Object.values(comments).map((value, index) => (
                  <li key={index}>
                    <ul style={{listStyle:"none", margin:"0px", padding:"0px"}}>
                      {value.map((item, itemIndex) => (
                        <li className={style.commentLi}  key={itemIndex}>
                          <div style={{display:"flex",gap:"10px", padding:"20px"}}>
                            <div>
                                <img style={{width: "50px", objectFit:"contain"}} src={`https://api.multiavatar.com/${item.userNick}.png`} alt={`${item.userNick} Profil Resmi`}/>
                            </div>
                            <div>
                              <div style={{marginTop:"5px"}}>
                                <span style={{fontWeight:700}}>{item.userName} {item.userSurname} </span>
                                <span style={{color:"rgb(92, 91, 91)"}}>@{item.userNick}</span>
                              </div>
                              <div>
                                {item.comment}
                              </div>
                            </div>
                          </div>
                          <div className={style.commentReaction}>
                            <FontAwesomeIcon icon="fa-regular fa-comment" />
                            <FontAwesomeIcon icon="fa-solid fa-retweet" />
                            <FontAwesomeIcon icon="fa-regular fa-heart" />
                            <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                            <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
           }    
        </ul>
      
      
    </div>
  )
}

export default PostComment
