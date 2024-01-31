import React, {useState} from 'react'
import style from "../style.module.css"
import validationsSignup from './validationSignup';
import { useFormik } from 'formik'
import {db} from "../firebase";
import {addDoc, collection,getDocs } from "@firebase/firestore"
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formError, setFormError] = useState(false)
  const navigate = useNavigate()
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
            setFormError(true)
          }else{
            addDoc(users, values)
            navigate("/home")
            localStorage.setItem("user", JSON.stringify(values))
          }
        } )
    },validationSchema:validationsSignup,
  })
  return (
    <div className={style.signupForm}>
      <h1>Hesabını oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.inputBox}>
          <input style={{border: (touched.userName && errors.userName) ? "1px solid #f4212e" : "" }}  type='text' name="userName" onBlur={handleBlur} value={values.userName}  onChange={handleChange}  />
          <span style={{top:values.userName ? "10px": "", fontSize:values.userName ? "15px" : ""}} >İsim</span>
          {
             touched.userName && errors.userName && <div >{errors.userName}</div>
          }
        </div>
        <div className={style.inputBox}>
          <input style={{border: (touched.userSurname && errors.userSurname) ? "1px solid #f4212e" : "" }}  type='text' name="userSurname" onBlur={handleBlur} value={values.userSurname}  onChange={handleChange}/>       
          <span style={{top:values.userSurname ? "10px": "", fontSize:values.userSurname? "15px" : ""}}>Soyisim</span>
          {
             touched.userSurname && errors.userSurname && <div >{errors.userSurname}</div>
          }
        </div>
        <div className={style.inputBox}>
          <input style={{border: (touched.userNick && errors.userNick) ? "1px solid #f4212e" : "" }} type='text' name="userNick" onBlur={handleBlur} value={values.userNick}  onChange={handleChange}/>
          <span style={{top:values.userNick ? "10px": "", fontSize:values.userNick? "15px" : ""}}>Kullanıcı Adı</span>
          {
             touched.userNick && errors.userNick && <div >{errors.userNick}</div>
          }
             {
                formError && <div>Bu kullanıcı adı kullanılmakta. Başka kullanıcı adı deneyiniz</div>
            }
        </div>
        <div className={style.inputBox}>
          <input style={{border: (touched.userPassword && errors.userPassword) ? "1px solid #f4212e" : "" }} type='password' name="userPassword" onBlur={handleBlur} value={values.userPassword}  onChange={handleChange}/>
          <span style={{top:values.userPassword ? "10px": "", fontSize:values.userPassword ? "15px" : ""}}>Parola</span>
          {
             touched.userPassword && errors.userPassword && <div >{errors.userPassword}</div>
          }
        </div>
        <button style={{filter:(errors.userName || errors.userPassword || errors.userNick || errors.userPassword) ? "brightness(85%)" :""}} disabled={(errors.userName || errors.userPassword || errors.userNick || errors.userPassword) ? true : false}>Kaydol</button>
      </form>
    </div>
  )
}

export default SignUp
