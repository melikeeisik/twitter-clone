import React from 'react'
import Menu from '../Home/Menu/Menu'
import { BsEnvelopePlus } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import style from "../../style.module.css"
function Messages() {
  return (
    <div>
        <Menu/>
        <div className={style.messagesPages} >
            <div>
                <div >
                    <div className={style.messagesHeader}>
                        <span>Mesajlar</span>
                        <div>
                            <IoSettingsOutline />
                            <BsEnvelopePlus />
                        </div>
                    </div>
                    <input />
                </div>
                <div>

                </div>

            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default Messages
