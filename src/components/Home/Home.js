import React from 'react'
import style from "../../style.module.css"
import Menu from './Menu/Menu'
import Posts from './Posts/Posts'
import Agenda from './Agenda/Agenda'
function Home() {
  return (
    <div className={style.homePage}>
        <Menu/>
        <div className={style.postAndAgendaPart}>
          <Posts/>
          <Agenda/>
        </div>
    </div>
  )
}

export default Home
