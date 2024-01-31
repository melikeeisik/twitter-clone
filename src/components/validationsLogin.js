import * as yup from "yup"

const validationsLogin = yup.object().shape({
    userNick : yup.string().max(50).required("Kullanıcı adınızı giriniz."),
    userPassword : yup.string().required("Şifrenizi giriniz"),
})



export default validationsLogin;