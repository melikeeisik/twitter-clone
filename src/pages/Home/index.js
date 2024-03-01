import React, { useState } from 'react';
import style from './home.module.css';
import Menu from '../../components/Menu';
import Posts from '../../components/Posts';
import Agenda from '../../components/Agenda/index.js';
function Home({ setPostContainer }) {
  return (
    <div className={style.homePage}>
      <Menu setPostContainer={setPostContainer} />
      <div>
        <Posts />
        <Agenda />
      </div>
    </div>
  );
}

export default Home;
