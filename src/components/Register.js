import React from 'react'
import style from "../style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXTwitter, faApple} from '@fortawesome/free-brands-svg-icons'
import { registerVersion } from 'firebase/app'
library.add(faXTwitter, faApple)

function Register() {
  return (
    <div className={style.registerPage}>
      <div className={style.logo}>
        <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
      </div>
      <div className={style.register}>
        <div className={style.title}>
            <span >Şu anda olup</span>
            <span>bitenler</span>
        </div>
        <div className={style.subtitle}>
            <span>Hemen Katıl</span>
        </div>
        <button className={style.registerBtn}>
            <img style={{height:"22px", objectFit:"cover"}} src='assets/images/google.png' />
            <span>Google ile kaydolun</span>
        </button>
        <button className={style.registerBtn}>
            <FontAwesomeIcon style={{fontSize:"22px"}} icon="fa-brands fa-apple" />
            <span>Apple ile kaydolun</span>
        </button>
        <div className={style.registerSeperate}>
            <div className={style.seperateLine}></div>
            <div className={style.seperateText}>veya</div>
            <div className={style.seperateLine}></div>
        </div>
        <button className={style.createAccountBtn}>
            <span>Hesap oluştur</span>
        </button>
        <div>
            <span >Zaten bir hesabın var mı?</span>
            <button className={style.loginBtn}>
                <span>Giriş yap</span>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Register
