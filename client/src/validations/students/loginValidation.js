import * as yup from "yup"

export const loginSchema = yup.object().shape({
    email:yup
        .string()
        .email("Invalid Email")
        .required("Required"),
    password:yup
        .string()
        .min(5,"should contain 5-16 charecters")
        .max(16,"should contain 5-16 charecters")
        .required("Required")    
})