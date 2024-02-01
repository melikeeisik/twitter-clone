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
    </div>
  )
}

export default Agenda
