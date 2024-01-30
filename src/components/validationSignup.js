import * as yup from "yup"

const validationsSignup = yup.object().shape({
    userName : yup.string().required("Adın nedir?"),
    userSurname : yup.string().required("Soyadın nedir?"),
    userNick : yup.string().max(50).required("Kullanıcı adı oluşturunuz."),
    userPassword : yup.string().min(7).max(50).matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).+$/,"Şifreniz en bir harf ve bir rakam içermelidir.").required("Bir şifre giriniz."),
})



export default validationsSignup;