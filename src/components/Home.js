import React from 'react'
import style from "../style.module.css"
import Menu from './Menu'
import Posts from './Posts'
function Home() {
  return (
    <div className={style.homePage}>
        <Menu/>
        <Posts/>
    </div>
  )
}

export default Home
