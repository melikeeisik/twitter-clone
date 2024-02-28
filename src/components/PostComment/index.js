import React, { useEffect, useState } from 'react'
import {useComments} from "../../context/PostCommentsContext"
import style from "./postcomment.module.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faChartSimple, faArrowUpFromBracket, faXmark} from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart,faBookmark } from '@fortawesome/free-regular-svg-icons'
library.add(faComment,faRetweet,faHeart,faChartSimple,faArrowUpFromBracket,faBookmark,faXmark)

function PostComment({postId}) {
    const {getCommentsByPostId,comments,setComments} = useComments()
    useEffect(() =>{
        const fetchData = async () => {
            try {
                await getCommentsByPostId(postId);
            } catch (error) {
                console.error("Yorumlar getirilirken hata oluştu: x", error);
            }
        };
        fetchData();
    }, []);
    useEffect(() =>{
      setComments("")
    }, [postId]);

  return (
    <div>
        <ul style={{listStyle:"none", margin:"0px", padding:"0px"}}>
           {    comments &&
                Object.values(comments).map((value, index) => (
                  <li key={index}>
                    <ul style={{listStyle:"none", margin:"0px", padding:"0px"}}>
                      {value.map((item, itemIndex) => (
                        <li  style={{padding:"12px 0px", borderBottom: "1px solid #3e3d3d"}} key={itemIndex}>
                          <div style={{display:"flex", padding:"0px 16px", gap:"8px"}}>
                            <div>
                                <img style={{width: "50px", objectFit:"contain"}} src={`https://api.multiavatar.com/${item.userNick}.png`} alt={`${item.userNick} Profil Resmi`}/>
                            </div>
                            <div style={{width:"100%"}}>
                              <div>
                                <div style={{marginTop:"5px", marginBottom:2}}>
                                  <span style={{fontWeight:700}}>{item.userName} {item.userSurname} </span>
                                  <span style={{color:"rgb(92, 91, 91)"}}>@{item.userNick}</span>
                                  <span style={{color:"rgb(92, 91, 91)"}}> • {item.commentDate.commentDay}</span>
                                </div>
                                <div>
                                  {item.comment}
                                </div>
                              </div>
                              <div className={style.commentReaction}>
                                <FontAwesomeIcon icon="fa-regular fa-comment" />
                                <FontAwesomeIcon icon="fa-solid fa-retweet" />
                                <FontAwesomeIcon icon="fa-regular fa-heart" />
                                <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                                <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
                              </div>
                            </div>
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
