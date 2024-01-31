import React from 'react'
import style from "../style.module.css"
import Menu from './Menu'
import Posts from './Posts'
import Agenda from './Agenda'
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
