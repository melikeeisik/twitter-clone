import React from 'react'
import style from "../style.module.css"
import { useFormik } from 'formik'
import {db} from "../firebase";
import {addDoc, collection,getDocs } from "@firebase/firestore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faX } from '@fortawesome/free-solid-svg-icons';
library.add(faX)

function SignUp() {
  const users = collection(db, "users")
  const {handleChange, handleSubmit, values} = useFormik({
    initialValues:{
      userName:"",
      userSurname:"",
      userNick: "",
      userPassword:""
    },onSubmit: values => {
      const fectUser = async () =>{
        await getDocs(collection(db, "users"))
        .then((querySnapshot) => {
          const user = querySnapshot.getDocs.map((doc) =>(
            {...doc.data(), id:doc.id}))
        } )
      }
      if(fectUser){
        console.log("var")
      }else{
        addDoc(users, values)
      }
    }
  })
  return (
    <div className={style.signupForm}>
      <h1>Hesabını oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.inputBox}>
          <input  type='text' name="userName" value={values.userName}  onChange={handleChange} />
          <span>İsim</span>
        </div>
        <div className={style.inputBox}>
          <input  type='text' name="userSurname" value={values.userSurname}  onChange={handleChange}/>       
          <span>Soyisim</span>
        </div>
        <div className={style.inputBox}>
          <input  type='text' name="userNick" value={values.userNick}  onChange={handleChange}/>
          <span>Kullanıcı Adı</span>
        </div>
        <div className={style.inputBox}>
          <input type='password' name="userPassword" value={values.userPassword}  onChange={handleChange}/>
          <span>Parola</span>
        </div>
        <button>Kaydol</button>
      </form>
    </div>
  )
}

export default SignUp
