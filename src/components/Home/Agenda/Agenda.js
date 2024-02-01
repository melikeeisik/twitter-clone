import React from 'react'
import style from  "../../../style.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
library.add(faMagnifyingGlass)

function Agenda() {
  return (
    <div className={style.agendaPage}>
      <div className={style.searchBox}>
        <input type='text' placeholder='Ara' /> 
        <div>
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </div>
      </div>
      <div className={style.agendaContainer}>
        <span>İlgini çekebilecek gündemler</span>
        <div className={style.agendaList}>
          <ul>
            <li>
              <span className={style.agendaCategory}>Türkiye tarihinde gündemde</span>
              <span className={style.agendaName}>#ösym</span>
            </li>
            <li>
              <span className={style.agendaCategory}>Türkiye tarihinde gündemde</span>
              <span className={style.agendaName}>#kpss</span>
            </li>
            <li>
              <span className={style.agendaCategory}>Türkiye tarihinde gündemde</span>
              <span className={style.agendaName}>#deprem</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Agenda
