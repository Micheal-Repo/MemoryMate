import * as Yup from "yup"

const validateEmailLogin = Yup.object().shape({
  email: Yup.string()
         .email("invalid email")
         .required("This field is required")
})


const validatePwdLogin = Yup.object().shape({
  password: Yup.string()
         .required("This field is required")
})


const validateRegister = Yup.object().shape({
     username: Yup.string()
         .required("This field is required"),
     email: Yup.string()
         .email("invalid email")
         .required("This field is required"),
    password:Yup.string()
          .min(6,"password must be upto 6 characters")
         .required("this field is required")
         .matches(/(?=.*[a-z])\w+/,"password must contain a lowercase character")
         .matches(/\d/,"password must contains a number")
         .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,"password must contain a special character"),
})

const validateReset = Yup.object().shape({
    password:Yup.string()
          .min(6,"password must be upto 6 characters")
         .required("this field is required")
         .matches(/(?=.*[a-z])\w+/,"password must contain a lowercase character")
         .matches(/\d/,"password must contains a number")
         .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,"password must contain a special character"),
   cpassword: Yup.string()
         .required("pls confirm password")
         .oneOf([Yup.ref("password")],"password does not match")
})

export {
  validateEmailLogin,
  validatePwdLogin,
  validateRegister,
  validateReset
}