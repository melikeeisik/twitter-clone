import React from 'react'
import style from "../style.module.css"
import validationsSignup from './validationSignup';
import { useFormik } from 'formik'
import {db} from "../firebase";
import {addDoc, collection,getDocs } from "@firebase/firestore"


function SignUp() {
  const users = collection(db, "users")
  const {handleChange, handleSubmit, values, handleBlur, errors, touched} = useFormik({
    initialValues:{
      userName:"",
      userSurname:"",
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
            console.log("var")
          }else{
            addDoc(users, values)
          }
        } )
    },validationSchema:validationsSignup,
  })
  return (
    <div className={style.signupForm}>
      <h1>Hesabını oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.inputBox}>
          <input  type='text' name="userName" onBlur={handleBlur} value={values.userName}  onChange={handleChange} />
          <span style={{top:values.userName ? "10px": "", fontSize:values.userName ? "15px" : ""}} >İsim</span>
        </div>
        <div className={style.inputBox}>
          <input  type='text' name="userSurname" value={values.userSurname}  onChange={handleChange}/>       
          <span style={{top:values.userSurname ? "10px": "", fontSize:values.userSurname? "15px" : ""}}>Soyisim</span>
        </div>
        <div className={style.inputBox}>
          <input  type='text' name="userNick" value={values.userNick}  onChange={handleChange}/>
          <span style={{top:values.userNick ? "10px": "", fontSize:values.userNick? "15px" : ""}}>Kullanıcı Adı</span>
        </div>
        <div className={style.inputBox}>
          <input type='password' name="userPassword" value={values.userPassword}  onChange={handleChange}/>
          <span style={{top:values.userPassword ? "10px": "", fontSize:values.userPassword ? "15px" : ""}}>Parola</span>
        </div>
        <button>Kaydol</button>
      </form>
    </div>
  )
}

export default SignUp
