import React from 'react'
import style from "../style.module.css"
import validationsLogin from './validationsLogin';
import { useFormik } from 'formik'
import {db} from "../firebase";
import {addDoc, collection,getDocs } from "@firebase/firestore"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXTwitter, faApple} from '@fortawesome/free-brands-svg-icons'
library.add( faXTwitter,faApple)

function Login() {
    const navigate = useNavigate()
  const {handleChange, handleSubmit, values, handleBlur, errors, touched} = useFormik({
    initialValues:{
      userNick: "",
      userPassword:""
    },onSubmit: async(values) => {
        await getDocs(collection(db, "users"))
        .then((querySnapshot) => {
          const userList = querySnapshot.docs.map((doc) =>
            ({...doc.data(), id:doc.id})
          )
          const findUser = userList.find(user => user.userNick == values.userNick)
          if(findUser){
            console.log("doru");
            navigate("/home")
        }
        } )
    },validationSchema:validationsLogin,
  })
  return (
    <div className={style.loginForm}>
        <div className={style.logo}>
            <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
        </div>
      <h1>X'e giriş yap</h1>
      <button  className={`${style.registerBtn} ${style.loginBtnCntn}`}>
            <img style={{height:"22px", objectFit:"cover"}} src='assets/images/google.png' />
            <span>Google ile giriş yap</span>
        </button>
        <button  className={`${style.registerBtn} ${style.loginBtnCntn}`}>
            <FontAwesomeIcon style={{fontSize:"22px"}} icon="fa-brands fa-apple" />
            <span style={{fontWeight:700}}>Apple ile giriş yap</span>
        </button>
      <form onSubmit={handleSubmit}>
       
        <div className={style.inputBox}>
          <input style={{border: (touched.userNick && errors.userNick) ? "1px solid #f4212e" : "" }} type='text' name="userNick" onBlur={handleBlur} value={values.userNick}  onChange={handleChange}/>
          <span style={{top:values.userNick ? "10px": "", fontSize:values.userNick? "15px" : ""}}>Kullanıcı Adı</span>
          {
             touched.userNick && errors.userNick && <div >{errors.userNick}</div>
          }
        </div>
        <div className={style.inputBox}>
          <input style={{border: (touched.userPassword && errors.userPassword) ? "1px solid #f4212e" : "" }} type='password' name="userPassword" onBlur={handleBlur} value={values.userPassword}  onChange={handleChange}/>
          <span style={{top:values.userPassword ? "10px": "", fontSize:values.userPassword ? "15px" : ""}}>Parola</span>
          {
             touched.userPassword && errors.userPassword && <div >{errors.userPassword}</div>
          }
        </div>
        <button className={style.loginBtn}>Giriş yap</button>
      </form>
    </div>
  )
}

export default Login
