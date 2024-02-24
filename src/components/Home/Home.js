import React, { useState } from 'react'
import style from "../../style.module.css"
import Menu from './Menu/Menu'
import Posts from './Posts/Posts'
import Agenda from './Agenda/Agenda'
import SendPost from './Posts/SendPost'
function Home({postContainer, setPostContainer}) {
 
  return (
    <div>
      <div style={{display:postContainer ? "block": "none"}} >
          <SendPost postContainer={postContainer} setPostContainer={setPostContainer}  />
      </div>
      <div className={style.homePage}>
          <Menu  setPostContainer={setPostContainer}/>
          <div className={style.postAndAgendaPart}>
            <Posts postContainer={postContainer} setPostContainer={setPostContainer}/>
            <Agenda/>
          </div>
      </div>
    </div>
  )
}

export default Home
