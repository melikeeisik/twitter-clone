import React from 'react'
import style from "../style.module.css"
import Menu from './Menu'
import Posts from './Posts'
import { useUserInfo } from '../context/UserInfoContext'
function Home() {
  const {user} = useUserInfo()
  console.log("home",user)
  return (
    <div className={style.homePage}>
        <Menu/>
        <Posts/>
    </div>
  )
}

export default Home
