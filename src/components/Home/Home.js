import React, { useState } from 'react'
import style from "../../style.module.css"
import Menu from './Menu/Menu'
import Posts from './Posts/Posts'
import Agenda from './Agenda/Agenda'
function Home() {
  const [postContainer, setPostContainer] = useState(false)
  return (
    <div className={style.homePage}>
        <Menu postContainer={postContainer} setPostContainer={setPostContainer}/>
        <div className={style.postAndAgendaPart}>
          <Posts postContainer={postContainer} setPostContainer={setPostContainer}/>
          <Agenda postContainer={postContainer}/>
        </div>
    </div>
  )
}

export default Home
