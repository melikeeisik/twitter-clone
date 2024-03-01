import React, { useState } from 'react';
import style from './register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXTwitter, faApple } from '@fortawesome/free-brands-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import SignUp from '../../components/Signup';
import Login from '../../components/Login';
library.add(faXTwitter, faApple, faX);

function Register() {
  const [openForm, setOpenForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [date, setDate] = useState('');

  const handleDate = () => {
    setOpenForm(true);
    setFormName('signup');
    const day = new Date();
    const month = day.getMonth();
    const year = day.getFullYear();
    const monthsOfYear = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık'
    ];
    const monthName = monthsOfYear[month];
    setDate(`${monthName} ${year}`);
  };
  return (
    <div>
      <div
        style={{ display: openForm ? 'flex' : 'none' }}
        className={style.form}
      >
        {formName == 'signup' && openForm && (
          <SignUp setOpenForm={setOpenForm} date={date} />
        )}
        {formName == 'login' && openForm && <Login setOpenForm={setOpenForm} />}
      </div>
      <div className={style.registerPage}>
        <div className={style.logo}>
          <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
        </div>
        <div className={style.register}>
          <div className={style.title}>
            <span>Şu anda olup</span>
            <span>bitenler</span>
          </div>
          <div className={style.subtitle}>
            <span>Hemen Katıl</span>
          </div>
          <button className={style.registerBtn}>
            <img src="assets/images/google.png" />
            <span>Google ile kaydolun</span>
          </button>
          <button className={style.registerBtn}>
            <FontAwesomeIcon icon="fa-brands fa-apple" />
            <span className={style.appleText}>Apple ile kaydolun</span>
          </button>
          <div className={style.registerSeperate}>
            <div className={style.seperateLine}></div>
            <div className={style.seperateText}>veya</div>
            <div className={style.seperateLine}></div>
          </div>
          <button onClick={handleDate} className={style.createAccountBtn}>
            <span>Hesap oluştur</span>
          </button>
          <div>
            <span>Zaten bir hesabın var mı?</span>
            <button
              onClick={() => {
                setOpenForm(true);
                setFormName('login');
              }}
              className={style.loginBtn}
            >
              <span>Giriş yap</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
