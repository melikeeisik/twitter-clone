import React, { useState } from 'react'
import style from "../../style.module.css"
import Menu from './Menu/Menu'
import Posts from './Posts/Posts'
import Agenda from './Agenda/Agenda'
import SendPost from './Posts/SendPost'
function Home({ setPostContainer}) {
 
  return ( 
      <div className={style.homePage}>
          <Menu  setPostContainer={setPostContainer}/>
          <div className={style.postAndAgendaPart}>
            <Posts/>
            <Agenda/>
          </div>
      </div>
  )
}

export default Home
