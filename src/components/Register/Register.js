import React, { useState } from 'react'
import style from "../../style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXTwitter, faApple} from '@fortawesome/free-brands-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import SignUp from './Signup/SignUp'
import Login from './Login/Login'
library.add(faXTwitter, faApple,faX)

function Register() {
    const [openForm, setOpenForm] = useState(false) 
    const [formName, setFormName] = useState("")
  return (
    <div style={{backgroundColor:openForm?"rgba(91, 112, 131, 0.4)" : ""}} className={style.registerPage}>
      <div style={{display:openForm ? "block" : "none" , opacity:""}} className={style.form}>
        <div onClick={() =>{setOpenForm(false);setFormName("")}} className={style.closeForm}>
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>
        {
          formName=="signup" && <SignUp/>
        }
        {
          formName =="login" && <Login/>
        }
      </div>
      <div style={{opacity:openForm? "60%" : ""}} className={style.logo}>
        <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
      </div>
      <div className={style.register}>
        <div style={{opacity:openForm? "60%" : ""}} className={style.title}>
            <span >Şu anda olup</span>
            <span>bitenler</span>
        </div>
        <div className={style.subtitle}>
            <span >Hemen Katıl</span>
        </div>
        <button  className={style.registerBtn}>
            <img style={{height:"22px", objectFit:"cover"}} src='assets/images/google.png' />
            <span>Google ile kaydolun</span>
        </button>
        <button style={{opacity:openForm? "60%" : ""}} className={style.registerBtn}>
            <FontAwesomeIcon style={{fontSize:"22px"}} icon="fa-brands fa-apple" />
            <span style={{fontWeight:700}}>Apple ile kaydolun</span>
        </button>
        <div style={{opacity:openForm? "60%" : ""}} className={style.registerSeperate}>
            <div className={style.seperateLine}></div>
            <div className={style.seperateText}>veya</div>
            <div className={style.seperateLine}></div>
        </div>
        <button style={{opacity:openForm? "60%" : ""}} onClick={() => {setOpenForm(true); setFormName("signup")}} className={style.createAccountBtn}>
            <span>Hesap oluştur</span>
        </button>
        <div style={{opacity:openForm? "60%" : ""}}>
            <span >Zaten bir hesabın var mı?</span>
            <button  onClick={() => {setOpenForm(true);setFormName("login")}}  className={style.loginBtn}>
                <span>Giriş yap</span>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Register
