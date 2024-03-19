import React from 'react';
import style from './logout.module.css';
import { useNavigate } from 'react-router-dom';
import { BsTwitterX } from 'react-icons/bs';
import { useUserInfo } from '../../context/UserInfoContext';
function LogOut() {
  const { userInfo, removeUserInfo } = useUserInfo();
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeUserInfo(userInfo);
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={style.logOutPage}>
      <div className={style.logOutContainer}>
        <div className={style.logOutLogo}>
          <BsTwitterX />
        </div>
        <span className={style.logOutTitle}>X'ten çıkış yapılsın mı?</span>
        <span className={style.logOutSubtitle}>
          İstediğin zaman tekrar oturum açabilirsin. Hesap değiştirmek
          istiyorsan bunu mevcut bir hesabı ekleyerek yapabilirsin.
        </span>
        <button onClick={handleLogOut} className={style.logOutButton}>
          Çıkış yap
        </button>
        <button onClick={handleCancel} className={style.cancelButton}>
          İptal
        </button>
      </div>
    </div>
  );
}

export default LogOut;
