import React from 'react'
import style from "../style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse,faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faBell, faEnvelope, faUser} from '@fortawesome/free-regular-svg-icons'
library.add(faXTwitter,faHouse,faMagnifyingGlass,faBell,faEnvelope, faUser, faPlus)

function Menu() {
  return (
    <div className={style.menuBar}>
        <div >
            <ul>
                <li>
                    <FontAwesomeIcon style={{fontSize:30}} icon="fa-brands fa-x-twitter" />
                    
                </li>
                <li>
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                    <span>Anasayfa</span>
                </li>
                <li>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    <span>Keşfet</span>
                </li>
                <li>
                    <FontAwesomeIcon icon="fa-regular fa-bell" />
                    <span>Bildirimler</span>
                </li>
                <li>
                    <FontAwesomeIcon icon="fa-regular fa-envelope" />
                    <span>Mesajlar</span>
                </li>
                <li>
                    <FontAwesomeIcon icon="fa-regular fa-user" />
                    <span>Profil</span>
                </li>
                <li>
                    <div className={style.mobileSend}>
                        <FontAwesomeIcon icon="fa-solid fa-plus" />
                    </div>
                    <div >
                        <button className={style.webSend}>Gönder</button>
                    </div>
                </li>
                <li>
                    profile
                </li>
            </ul>
      </div>
    </div>
  )
}

export default Menu
