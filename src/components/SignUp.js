import React from 'react'
import style from "../style.module.css"
import { useFormik } from 'formik'
import {db} from "../firebase";
import {addDoc, collection} from "@firebase/firestore"
function SignUp() {
  const users = collection(db, "users")
  const {handleChange, handleSubmit, values} = useFormik({
    initialValues:{
      userName:"",
      userSurname:"",
      userNick: "",
      userPassword:""
    },onSubmit: values => {
      addDoc(users, values)
    }
  })
  return (
    <div className={style.signupForm}>
      <h1>Hesabını oluştur</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name="userName" value={values.userName}  onChange={handleChange} />
        <input type='text' name="userSurname" value={values.userSurname}  onChange={handleChange}/>
        <input type='text' name="userNick" value={values.userNick}  onChange={handleChange}/>
        <input type='password' name="userPassword" value={values.userPassword}  onChange={handleChange}/>
        <button>Kaydol</button>
      </form>
    </div>
  )
}

export default SignUp
