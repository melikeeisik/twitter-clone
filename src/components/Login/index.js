import React, { useState } from 'react';
import style from './login.module.css';
import validationsLogin from './validationsLogin';
import { useFormik } from 'formik';
import { useUsers } from '../../context/UsersContext';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../context/UserInfoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXTwitter, faApple } from '@fortawesome/free-brands-svg-icons';
library.add(faXTwitter, faApple);

function Login({ setOpenForm }) {
  const { updateUserInfo } = useUserInfo();
  const { userList } = useUsers();
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();
  const { handleChange, handleSubmit, values, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        userNick: '',
        userPassword: ''
      },
      onSubmit: (values) => {
        const findUser = userList.find(
          (user) => user.userNick == values.userNick
        );
        if (findUser) {
          if (findUser.userPassword != values.userPassword) {
            setFormError(true);
          } else {
            updateUserInfo(findUser);
            navigate('/home');
          }
        } else {
          setFormError(true);
        }
      },
      validationSchema: validationsLogin
    });

  return (
    <div className={style.loginForm}>
      <div
        onClick={() => {
          setOpenForm(false);
        }}
        className={style.closeForm}
      >
        <FontAwesomeIcon icon="fa-solid fa-x" />
      </div>
      <div className={style.logo}>
        <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
      </div>
      <h1>X'e giriş yap</h1>
      <button className={`${style.registerBtn} ${style.loginBtnCntn}`}>
        <img className={style.googleImg} src="assets/images/google.png" />
        <span>Google ile giriş yap</span>
      </button>
      <button
        className={`${style.registerBtn} ${style.loginBtnCntn} ${style.appleLogo}`}
      >
        <FontAwesomeIcon icon="fa-brands fa-apple" />
        <span>Apple ile giriş yap</span>
      </button>
      <form onSubmit={handleSubmit}>
        <div className={style.inputBox}>
          <input
            style={{
              border:
                touched.userNick && errors.userNick ? '1px solid #f4212e' : ''
            }}
            type="text"
            name="userNick"
            onBlur={handleBlur}
            value={values.userNick}
            onChange={handleChange}
          />
          <span
            style={{
              top: values.userNick ? '10px' : '',
              fontSize: values.userNick ? '15px' : ''
            }}
          >
            Kullanıcı Adı
          </span>
          {touched.userNick && errors.userNick && <div>{errors.userNick}</div>}
        </div>
        <div className={style.inputBox}>
          <input
            style={{
              border:
                touched.userPassword && errors.userPassword
                  ? '1px solid #f4212e'
                  : ''
            }}
            type="password"
            name="userPassword"
            onBlur={handleBlur}
            value={values.userPassword}
            onChange={handleChange}
          />
          <span
            style={{
              top: values.userPassword ? '10px' : '',
              fontSize: values.userPassword ? '15px' : ''
            }}
          >
            Parola
          </span>
          {touched.userPassword && errors.userPassword && (
            <div>{errors.userPassword}</div>
          )}
          {formError && <div>Kullanıcı adınız veya şifreniz hatalı</div>}
        </div>
        <button
          style={{
            filter:
              errors.userNick || errors.userPassword ? 'brightness(85%)' : ''
          }}
          disabled={errors.userNick || errors.userPassword ? true : false}
          className={style.loginBtn}
        >
          Giriş yap
        </button>
      </form>
    </div>
  );
}

export default Login;
